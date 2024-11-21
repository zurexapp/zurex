import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {c0color, maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import LoadingModal from '../Components/LoadingModal';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {removeData} from '../DataBase/databaseFunction';
import {setAuth, setIsArabicLanguage} from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const focus = useIsFocused();
  const {isAuth, isArabicLanguage} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [loadingModal, setloadingModal] = useState(false);
  const removeAccountFun = async () => {
    setloadingModal(true);
    await removeData('user', `${isAuth?.userId}`).then(async () => {
      await dispatch(setAuth({isAuth: null}));
      await AsyncStorage.removeItem('acZurexLoginUserId');
      navigation.replace('home4btn');
    });
    setloadingModal(false);
  };
  const switchLanguage = async () => {
    const langValue = isArabicLanguage ? 'english' : 'arabic';
    setloadingModal(true);
    await dispatch(setIsArabicLanguage({isArabicLanguage: !isArabicLanguage}));
    await AsyncStorage.setItem('ac-zuex-client-language', langValue);
    setloadingModal(false);
  };

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     if (isAuth === null) {
  //       navigation.replace('Login', {routeName: 'home4btn'});
  //     }
  //   });
  // }, [navigation, isAuth, focus]);

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.settingHedTxt}
          iconName1={'list'}
          firstbtnFun={() => navigation.toggleDrawer()}
          iconName2={''}
          secbtnFun={() => console.log('next')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <TouchableOpacity
            style={styles.settingBtn}
            onPress={() => setIsEnabled(!isEnabled)}>
            <Text style={TextStyles.settingscreenfirsttxtset}>
              {textStrings.notificationTxt}
            </Text>
            <Switch
              trackColor={'#767577'}
              thumbColor={isEnabled ? maincolor : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
            />
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: c0color,
              borderStyle: 'dotted',
              marginVertical: h('1%'),
            }}
          />
          <TouchableOpacity onPress={switchLanguage} style={styles.settingBtn}>
            <Text style={TextStyles.settingscreenfirsttxtset}>
              {textStrings.languageTxt}
            </Text>
            <Text style={TextStyles.settingscreensectxtset}>
              {textStrings.languagNameTxt}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: c0color,
              borderStyle: 'dotted',
              marginVertical: h('1%'),
            }}
          />
          <TouchableOpacity
            onPress={() => setshowAlert(!showAlert)}
            style={styles.settingBtn}>
            <Text style={TextStyles.settingscreenfirsttxtset}>
              {textStrings.deleteAccountTxt}
            </Text>
          </TouchableOpacity>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={textStrings.delAccountTitleTxt}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText={textStrings.yesSureTxt}
          confirmText={textStrings.noBtnTxt}
          confirmButtonColor="transparent"
          onCancelPressed={removeAccountFun}
          onConfirmPressed={() => {
            setshowAlert(!showAlert);
          }}
          confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
          cancelButtonColor="transparent"
          cancelButtonTextStyle={{color: maincolor, fontSize: h('2.3%')}}
          cancelButtonStyle={{marginRight: h('10%')}}
        />
      </View>
      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
  settingBtn: {
    width: '100%',
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
