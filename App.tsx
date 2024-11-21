import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import database from '@react-native-firebase/database';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MyStackNavigation from './src/Navigation/MyStackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {getDataWholeCollection} from './src/DataBase/databaseFunction';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBatteryCompaniesData,
  setMyOrdersData,
  setOilCompaniesData,
  setSupportServicesData,
} from './src/store/projectSlice';
import {Tabby} from 'tabby-react-native-sdk';
import {WhiteColor} from './src/assets/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsArabicLanguage} from './src/store/authSlice';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useTranslation} from './src/Text/TextStrings';
// import GetLocation from 'react-native-get-location';

Tabby.setApiKey('pk_test_0c164983-e322-4e28-9f9e-27e3dd191a4d');

function App(): React.JSX.Element {
  // const [location, setLocation] = useState<any>(null);
  // const [error, setError] = useState<any>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const {isAuth} = useSelector((state: any) => state?.auth);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
  };
  const dispatch = useDispatch();
  // const checkLocationPermission = async () => {
  //   try {
  //     const result = await check(
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //     );

  //     if (result === RESULTS.GRANTED) {
  //       // Location permission is granted, check GPS status
  //       checkGpsStatus();
  //     } else {
  //       // Location permission is not granted, request permission
  //       requestLocationPermission();
  //     }
  //   } catch (err) {
  //     console.error('Error checking location permission:', err);
  //   }
  // };

  // const requestLocationPermission = async () => {
  //   try {
  //     const result = await request(
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //     );

  //     if (result === RESULTS.GRANTED) {
  //       checkGpsStatus();
  //     } else {
  //       setError(textStrings.locationPermissionDenied);
  //     }
  //   } catch (err) {
  //     console.error('Error requesting location permission:', err);
  //   }
  // };

  // const checkGpsStatus = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       setLocation(location);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       promptToEnableGps();
  //     });
  // };

  // const promptToEnableGps = () => {
  //   if (Platform.OS === 'android') {
  //     setError(textStrings.gpsDisabled);
  //   }
  // };
  const getAllOtherData = async () => {
    const langReslt = await AsyncStorage.getItem('ac-zuex-client-language');
    dispatch(
      setIsArabicLanguage({
        isArabicLanguage: langReslt
          ? langReslt === 'arabic'
            ? true
            : false
          : false,
      }),
    );
    const support = await getDataWholeCollection('SupportServices');
    dispatch(setSupportServicesData({supportServicesData: support}));
    // const mobileClientsBanner = await getDataWholeCollection(
    //   'mobClientsBanner',
    // );
    // dispatch(
    //   setMobileClientsBanner({mobileClientsBanner: mobileClientsBanner}),
    // );
    const BatteryCompanies = await getDataWholeCollection('BatteryCompanies');
    dispatch(setBatteryCompaniesData({batteryCompaniesData: BatteryCompanies}));

    const OilCompanies = await getDataWholeCollection('OilCompanies');
    dispatch(setOilCompaniesData({oilCompaniesData: OilCompanies}));
  };
  useEffect(() => {
    getAllOtherData();
  });
  // useEffect(() => {
  //   if (isAuth?.userId) {
  //     getAllOtherData();
  //   }
  // }, [isAuth]);
  useEffect(() => {
    database()
      .ref(`/orders`)
      .on('value', async onSnapshot => {
        const value = await onSnapshot.val();
        if (value) {
          let returnArr: any = [];
          Object.entries(value).forEach((dat: any) => {
            returnArr.push({id: dat[0], ...dat[1]});
          });
          dispatch(
            setMyOrdersData({
              myOrdersData: returnArr.filter(
                (dat: any) => `${dat.OrderedByUserId}` === `${isAuth?.userId}`,
              ),
            }),
          );
        }
      });
  });
  const {textStrings} = useTranslation();
  console.log(textStrings);

  return (
    <NavigationContainer>
      <SafeAreaView style={{...backgroundStyle, flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={WhiteColor} />

        <MyStackNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
