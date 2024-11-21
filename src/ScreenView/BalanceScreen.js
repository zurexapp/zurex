import {StyleSheet, Text, View, Image, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getMYServicesReq} from '../DataBase/databaseFunction';
import {setMySupportServicesData} from '../store/projectSlice';
import LoadingModal from '../Components/LoadingModal';

const BalanceScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const focus = useIsFocused();
  const [loadingModal, setloadingModal] = useState(false);
  const [userId, setUserId] = useState(null); // Local state for userId
  const {mySupportServicesData} = useSelector(state => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    const getmyServicesRequest = async userId => {
      try {
        const support = await getMYServicesReq(`${userId}`);
        dispatch(
          setMySupportServicesData({
            mySupportServicesData: support ? support : [],
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };

    const validateUserAndFetchServices = async () => {
      setloadingModal(true);
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          getmyServicesRequest(storedUserId);
        } else {
          navigation.replace('Login', {routeName: 'home4btn'});
        }
        setloadingModal(false);
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      validateUserAndFetchServices();
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation, focus, dispatch]);

  const paymentMethods = [
    {
      firstTxt: textStrings.balanceTxt,
      subtext: textStrings.balanceSubTxt,
      value: `${0} ${textStrings.currencyTxt}`, // Assuming balance is not stored locally anymore
      id: 0,
    },
    {
      firstTxt: textStrings.supportTxt,
      subtext: textStrings.supportSubTxt,
      value: `${
        mySupportServicesData && mySupportServicesData.length > 0
          ? mySupportServicesData.length
          : 0
      } ${textStrings.requestTxt}`,
      id: 1,
    },
  ];

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.balanceTxt}
          iconName1={'list'}
          firstbtnFun={() => navigation.toggleDrawer()}
        />
        <View style={styles.otherContent}>
          <Image
            source={require('../assets/undraw_wallet.png')}
            style={styles.balanceImg}
          />
          <FlatList
            keyExtractor={item => item.id}
            data={paymentMethods}
            ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
            ListFooterComponent={
              <View
                style={{
                  width: '95%',
                  height: h('5%'),
                  alignSelf: 'center',
                  marginTop: h('1%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            }
            renderItem={({item}) => (
              <View style={styles.pointContainer}>
                <View style={styles.firstTxtCont}>
                  <Text style={TextStyles.balancemainTxt}>
                    {item?.firstTxt}
                  </Text>
                  <Text style={TextStyles.balancesubtxt}>{item?.subtext}</Text>
                </View>
                <View style={styles.firstTxtCont}>
                  <Text style={TextStyles.balancevaluetxt}>{item?.value}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  pointContainer: {
    width: w('90%'),
    height: h('10%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: w('5%'),
    borderWidth: 1,
    borderColor: '#BFD0E5',
    backgroundColor: '#FBFBFB',
  },
  balanceImg: {
    width: '90%',
    height: h('26%'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: h('4%'),
  },
  firstTxtCont: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
