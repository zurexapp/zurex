import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {maincolor, redcolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {
  checkIsUserExist,
  getDataWithRef,
  postUserDataWithId,
} from '../DataBase/databaseFunction';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../store/authSlice';
import LoadingModal from '../Components/LoadingModal';
import {useIsFocused} from '@react-navigation/native';
import {webengage} from '../webengage';
import auth from '@react-native-firebase/auth';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {scale} from 'react-native-size-matters';
import {COUNTRY_CODE, PHONE_NUMBER_LIMIT} from './CommonUtils';
import analytics from '@react-native-firebase/analytics';

const LoginScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const focus = useIsFocused();
  const {isAuth} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [formattedValue, setFormattedValue] = useState('');
  const [currentAccount, setcurrentAccount] = useState(null);
  const [otpLayoutShow, setotpLayoutShow] = useState(false);
  const [phoneConfirmation, setphoneConfirmation] = useState(null);
  const [loadinModal, setloadinModal] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [hasNavigated, setHasNavigated] = useState(false);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const intervalRef = useRef(null);

  const onAuthStateChanged = useCallback(
    async user => {
      if (user) {
        console.log('onAuthStateChanged -=> ', user);
        if (!currentAccount) {
          const result = await checkIsUserExist(user.phoneNumber, '');
          console.log('phone user -=>', result);
          if (result) {
            setcurrentAccount(result);
            dispatch(setAuth({isAuth: result}));

            const acZurexLoginUserId = COUNTRY_CODE + formattedValue;
            await AsyncStorage.setItem(
              'acZurexLoginUserId',
              acZurexLoginUserId,
            );
            await AsyncStorage.setItem('userId', result.userId);

            // Additional user data handling...

            console.log('Login successful, navigating to home screen');
            webengage.user.login(COUNTRY_CODE + formattedValue);
            webengage.user.setPhone(isAuth?.phoneNumber);

            navRoute(); // Ensure this is only called once here
          }
        }
      }
    },
    [currentAccount, dispatch, isAuth?.phoneNumber, navRoute, formattedValue],
  ); // List dependencies for memoization

  //  async function onAuthStateChanged(user) {
  //     if (user) {
  //       console.log("onAuthStateChanged -=> ", user);
  //       if(!currentAccount){
  //         const result = await checkIsUserExist(user.phoneNumber, '');
  //           console.log("phone user -=>", result);
  //           if (result) {
  //             setcurrentAccount(result);
  //             dispatch(setAuth({ isAuth: result }));

  //             const acZurexLoginUserId = COUNTRY_CODE + formattedValue;
  //             console.log('Setting acZurexLoginUserId:', acZurexLoginUserId); // Debug log

  //             await AsyncStorage.setItem('acZurexLoginUserId', acZurexLoginUserId);
  //             await AsyncStorage.setItem('userId', result.userId);

  //             const userId = result.userId;
  //             const userData = await getDataWithRef('user', userId);
  //             const userdeviceTokens = userData.deviceToken || [];
  //             const storedToken = await AsyncStorage.getItem('fcmToken');
  //             if (!userdeviceTokens.includes(storedToken)) {
  //               userdeviceTokens.push(storedToken);
  //               await postUserDataWithId(userId, {
  //                 deviceToken: userdeviceTokens,
  //               });
  //             }
  //             console.log('Login to home');

  //           setloadinModal(false);
  //           webengage.user.login(COUNTRY_CODE + formattedValue);
  //           webengage.user.setPhone(isAuth?.phoneNumber);
  //           navRoute();
  //         }
  //       }
  //     }
  //   }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);
  useEffect(() => {
    if (otpLayoutShow) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(intervalRef.current);
            setIsResendVisible(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [otpLayoutShow]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const {routeName} = route?.params;
  // Memoize the navRoute function with useCallback
  const navRoute = useCallback(() => {
    if (!hasNavigated) {
      setHasNavigated(true); // Prevent further navigation calls
      routeName?.navigation.replace(`${routeName}`);
      // navigation.replace('home4btn');
    }
  }, [hasNavigated, routeName]); // Add dependencies that affect navRoute

  // Memoized useEffect to check authentication and trigger navRoute
  useEffect(() => {
    if (isAuth?.phoneNumber?.length > 0) {
      navRoute();
    }
  }, [isAuth, navRoute, focus, navigation]); // Include navRoute here to ensure it's stable

  const startTimer = () => {
    setTimer(120);
    setIsResendVisible(false);
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          setIsResendVisible(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const logStoredToken = async () => {
    try {
      const token = await AsyncStorage.getItem('fcmToken');
      if (token) {
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    logStoredToken();
  }, []);

  const loginFuction = async () => {
    if (formattedValue?.length > 0) {
      if (formattedValue.length !== PHONE_NUMBER_LIMIT) {
        Alert.alert(
          textStrings.authErrorTitle,
          textStrings.invalidPhoneNumberError,
        );
        return;
      }
      setloadinModal(true);
      const result = await checkIsUserExist(COUNTRY_CODE + formattedValue, '');
      console.log('phone user -=>', result);
      if (result) {
        setcurrentAccount(result);
        try {
          const confirmation = await auth().signInWithPhoneNumber(
            COUNTRY_CODE + formattedValue,
          );
          setphoneConfirmation(confirmation);
          if (!otpLayoutShow) {
            setotpLayoutShow(true);
          }
          setloadinModal(false);
        } catch (error) {
          setloadinModal(false);
          handleFirebaseError(error);
        }
      } else {
        setloadinModal(false);
        Alert.alert(textStrings.authErrorTitle, textStrings.userDontEror);
      }
    } else {
      Alert.alert(textStrings.authErrorTitle, textStrings.mobileError);
    }
  };

  const handleFirebaseError = error => {
    let errorMessage = textStrings.generalError;
    switch (error.code) {
      case 'auth/invalid-phone-number':
        errorMessage = textStrings.invalidPhoneNumberError;
        break;
      case 'auth/missing-phone-number':
        errorMessage = textStrings.missingPhoneNumberError;
        break;
      case 'auth/quota-exceeded':
        errorMessage = textStrings.quotaExceededError;
        break;
      case 'auth/user-disabled':
        errorMessage = textStrings.userDisabledError;
        break;
      case 'auth/operation-not-allowed':
        errorMessage = textStrings.operationNotAllowedError;
        break;
      case 'auth/app-not-authorized':
        errorMessage =
          'This app is not authorized to use Firebase Authentication. Please verify that the correct package name, SHA-1, and SHA-256 are configured in the Firebase Console. [Invalid app info in play_integrity_token]';
        break;
      default:
        errorMessage = error.message;
    }
    Alert.alert(textStrings.authErrorTitle, errorMessage);
  };

  async function loginSuccessFlow(phoneNumber) {
    dispatch(setAuth({isAuth: currentAccount}));
    await AsyncStorage.setItem(
      'acZurexLoginUserId',
      COUNTRY_CODE + formattedValue,
    );
    await AsyncStorage.setItem('userId', currentAccount.userId);
    await AsyncStorage.setItem('userName', currentAccount.name);
    const userId = currentAccount.userId;
    const userData = await getDataWithRef('user', userId);
    console.log(`123213`, userData);
    const userdeviceTokens = userData.deviceToken || [];
    const storedToken = await AsyncStorage.getItem('fcmToken');
    if (!userdeviceTokens.includes(storedToken)) {
      userdeviceTokens.push(storedToken);
      await postUserDataWithId(userId, {
        deviceToken: userdeviceTokens,
      });
    }
    console.log('Login successful, navigating to home screen');
    setloadinModal(false);
    webengage.user.login(COUNTRY_CODE + formattedValue);
    webengage.user.setPhone(isAuth?.phoneNumber);

    try {
      console.log('Triggering Firebase Analytics event: User_Login_Success');
      await analytics().logEvent('app_User_Login', {
        phoneNumber: COUNTRY_CODE + formattedValue,
        userEmail: userData.userEmail,
      });
      console.log('Firebase Analytics event logged successfully');
    } catch (error) {
      console.error('Error logging Firebase Analytics event:', error);
    }

    navRoute();
  }

  const otpSubmitFunction = async () => {
    try {
      setloadinModal(true);
      await phoneConfirmation.confirm(value);
      await loginSuccessFlow();
      navigation.navigate('home4btn');
    } catch (error) {
      setloadinModal(false);
      Alert.alert(
        textStrings.productTitleEror,
        error?.message
          ? error?.message?.includes('auth/invalid-verification-code')
            ? textStrings.invalidVerficationCodeError
            : error?.message
          : error,
      );
    }
  };

  // const otpSubmitFunction = async () => {
  //   try {
  //     setloadinModal(true);
  //     await phoneConfirmation.confirm(value);
  //     loginSuccessFlow();
  //   } catch (error) {
  //     setloadinModal(false);
  //     Alert.alert(
  //       textStrings.productTitleEror,
  //       error?.message
  //         ? error?.message?.includes('auth/invalid-verification-code')
  //           ? textStrings.invalidVerficationCodeError
  //           : error?.message
  //         : error,
  //     );
  //   }
  // };

  return (
    <>
      <View style={styles.screencont}>
        <LoginUprHeader isLanguageSwich={true} />
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <View
                style={{
                  width: w('100%'),
                  height: otpLayoutShow ? h('59%') : h('45%'),
                }}>
                {otpLayoutShow ? (
                  <View
                    style={{
                      width: '100%',
                      height: h('47%'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                    }}>
                    <View style={{width: '100%', marginTop: h('3%')}}>
                      <Text style={TextStyles.verificationCodemainhed}>
                        {textStrings.enterVerfCodeTxt}
                      </Text>
                      <View style={{width: '90%', alignSelf: 'center'}}>
                        <Text
                          style={[
                            TextStyles.verifcationcodesentdesc,
                            {fontSize: scale(14)},
                          ]}>
                          {textStrings.enterVerfSubTxt}
                          {'\n'}
                          <Text style={{color: redcolor}}>
                            ({COUNTRY_CODE} {formattedValue})
                          </Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.replace('Login', {
                              routeName: 'home4btn',
                            });
                          }}>
                          <Text style={TextStyles.verficationchangenumber}>
                            {textStrings.enterVerfChangNum}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        height: w('15%'),
                        alignSelf: 'center',
                        backgroundColor: '#FBFBFB',
                      }}>
                      <Text
                        style={{
                          ...TextStyles.verifCodeScreentxt,
                          marginBottom: h('1.5%'),
                        }}>
                        {textStrings.verfCode}
                      </Text>
                      <CodeField
                        ref={ref}
                        value={value}
                        onChangeText={setValue}
                        cellCount={6}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={Platform.select({
                          android: 'sms-otp',
                          default: 'one-time-code',
                        })}
                        renderCell={({index, symbol, isFocused}) => (
                          <Text
                            key={index}
                            style={[
                              TextStyles.celltxt,
                              isFocused && styles.focusCell,
                              {color: '#000'}, // Adjust the color as needed
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        )}
                      />
                    </View>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: h('3%'),
                      }}>
                      <TouchableOpacity
                        onPress={
                          isResendVisible
                            ? () => {
                                loginFuction();
                                startTimer();
                              }
                            : () => null
                        }>
                        <Text
                          style={[
                            TextStyles.verificationresendtxt,
                            {color: isResendVisible ? maincolor : textcolor},
                          ]}>
                          {textStrings.reSendTxt}
                        </Text>
                      </TouchableOpacity>
                      <Text style={TextStyles.verifcationtime}>
                        {formatTime(timer)}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: h('30%'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      flexDirection: 'column',
                    }}>
                    <View>
                      <Text style={TextStyles.loginInputheading}>
                        {textStrings.loginInputFieldTxt1}
                      </Text>
                      <View
                        style={{
                          width: w('90%'),
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
                        <Icon
                          name="mobile1"
                          size={h('3.5%')}
                          color={textcolor}
                        />
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
                            }}>
                            {COUNTRY_CODE}
                          </Text>
                          <TextInput
                            style={{
                              flex: 1,
                              height: '100%',
                              ...TextStyles.textinputfamilyclassAll,
                            }}
                            value={formattedValue}
                            placeholder={textStrings.loginInputFieldTxt1}
                            onChangeText={text => {
                              setFormattedValue(text);
                            }}
                            maxLength={PHONE_NUMBER_LIMIT}
                            keyboardType={'number-pad'}
                            returnKeyType={'done'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                {otpLayoutShow ? (
                  <AppBtn
                    title={textStrings.loginBtnTxt}
                    isDisabled={value?.length < 6 ? true : false}
                    clickfun={otpSubmitFunction}
                  />
                ) : (
                  <AppBtn title={textStrings.nextTxt} clickfun={loginFuction} />
                )}
              </View>
              {otpLayoutShow ? (
                <View
                  style={{
                    width: '100%',
                    height: h('6%'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                  }}
                />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: h('10%'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    marginBottom: 70,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SignUp', {routeName: routeName})
                    }
                    style={{
                      width: '85%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      flexDirection: 'column',
                      margin: 10,
                    }}>
                    <Text style={TextStyles.loginbotonswitchnav}>
                      {textStrings.dontAccount}{' '}
                      <Text style={TextStyles.signupagreetxtunder}>
                        {textStrings.createTxt}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          }
        />
      </View>

      <LoadingModal visibleModal={loadinModal} />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  focusCell: {
    borderColor: redcolor,
  },
  codeFieldRoot: {
    width: w('72%'),
    height: w('15.1%'),
  },
  hadershow: {
    width: '100%',
    height: h('25%'),
    position: 'relative',
    marginBottom: h('9%'),
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
    height: h('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
