import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {WhiteColor, maincolor, redcolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import CustomBtn from '../Components/CustomBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from '../Components/LoadingModal';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setClientCarsData, setAdminCarsData} from '../store/projectSlice';
import {
  getDataWholeCollection,
  postDataWithRef,
} from '../DataBase/databaseFunction';
import {TABLE_CLIENT_CARS, guidGenerator} from './CommonUtils';

const MyCarsAddScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {isArabicLanguage} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [showPlateformNumberCode, setshowPlateformNumberCode] = useState(false);
  const [carPlateNumber, setCarPlateNumber] = useState('');
  const [carPlateTxt, setCarPlateTxt] = useState('');
  const [Loading, setLoading] = useState(false);
  const [currentCarResult, setcurrentCarResult] = useState(null);
  const {isAuth} = useSelector(state => state?.auth);
  const {clientCarsData} = useSelector(state => state.project);

  const addNewCar = async carData => {
    const userId = await AsyncStorage.getItem('userId');

    carData['userId'] = userId;
    const uuid = guidGenerator();

    await postDataWithRef(TABLE_CLIENT_CARS, uuid, carData)
      .then(() => {
        carData['id'] = uuid;
        carData['thirdparty_source'] = 'elm';
        const clientCarsDataNew = [...clientCarsData, carData];
        dispatch(setClientCarsData({clientCarsData: clientCarsDataNew}));
      })
      .catch(error => {
        Alert.alert(
          textStrings.authErrorTitle,
          error?.message ? error?.message : error,
        );
      });
  };

  const handleAddCarsScreenNavigation = async () => {
    setLoading(true);
    try {
      const allCarsDataAdmin = await getDataWholeCollection('adminCarsData');
      dispatch(setAdminCarsData({adminCarsData: allCarsDataAdmin}));
      setLoading(false);
      navigation.navigate('AddCarsScreen');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  const fetchAllCarsData = async () => {
    const carsResult = await AsyncStorage.getItem('ac-zurex-client-CarsData');
    if (carsResult) {
      dispatch(setClientCarsData({clientCarsData: JSON.parse(carsResult)}));
    }
  };

  const saveCarData = async () => {
    if (currentCarResult?.make) {
      console.log('Current car result found:', currentCarResult);
      const userId = await AsyncStorage.getItem('userId');
      console.log('User ID:', userId);
      console.log('Client cars data:', clientCarsData);

      const existingCarsData = clientCarsData || [];

      // Normalize the new plate number to uppercase for duplicate checking
      const newPlateNumber = `${carPlateTxt} ${carPlateNumber}`.toUpperCase();

      // Check for duplicate number plates (case-insensitive)
      const isDuplicate = existingCarsData.some(
        car => car.numberPlate.toUpperCase() === newPlateNumber,
      );

      if (isDuplicate) {
        Alert.alert(
          textStrings.productTitleEror,
          textStrings.carPlateNumberErrorAlert,
        );
      } else {
        const datatoShow = {
          carName: `${currentCarResult?.make || ''} ${
            currentCarResult?.model || ''
          } ${currentCarResult?.modelYear || ''}`,
          category: currentCarResult?.vehicleClassDescAr || '',
          imglink:
            'https://firebasestorage.googleapis.com/v0/b/aczurex-d4b61.appspot.com/o/pngwing.com.png?alt=media&token=3236869c-480f-4c7c-82c2-babb54f715a2',
          numberPlate: newPlateNumber, // Use the normalized uppercase plate number
          cylinder: currentCarResult.cylinder,
        };

        if (userId) {
          addNewCar(datatoShow);
          console.log('New car added for authenticated user.');
        } else {
          const carsResult = await AsyncStorage.getItem(
            'ac-zurex-client-CarsData',
          );
          const newData = carsResult
            ? [...JSON.parse(carsResult), datatoShow]
            : [datatoShow];
          await AsyncStorage.setItem(
            'ac-zurex-client-CarsData',
            JSON.stringify(newData),
          );
          console.log('New car saved to AsyncStorage.');
        }

        setcurrentCarResult(null);
        setCarPlateNumber('');
        setCarPlateTxt('');
        fetchAllCarsData();
        navigation.navigate('WaitScreen');
      }

      setLoading(false);
    } else {
      Alert.alert(textStrings.productTitleEror, textStrings.carAddErrorManual);
    }
  };

  const fetchCarFun = async () => {
    if (
      carPlateTxt.length >= 1 &&
      carPlateTxt.length <= 5 &&
      carPlateNumber?.length <= 4
    ) {
      setLoading(true);
      await fetch('https://yakeencore.api.elm.sa/api/v2/yakeen/login', {
        method: 'GET',
        headers: new Headers({
          Authorization: 'application/json',
          'app-id': '6a8020cb',
          'app-key': '4a5cf5aa0d113fbbe560ec714a043e67',
          Username: 'ISMAIL_JAMAAN_AL_JAMAAN_TRADING_EST_YAK',
          Password: '06eVQrS3zbtv80sW7RJQ',
        }),
      })
        .then(resp => resp.json())
        .then(async rest => {
          await fetch(
            `https://yakeencore.api.elm.sa/api/v1/yakeen/data?plateText1=${
              carPlateTxt.split(' ')[0]
            }&plateText3=${
              carPlateTxt.split(' ')[2]
            }&plateNo=${carPlateNumber}&plateText2=${
              carPlateTxt.split(' ')[1]
            }&regType=1`,
            {
              method: 'GET',
              headers: new Headers({
                'Content-Type': 'application/json',
                'app-id': '6a8020cb',
                'Accept-Language': 'ar',
                'app-key': '4a5cf5aa0d113fbbe560ec714a043e67',
                Authorization: `${rest?.token_type} ${rest?.access_token}`,
                'service-identifier': '80d81cf0-d3b4-4887-b1d7-1340090d7a72',
                'usage-code': 'USC50008',
                'operator-id': '2260079419',
              }),
            },
          )
            .then(resp => resp.json())
            .then(async rest => {
              if (rest?.vehicleInfo) {
                setcurrentCarResult(rest?.vehicleInfo);
              } else {
                Alert.alert(
                  textStrings.productTitleEror,
                  isArabicLanguage
                    ? rest?.errorDetail?.errorTitle
                    : 'Unable to retrieve data',
                  [
                    {
                      text: 'OK',
                      onPress: () =>
                        Linking.openURL(
                          'https://api.whatsapp.com/send/?phone=966557488008',
                        ),
                    },
                  ],
                );
              }
            })
            .catch(e => Alert.alert('Error', e?.message ? e.message : e));
        })
        .catch(e => Alert.alert('Auth error', e?.message ? e.message : e));
      setLoading(false);
    } else {
      Alert.alert(textStrings.productTitleEror, textStrings.carPlateNewrror);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.myCars}
          iconName1={'left'}
          iconName2={''}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <Text style={TextStyles.carsaddscreenmainhed}>
            {textStrings.chooseMethodTxt}
          </Text>
          <CustomBtn
            clickfun={() => {
              setshowPlateformNumberCode(!showPlateformNumberCode);
              setcurrentCarResult(null);
              setCarPlateNumber('');
              setCarPlateTxt('');
            }}
            title={textStrings.plateNumTxt}
            bgColor={maincolor}
            secColor={'white'}
          />
          <View style={{marginBottom: h('2%')}} />
          {!showPlateformNumberCode && (
            <CustomBtn
              clickfun={handleAddCarsScreenNavigation}
              title={textStrings.manualEnteryTxt}
            />
          )}
          {showPlateformNumberCode && (
            <FlatList
              ListHeaderComponent={
                <>
                  {currentCarResult?.make ? (
                    <View style={styles.dataContainerView}>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.regTypeDescAr}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.regTypeDescAr}
                        </Text>
                      </View>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.vehicleIDNumber}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.vehicleIDNumber}
                        </Text>
                      </View>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.make}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.make}
                        </Text>
                      </View>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.modalTxt}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.model}
                        </Text>
                      </View>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.modelYear}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.modelYear}
                        </Text>
                      </View>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.vehicleClassDescAr}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.vehicleClassDescAr}
                        </Text>
                      </View>
                      <View style={styles.sideBySideView}>
                        <Text
                          style={{
                            ...TextStyles.customDropdowntitletxt,
                            color: maincolor,
                          }}>
                          {textStrings.cylinder}
                        </Text>
                        <Text style={{...TextStyles.customdropdownvaluetxt}}>
                          {currentCarResult?.cylinder}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.textContainer}>
                        <Text style={styles.customTextStyle}>
                          {textStrings.plateplaceTxt}
                        </Text>
                      </View>

                      <View style={styles.inlinetxtfildscont}>
                        <TextInput
                          value={carPlateNumber}
                          style={[
                            styles.textInputCust,
                            TextStyles.textinputfamilyclassAll,
                          ]}
                          onChangeText={text =>
                            setCarPlateNumber(text.toUpperCase())
                          } // Convert input to uppercase
                          keyboardType="number-pad"
                          placeholder="3300"
                          maxLength={4}
                          placeholderTextColor="grey"
                        />
                        <TextInput
                          value={carPlateTxt}
                          style={[
                            styles.textInputCust,
                            TextStyles.textinputfamilyclassAll,
                          ]}
                          onChangeText={text =>
                            setCarPlateTxt(text.toUpperCase())
                          } // Convert input to uppercase
                          placeholder="XXXXX"
                          maxLength={5}
                          placeholderTextColor="grey"
                        />
                      </View>
                    </View>
                  )}
                </>
              }
              ListFooterComponent={
                <>
                  {currentCarResult?.make ? (
                    <View
                      style={{
                        ...styles.sideBySideView,
                        marginTop: h('7%'),
                        width: '90%',
                        alignSelf: 'center',
                      }}>
                      <View style={{width: '45%'}}>
                        <CustomBtn
                          title={textStrings.cancelTxt}
                          clickfun={() => {
                            setcurrentCarResult(null);
                            setCarPlateNumber('');
                            setCarPlateTxt('');
                          }}
                        />
                      </View>
                      <View style={{width: '45%'}}>
                        <CustomBtn
                          title={textStrings.nextTxt}
                          clickfun={saveCarData}
                          bgColor={maincolor}
                          secColor={WhiteColor}
                        />
                      </View>
                    </View>
                  ) : (
                    <AppBtn
                      title={textStrings.nextTxt}
                      clickfun={fetchCarFun}
                    />
                  )}
                  <View style={{marginBottom: h('10%')}} />
                </>
              }
            />
          )}
        </View>
      </View>
      <LoadingModal visibleModal={Loading} />
    </KeyboardAwareScrollView>
  );
};

export default MyCarsAddScreen;

const styles = StyleSheet.create({
  sideBySideView: {
    height: h('4%'),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dataContainerView: {
    width: '90%',
    minHeight: 20,
    padding: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 15,
    elevation: Platform.OS === 'android' ? 2 : 0,
    backgroundColor: WhiteColor,
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: h('25%'),
    resizeMode: 'contain',
    borderRadius: h('4%'),
    position: 'absolute',
    top: -h('12%'),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  customTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  headerDivCont: {
    width: '100%',
    height: h('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('6.5%'),
  },
  headerbtn: {
    width: w('15%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  reddot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
    top: h('2%'),
    right: w('3%'),
  },
  screenname: {
    width: w('70%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  circleCont: {
    width: h('4%'),
    height: h('4%'),
    borderRadius: h('10%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTxtCont: {
    width: '75%',
  },
  smallcont: {
    width: h('1.5%'),
    height: h('1.5%'),
    borderRadius: h('10%'),
    backgroundColor: redcolor,
  },

  pointContainer: {
    width: '49%',
    height: '100%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
  },
  SrNumberCont: {
    width: '100%',
    marginBottom: h('1.2%'),
  },
  MainTextCont: {
    width: '100%',
  },
  creditcardimg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
  smallImageS: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainerSmall: {
    position: 'absolute',
    top: h('2.5%'),
    left: w('6%'),
    width: w('18%'),
    height: h('5%'),
    paddingHorizontal: h('1%'),
    paddingVertical: h('1.1%'),
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  balanceImg: {
    width: '90%',
    height: h('15%'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: h('4%'),
  },

  mainTxt: {fontSize: h('2.3%'), color: textcolor, marginBottom: h('0.5%')},
  subtxt: {fontSize: h('1.8%'), color: textcolor},
  valuetxt: {fontSize: h('2.3%'), color: textcolor, fontWeight: 'bold'},
  textInputCust: {
    width: '49%',
    alignSelf: 'center',
    borderWidth: 1,
    paddingHorizontal: w('2.7%'),
    height: h('6.7%'),
    backgroundColor: '#FAFCFF',
    fontSize: h('2.2%'),
    borderColor: '#BFD0E5',
    writingDirection: 'rtl',
    color: 'black',
  },
  inlinetxtfildscont: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: h('3%'),
  },
});
