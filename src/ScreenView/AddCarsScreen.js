import {StyleSheet, View, Image, TextInput, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {c0color, textcolor} from '../assets/Colors';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../Components/LoadingModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {webengage} from '../webengage';
import {useDispatch, useSelector} from 'react-redux';
import {setClientCarsData} from '../store/projectSlice';
import {postDataWithRef} from '../DataBase/databaseFunction';
import {TABLE_CLIENT_CARS, guidGenerator} from './CommonUtils';

const AddCarsScreen = ({navigation}) => {
  const {isArabicLanguage} = useSelector(state => state.auth);

  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const {adminCarsData} = useSelector(state => state.project);
  // const [selectedCarType, setselectedCarType] = useState('');
  // const [selectedCarCategory, setselectedCarCategory] = useState('');
  // const [selectedCarModal, setselectedCarModal] = useState('');
  const [carPlateNumber, setCarPlateNumber] = useState('');
  const [carPlateTxt, setcarPlateTxt] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [selctedComapny, setselctedComapny] = useState('');
  const [cylinder, setCylinder] = useState();
  const [selectedCarModalName, setselectedCarModalName] = useState('');
  const [selctedCarModal, setselctedCarModal] = useState('');
  const [carModalNameArry, setcarModalNameArry] = useState([]);
  const [carModals, setcarModals] = useState([]);
  const {isAuth} = useSelector(state => state?.auth);
  const {clientCarsData} = useSelector(state => state.project);

  const fetchAllCarsData = async () => {
    if (!isAuth) {
      setisLoading(true);
      const carsResult = await AsyncStorage.getItem('ac-zurex-client-CarsData');
      if (carsResult) {
        dispatch(setClientCarsData({clientCarsData: JSON.parse(carsResult)}));
      }
      setisLoading(false);
    }
  };

  const addNewCar = async carData => {
    try {
      const uuid = guidGenerator();
      carData['id'] = uuid; // Add the UUID to carData

      // Attempt to add the car data to the database
      await postDataWithRef(TABLE_CLIENT_CARS, uuid, carData);

      // Update the Redux store with the new car data
      const clientCarsDataNew = [...clientCarsData, carData];
      dispatch(setClientCarsData({clientCarsData: clientCarsDataNew}));

      // Track the event using WebEngage
      webengage.track('NewCarAdded', {
        userId: isAuth.userId,
        carDetails: carData,
        mode: 'manual',
      });
    } catch (error) {
      console.error('Error adding new car:', error);
      // Alert.alert(textStrings.authErrorTitle, error?.message ? error?.message : error);
    }
  };

  const handleInputChange = text => {
    const firstFourCharacters = text.trim().slice(0, 4);
    const remainingText = text.trim().slice(4);
    const remainingWords = remainingText.split(/\s+/);
    if (
      /^\d+$/.test(firstFourCharacters) &&
      remainingWords.length === 3 &&
      /^[a-zA-Z\u0600-\u06FF]+$/.test(remainingText)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const uniqueCompanies = [
    ...new Set(adminCarsData.map(car => car.carCompany)),
  ];

  // Transform unique companies data into desired format
  const companiesData = uniqueCompanies.map(company => ({
    title: isArabicLanguage
      ? adminCarsData.find(car => car.carCompany === company).carCompanyAr
      : company,
    value: isArabicLanguage
      ? adminCarsData.find(car => car.carCompany === company).carCompanyAr
      : company,
  }));

  // Filter car modals based on selected company and name

  useEffect(() => {
    const convertRawDataToFormatModal = async () => {
      const uniqueCarName = [
        ...new Set(
          adminCarsData
            .filter(
              car =>
                (car.carCompany === selctedComapny ||
                  car.carCompanyAr === selctedComapny) &&
                (car.carName === selectedCarModalName ||
                  car.carNameAr === selectedCarModalName),
            )
            .map(car => car.carModal),
        ),
      ];
      const formatedCarName = uniqueCarName.map(carModalDat => ({
        title: carModalDat,
        value: carModalDat,
      }));
      setcarModals(formatedCarName);
    };
    convertRawDataToFormatModal();
  }, [selectedCarModalName, selctedComapny, adminCarsData, isArabicLanguage]);

  useEffect(() => {
    const convertRawDataToFormat = async () => {
      const uniqueCarName = [
        ...new Set(
          adminCarsData
            .filter(
              car =>
                car.carCompany === selctedComapny ||
                car.carCompanyAr === selctedComapny,
            )
            .map(car => car.carName),
        ),
      ];
      const formatedCarName = uniqueCarName.map(company => ({
        title: isArabicLanguage
          ? adminCarsData.find(car => car.carName === company).carNameAr
          : company,
        value: isArabicLanguage
          ? adminCarsData.find(car => car.carName === company).carNameAr
          : company,
      }));
      setcarModalNameArry(formatedCarName);
    };
    convertRawDataToFormat();
    setselectedCarModalName('');
    setselctedCarModal('');
  }, [selctedComapny, isArabicLanguage, adminCarsData]);

  const saveDataCarFun = async () => {
    console.log('Function called: saveDataCarFun');
    const storedUserId = await AsyncStorage.getItem('userId');

    console.log('Input Values:', {
      selctedCarModal,
      selctedComapny,
      selectedCarModalName,
      carPlateNumber,
      carPlateTxt,
    });

    // Log lengths for debugging
    console.log('Lengths:', {
      carPlateNumberLength: carPlateNumber.length,
      carPlateTxtLength: carPlateTxt.length,
    });

    // Validation checks
    if (
      selctedCarModal !== '' &&
      selctedComapny !== '' &&
      selectedCarModalName !== '' &&
      carPlateNumber.length > 0 &&
      carPlateNumber.length < 5 &&
      carPlateTxt.length > 0 &&
      carPlateTxt.length < 6
    ) {
      console.log('Validation passed.');

      const regex = /^[a-zA-Z\u0600-\u06FF\s]*$/;
      if (regex.test(carPlateTxt)) {
        console.log('Plate text validation passed.');
        setisLoading(true);

        const plateNumberToCheck =
          `${carPlateTxt.trim()} ${carPlateNumber.trim()}`.trim();
        console.log('Plate number to check:', plateNumberToCheck);

        try {
          const carsResult = await AsyncStorage.getItem(
            'ac-zurex-client-CarsData',
          );

          const existingCarsData = !storedUserId
            ? JSON.parse(carsResult || '[]')
            : clientCarsData;
          console.log('Existing cars data:', existingCarsData);

          const isDuplicate = existingCarsData.some(
            car => car.numberPlate === plateNumberToCheck,
          );
          console.log('Is duplicate:', isDuplicate);
          if (isDuplicate) {
            setisLoading(false);
            console.log('Duplicate plate number found.');
            Alert.alert(
              textStrings.productTitleEror,
              textStrings.carPlateNumberErrorAlert,
            );
            return; // Exit early
          }

          // Construct the new car data
          const newData = {
            carName: `${selctedComapny} ${selectedCarModalName} ${selctedCarModal}`,
            category: selctedComapny,
            imglink:
              'https://firebasestorage.googleapis.com/v0/b/aczurex-d4b61.appspot.com/o/pngwing.com.png?alt=media&token=3236869c-480f-4c7c-82c2-babb54f715a2',
            numberPlate: plateNumberToCheck,
            cylinder: cylinder,
            userId: storedUserId, // Add userId directly here
          };

          console.log('New car data to save:', newData);

          if (storedUserId) {
            await addNewCar(newData); // Wait for the car to be added
            console.log('Car added for authenticated user.');
          } else {
            await AsyncStorage.setItem(
              'ac-zurex-client-CarsData',
              JSON.stringify([...existingCarsData, newData]),
            );
            console.log('Car saved to AsyncStorage for guest user.');
          }

          // Clear inputs and navigate
          fetchAllCarsData();
          resetForm(); // Clear state
          navigation.navigate('WaitScreen');
          console.log('Navigated to WaitScreen.');
        } catch (error) {
          console.error('Error saving car data:', error);
          setisLoading(false);
          Alert.alert(
            textStrings.productTitleEror,
            textStrings.carAddErrorManual,
          );
        }
      } else {
        setisLoading(false);
        console.log('Plate text validation failed.');
        Alert.alert(
          textStrings.productTitleEror,
          textStrings.carPlateNumberError,
        );
      }
    } else {
      setisLoading(false);
      console.log(
        'Validation failed: One or more fields are empty or invalid.',
      );
      Alert.alert(textStrings.productTitleEror, textStrings.carAddErrorManual);
    }
  };

  const resetForm = () => {
    setselctedComapny('');
    setselectedCarModalName('');
    setselctedCarModal('');
    setCarPlateNumber('');
    setcarPlateTxt('');
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.addCar}
          iconName1={'left'}
          iconName2={''}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <Image
            source={require('../assets/addcars.png')}
            style={styles.balanceImg}
          />
          <View style={styles.otherContent}>
            <View
              style={{
                width: '100%',
                flex: 0.9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                // marginBottom: h('1%'),
              }}>
              <CustomDropDownBtn
                listData={companiesData}
                title={textStrings.selectCarCatg}
                value={selctedComapny}
                onCangeValue={text => setselctedComapny(text)}
                isDropDown={true}
                mainHeading={textStrings.selectCarCatg}
              />
              <CustomDropDownBtn
                listData={carModalNameArry}
                title={textStrings.selectCarType}
                isDisabled={selctedComapny?.length > 0 ? false : true}
                value={selectedCarModalName}
                onCangeValue={text => setselectedCarModalName(text)}
                isDropDown={true}
                mainHeading={textStrings.selectCarType}
              />
              <CustomDropDownBtn
                listData={carModals}
                isDisabled={selectedCarModalName?.length > 0 ? false : true}
                title={textStrings.selectCarModal}
                value={selctedCarModal}
                onCangeValue={text => setselctedCarModal(text)}
                isDropDown={true}
                mainHeading={textStrings.selectCarModal}
              />

              <TextInput
                value={carPlateNumber}
                returnKeyType="done"
                placeholderTextColor={c0color}
                maxLength={4}
                style={{
                  ...styles.textInputCust,
                  ...TextStyles.textinputfamilyclassAll,
                  borderColor: c0color,
                  marginVertical: h('0.7%'),
                }}
                onChangeText={text => setCarPlateNumber(text.toUpperCase())} // Convert input to uppercase
                keyboardType="number-pad"
                placeholder={textStrings.writePlateNumber}
              />

              <TextInput
                value={carPlateTxt}
                returnKeyType={'done'}
                placeholderTextColor={c0color}
                maxLength={5}
                style={{
                  ...styles.textInputCust,
                  ...TextStyles.textinputfamilyclassAll,
                  borderColor: c0color,
                  marginTop: h('0.5%'),
                }}
                onChangeText={text => setcarPlateTxt(text.toUpperCase())}
                keyboardType="name-phone-pad"
                placeholder={textStrings.writePlateTxt}
              />
              <TextInput
                value={cylinder || ''}
                placeholderTextColor={c0color}
                maxLength={2}
                style={{
                  ...styles.textInputCust,
                  ...TextStyles.textinputfamilyclassAll,
                  borderColor: c0color,
                  marginTop: h('0.5%'),
                }}
                onChangeText={text => setCylinder(text)}
                keyboardType="name-phone-pad"
                placeholder={textStrings.cylinder}
              />
            </View>
            <AppBtn title={textStrings.addCar} clickfun={saveDataCarFun} />
            <View style={{width: 100, height: 80}} />
          </View>
        </View>
        <LoadingModal visibleModal={isLoading} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddCarsScreen;

const styles = StyleSheet.create({
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
    height: h('12%'),
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
  mainTxt: {fontSize: h('2.3%'), color: textcolor, marginBottom: h('0.5%')},
  subtxt: {fontSize: h('1.8%'), color: textcolor},
  valuetxt: {fontSize: h('2.3%'), color: textcolor, fontWeight: 'bold'},
  textInputCust: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    paddingHorizontal: w('4%'),
    height: h('7.5%'),
    backgroundColor: '#FAFCFF',
    fontSize: h('2.1%'),
  },
});
