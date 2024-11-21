import {StyleSheet, Text, View, FlatList, TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkIsUserEmailExist,
  getDataWithRef,
  postUserDataWithId,
} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
import {setAuth} from '../store/authSlice';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const ProfileScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const isFocused = useIsFocused();
  const {isAuth} = useSelector(state => state.auth);

  const [value, setValue] = useState(isAuth?.phoneNumber || '');
  const [loadingModal, setLoadingModal] = useState(false);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(isAuth?.name || '');
  const [userEmail, setUserEmail] = useState(isAuth?.userEmail || '');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('Fetched User ID:', userId); // Log fetched User ID
        if (userId) {
          const userDetails = await getDataWithRef('user', userId);
          console.log('Fetched User Details:', userDetails); // Log fetched User Details
          if (userDetails) {
            setUserName(userDetails.name || '');
            setUserEmail(userDetails.userEmail || '');
            setValue(userDetails.phoneNumber || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert(textStrings.errorTitle, textStrings.fetchError);
      }
    };

    if (isFocused) {
      setLoadingModal(true);
      fetchUserDetails();
      setLoadingModal(false);
    }
  }, [isFocused, textStrings.errorTitle, textStrings.fetchError]);

  const updateUserInfo = async () => {
    console.log('Update User Info Triggered'); // Log when update is triggered
    console.log('Current State:', {userName, userEmail, value}); // Log current state of inputs

    if (userEmail?.length > 4 && userEmail?.includes('@')) {
      if (userName?.length > 0) {
        if (value?.length >= 9) {
          let userId = isAuth?.userId;
          setLoadingModal(true);
          const isEmailChanged = isAuth?.userEmail !== userEmail;
          let emailInUse = false;

          if (isEmailChanged) {
            emailInUse = await checkIsUserEmailExist(userEmail);
            console.log('Is Email Already In Use:', emailInUse); // Log email check result
            if (emailInUse) {
              Alert.alert(
                textStrings.authErrorTitle,
                textStrings.emailAlreadyInUse,
              );
              setLoadingModal(false);
              return; // Exit early if the email is already in use
            }
          }

          try {
            console.log('Posting User Data:', {
              userId,
              balance: isAuth?.balance,
              name: userName,
              userImage: isAuth?.userImage,
              userEmail: userEmail,
              phoneNumber: value,
            }); // Log data to be posted
            await postUserDataWithId(userId, {
              balance: isAuth?.balance,
              name: userName,
              userImage: isAuth?.userImage,
              userEmail: userEmail,
              phoneNumber: value,
            });
            await dispatch(
              setAuth({
                isAuth: {
                  ...isAuth,
                  balance: isAuth?.balance,
                  name: userName,
                  phoneNumber: value,
                  userImage: isAuth?.userImage,
                  userEmail: userEmail,
                },
              }),
            );
            Alert.alert(textStrings.successTitle, textStrings.updateSuccess);
          } catch (e) {
            console.error('Error updating user info:', e);
            Alert.alert(textStrings.errorTitle, textStrings.updateError);
          } finally {
            setLoadingModal(false);
          }
        }
      } else {
        Alert.alert(textStrings.productTitleEror, textStrings.userNameError);
      }
    } else {
      Alert.alert(textStrings.productTitleEror, textStrings.emailError);
    }
  };

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.myProfileTxt}
          iconName1={'list'}
          firstbtnFun={() => navigation.toggleDrawer()}
        />

        <View style={styles.otherContent}>
          <FlatList
            keyboardDismissMode="on-drag"
            data={[]}
            renderItem={() => null}
            ListFooterComponent={<View style={{height: h('20%')}} />}
            ListHeaderComponent={
              <>
                <View>
                  <Text
                    style={{
                      ...TextStyles.loginInputheading,
                      width: '90%',
                      alignSelf: 'center',
                      color: textcolor,
                    }}>
                    {textStrings.emailTxt}
                  </Text>
                  <View style={styles.inputContainer}>
                    <Icon3 name="mail" size={h('3.5%')} color={textcolor} />
                    <TextInput
                      value={userEmail}
                      returnKeyType={'done'}
                      onChangeText={text => {
                        setUserEmail(text);
                        console.log('Updated User Email:', text); // Log updated email
                      }}
                      style={{
                        ...TextStyles.textinputfamilyclassAll,
                        flex: 1,
                        height: '100%',
                        fontSize: h('2.6%'),
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: h('3%')}}>
                  <Text
                    style={{
                      ...TextStyles.loginInputheading,
                      width: '90%',
                      alignSelf: 'center',
                      color: textcolor,
                    }}>
                    {textStrings.userNameTxt}
                  </Text>
                  <View style={styles.inputContainer}>
                    <Icon3
                      name="person-outline"
                      size={h('3.5%')}
                      color={textcolor}
                    />
                    <TextInput
                      value={userName}
                      onChangeText={text => {
                        setUserName(text);
                        console.log('Updated User Name:', text); // Log updated name
                      }}
                      style={{
                        ...TextStyles.textinputfamilyclassAll,
                        flex: 1,
                        height: '100%',
                        fontSize: h('2.6%'),
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: h('9%')}} />
                <AppBtn
                  title={textStrings.saveBtnTxt}
                  clickfun={updateUserInfo}
                />
              </>
            }
          />
        </View>
      </View>
      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

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
  inputContainer: {
    width: '90%',
    height: h('7%'),
    alignSelf: 'center',
    backgroundColor: '#FBFBFB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#BFD0E5',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
