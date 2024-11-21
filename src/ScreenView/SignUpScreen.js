import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {maincolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {
  checkIsUserExist,
  postData,
  getChildNodeCount,
  postDataWithRef,
  checkIsUserPhoneNumberExist,
  checkIsUserEmailExist,
} from '../DataBase/databaseFunction';
import LoadingModal from '../Components/LoadingModal';
import {webengage} from '../webengage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COUNTRY_CODE, PHONE_NUMBER_LIMIT} from './CommonUtils';
import analytics from '@react-native-firebase/analytics';

const SignUpScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {routeName} = route?.params;
  const [formattedValue, setFormattedValue] = useState('');
  const [isRemember, setisRemember] = useState(false);
  const [loadingModal, setloadingModal] = useState(false);
  const [userName, setuserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [usercars, setUsercars] = useState([]);

  useEffect(() => {
    const logStoredToken = async () => {
      try {
        const token = await AsyncStorage.getItem('fcmToken');
        if (token) {
        } else {
        }
      } catch (error) {}
    };
    logStoredToken();
  }, []);

  const signUpFuction = async () => {
    if (userEmail.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        Alert.alert(textStrings.authErrorTitle, textStrings.invalidEmailError);
        return;
      }

      if (userName.length > 0) {
        if (formattedValue.length >= PHONE_NUMBER_LIMIT) {
          if (isRemember) {
            try {
              const emailInUse = await checkIsUserEmailExist(userEmail);
              const phoneInUse = await checkIsUserPhoneNumberExist(
                COUNTRY_CODE + formattedValue,
              );

              if (emailInUse || phoneInUse) {
                Alert.alert(
                  textStrings.authErrorTitle,
                  emailInUse
                    ? textStrings.emailAlreadyInUse
                    : phoneInUse
                    ? textStrings.phoneAlreadyInUse
                    : '',
                );
              } else {
                setloadingModal(true);
                const today = new Date();
                const day = today.getDate().toString().padStart(2, '0');
                const month = (today.getMonth() + 1)
                  .toString()
                  .padStart(2, '0');
                const year = today.getFullYear().toString().slice(-2);
                const createdDate = `${year}${month}${day}`;
                let userCount = await getChildNodeCount('user');
                userCount++;
                console.log(`123567`, createdDate, userCount);
                let userId = `CUS${createdDate}${userCount
                  .toString()
                  .padStart(6, '0')}`;
                const createdAt = new Date().toISOString();
                const token = await AsyncStorage.getItem('fcmToken');
                const userData = {
                  name: userName,
                  phoneNumber: COUNTRY_CODE + formattedValue,
                  balance: 0,
                  userEmail: userEmail,
                  userCars: usercars,
                  deviceToken: token ? [token] : [],
                  createdAt: createdAt,
                };

                await postDataWithRef('user', userId, userData)
                  .then(async () => {
                    webengage.track('Signup', {
                      name: userName,
                      phoneNumber: COUNTRY_CODE + formattedValue,
                      balance: 0,
                      userEmail: userEmail,
                    });
                    console.log(
                      'Logging Firebase Analytics event for user signup',
                    );
                    await analytics().logEvent('app_User_Registration', {
                      phone: COUNTRY_CODE + formattedValue,
                      email: userEmail,
                    });
                    console.log('Firebase Analytics event logged successfully');
                    Alert.alert(
                      textStrings.signUpSuccess,
                      textStrings.signUpSucsDesc,
                    );
                    navigation.pop();
                  })
                  .catch(error => {
                    Alert.alert(
                      textStrings.authErrorTitle,
                      error?.message ? error?.message : error,
                    );
                  });

                setloadingModal(false);
              }
            } catch (error) {
              Alert.alert(
                textStrings.authErrorTitle,
                error?.message ? error?.message : error,
              );
              setloadingModal(false);
            }
          } else {
            Alert.alert(
              textStrings.authErrorTitle,
              textStrings.acceptPolicyError,
            );
          }
        } else {
          Alert.alert(textStrings.authErrorTitle, textStrings.mobileError);
        }
      } else {
        Alert.alert(textStrings.authErrorTitle, textStrings.userNameError);
      }
    } else {
      Alert.alert(textStrings.authErrorTitle, textStrings.emailError);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.screencont}>
          <LoginUprHeader isLanguageSwich={true}>
            <Text style={TextStyles.signupmaintxt}>
              {textStrings.createTxt}
            </Text>
          </LoginUprHeader>

          <View
            style={{
              width: '100%',
              height: h('70%'),
              marginTop: h('5%'),
            }}>
            <View
              style={{
                width: '100%',
                height: h('55%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
              }}>
              <View>
                <Text style={TextStyles.loginInputheading}>
                  {textStrings.emailTxt}
                </Text>
                <View
                  style={{
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
                  }}>
                  <Icon2 name="mail" size={h('3.5%')} color={textcolor} />
                  <TextInput
                    style={{
                      ...TextStyles.textinputfamilyclassAll,
                      flex: 1,
                      height: '100%',
                      fontSize: h('2.6%'),
                      marginLeft: 10,
                    }}
                    returnKeyType="done"
                    value={userEmail}
                    onChangeText={text => setuserEmail(text)}
                  />
                </View>
              </View>
              <View>
                <Text style={TextStyles.loginInputheading}>
                  {textStrings.userNameTxt}
                </Text>
                <View
                  style={{
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
                  }}>
                  <Icon2
                    name="person-outline"
                    size={h('3.5%')}
                    color={textcolor}
                  />
                  <TextInput
                    style={{
                      ...TextStyles.textinputfamilyclassAll,
                      flex: 1,
                      height: '100%',
                      fontSize: h('2.6%'),
                      marginLeft: 10,
                    }}
                    returnKeyType={'done'}
                    value={userName}
                    onChangeText={text => setuserName(text)}
                  />
                </View>
              </View>
              <View>
                <Text style={TextStyles.loginInputheading}>
                  {textStrings.loginInputFieldTxt1}
                </Text>
                <View
                  style={{
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
                  }}>
                  <Icon name="mobile1" size={h('3.5%')} color={textcolor} />

                  <View
                    style={{
                      width: w('90%') - h('3.5%') - 20,
                      height: '100%',
                      fontSize: h('2.6%'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        ...TextStyles.textinputfamilyclassAll,
                        marginHorizontal: 10,
                        fontSize: h('2.6%'),
                      }}>
                      {COUNTRY_CODE}
                    </Text>
                    <TextInput
                      style={{
                        ...TextStyles.textinputfamilyclassAll,
                        flex: 1,
                        height: '100%',
                        fontSize: h('2.6%'),
                        marginLeft: 10,
                      }}
                      placeholder={textStrings.loginInputFieldTxt1}
                      onChangeText={text => {
                        setFormattedValue(text);
                      }}
                      keyboardType={'number-pad'}
                      returnKeyType={'done'}
                      maxLength={PHONE_NUMBER_LIMIT}
                      value={formattedValue}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setisRemember(!isRemember)}
                style={{
                  width: '90%',
                  height: h('7%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: h('5%'),
                    height: h('5%'),
                    borderWidth: 1,
                    borderColor: '#BFD0E5',
                    borderRadius: 5,
                    backgroundColor: isRemember ? maincolor : 'white',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={TextStyles.signupagreetxt}>
                    {textStrings.agreeToTxt}{' '}
                    <Text style={TextStyles.signupagreetxtunder}>
                      {textStrings.privcymTxt}
                    </Text>{' '}
                    {textStrings.andTitleTxt}{' '}
                    <Text style={TextStyles.signupagreetxtunder}>
                      {textStrings.termOfUseTxt}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <AppBtn title={textStrings.signUpTxt} clickfun={signUpFuction} />
          </View>
          <View
            style={{
              width: '100%',
              height: h('7%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: h('5%'),
            }}>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{
                width: '75%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
              }}>
              <Text style={TextStyles.loginbotonswitchnav}>
                {textStrings.haveAnAccountTxt}{' '}
                <Text style={TextStyles.signupagreetxtunder}>
                  {textStrings.loginBtnTxt}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  hadershow: {
    width: '100%',
    height: h('25%'),
    position: 'relative',
    marginBottom: h('9%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logoimg: {
    width: w('39%'),
    height: w('39%'),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -h('11%'),
    alignSelf: 'center',
  },
  screencont: {
    width: w('100%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
