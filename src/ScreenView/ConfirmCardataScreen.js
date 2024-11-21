// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import {greencolor, maincolor, textcolor} from '../assets/Colors';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AppBtn from '../Components/AppBtn';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import {useSelector, useDispatch} from 'react-redux';
// import {setCurentOrderProductData} from '../store/orderProcessSlice';
// import {setBatteryCompaniesData, setBatteryData, setClientCarsData, setEngineOilData, setEngineOilPetrolData, setFiltersDta, setOilCompaniesData, setOilsData, setTireCompaniesData, setTireData} from '../store/projectSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LoadingModal from '../Components/LoadingModal';
// import Icon3 from 'react-native-vector-icons/FontAwesome5';
// import Modal from 'react-native-modal';
// import { RadioButton } from 'react-native-paper';
// import { getDataWholeCollection, getMyCars } from '../DataBase/databaseFunction';

// const ConfirmCardataScreen = ({navigation}) => {
//   const {textStrings} = useTranslation();
//   const {clientCarsData} = useSelector(state => state.project);
//   const {orderProcessName, enableCardData, curentOrderProductData} =
//     useSelector(state => state.orderProcess);
//   const [selectedCar, setselectedCar] = useState('');
//   const cardDtatNull = clientCarsData ? clientCarsData : [];
//   const [loadingModal, setloadingModal] = useState(false);
//   const carsData = cardDtatNull ? cardDtatNull : [];
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [fuelType, setFuelType] = useState('');
//   const [error, setError] = useState('');

//   const dispatch = useDispatch();
//   const getUserID = async () => {

//     try {
//       const storedUserId = await AsyncStorage.getItem('userId');

//       if (storedUserId) {
//        console.log(`userID: ${storedUserId}`);
//        return storedUserId;
//       }
//       return null;
//     } catch (error) {
//       console.log("User is not logged in")
//     }
//   };

//   const clickFun = async () => {
//     const userId = await getUserID();
//     if (userId) {
//       navigation.navigate('MyCarsAddScreen');
//     } else {
//       navigation.navigate('Login');
//     }
//   };

//   useEffect(()=>{
//     getAllMyCars();
//   },[])

//   const getAllMyCars = async () => {

//     const storedUserId = await AsyncStorage.getItem('userId');
//     const carsResult = await getMyCars(storedUserId);
//     console.log(carsResult,`carsResult`);

//     if (carsResult) {
//       dispatch(setClientCarsData({clientCarsData: carsResult}));
//     }

//   };

//   // const fetchAllCarsData = async () => {
//   //   setloadingModal(true);
//   //   try {
//   //     const carsResult = await AsyncStorage.getItem('ac-zurex-client-CarsData');
//   //     console.log(`cardata`,carsResult);

//   //     if (carsResult) {
//   //       dispatch(setClientCarsData({clientCarsData: JSON.parse(carsResult)}));
//   //     }
//   //   } catch (error) {
//   //   } finally {
//   //     setloadingModal(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchAllCarsData();
//   // }, []);

//   const forButonsFunct = async () => {
//       const selectedCarData = carsData?.find(
//       dat => dat.numberPlate === selectedCar,
//     );

//     console.log("Selected Car Details:", selectedCarData); // Log details of the selected car

//     if (orderProcessName === 'oilFilter') {
//       setIsModalVisible(true);
//     } else {
//       proceedToNextScreen();
//     }
//   };

//   // const forButonsFunct = async () => {
//   //   console.log("hhhhhhhhhhh");
//   //   if (orderProcessName === 'oilFilter') {
//   //     setIsModalVisible(true);
//   //   } else {
//   //     proceedToNextScreen();
//   //   }
//   // };

//   const proceedToNextScreen = async () => {
//     const selectedCarData = carsData?.find(
//       dat => dat.numberPlate === selectedCar,
//     );
//     await dispatch(
//       setCurentOrderProductData({
//         curentOrderProductData: {
//           ...curentOrderProductData,
//           selectedCar: selectedCarData,
//           fuelType: fuelType,
//         },
//       }),
//     );
//     if (orderProcessName === 'oilFilter') {
//       console.log(`1111111111111`, fuelType);
//       setloadingModal(true);

//       // const BatteryCompanies = await getDataWholeCollection('BatteryCompanies');
//       // dispatch(setBatteryCompaniesData({ batteryCompaniesData: BatteryCompanies }));

//       // const OilCompanies = await getDataWholeCollection('OilCompanies');
//       // dispatch(setOilCompaniesData({ oilCompaniesData: OilCompanies }));

//       let engineOilDataDb;
//       if (fuelType === 'Petrol') {
//         engineOilDataDb = await getDataWholeCollection('engineOilPetrol');
//         dispatch(setEngineOilPetrolData({ engineOilPetrolData: engineOilDataDb }));
//       } else {
//         engineOilDataDb = await getDataWholeCollection('engineOil');
//         dispatch(setEngineOilData({ engineOilData: engineOilDataDb }));
//       }
//       setloadingModal(false);
//       navigation.navigate('EngineOilDescScreen', { fuelType });
//       setselectedCar('');
//     }
//      else if (orderProcessName === 'tyre') {
//       setloadingModal(true);
//       const Tyres = await getDataWholeCollection('Tyres');
//       dispatch(setTireData({tireData: Tyres}));
//       console.log(Tyres,"rrrrrrrrr");
//       setloadingModal(false);
//       navigation.navigate('TyreDescScreen');
//       setselectedCar('');
//     } else if (orderProcessName === 'support') {
//       navigation.navigate('SupportServicesScreen');
//       setselectedCar('');
//     } else if (orderProcessName === 'battery') {
//       setloadingModal(true);
//       const btteries = await getDataWholeCollection('btteries');
//       dispatch(setBatteryData({batteryData: btteries}));
//       setloadingModal(false);
//       navigation.navigate('BatteryTypeScreen');
//       setselectedCar('');
//     } else {
//     }
//   };

//   const handleConfirmFuelType = () => {
//     if (!fuelType) {
//       setError(textStrings.selectFuelTypeError);
//       return;
//     }
//     setError('');
//     Alert.alert(
//       'Confirm Fuel Type',
//       `${textStrings.confirmFuelTypeMessage} ${fuelType}. ${textStrings.proceedWithOrder}`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             setIsModalVisible(false);
//             proceedToNextScreen();
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <View style={styles.fillscreenbg}>
//       <CurvedHeaderComp
//         name={textStrings.carsTxt}
//         iconName1={'left'}
//         iconName2={''}
//         firstbtnFun={() => navigation.pop()}
//         secbtnFun={() => console.log('next')}
//         reddot={true}
//       />
//       <View style={styles.otherContent}>
//         <FlatList
//           data={carsData}
//           ItemSeparatorComponent={() => <View style={{height: h('1%')}} />}
//           renderItem={({item, index}) => (
//             <TouchableOpacity
//               onPress={() => {
//                 setselectedCar(item.numberPlate);
//               }}
//               key={index}
//               style={{
//                 ...styles.cardContainerMain,
//                 borderWidth: selectedCar === item.numberPlate ? 2 : 0.7,
//                 borderColor:
//                   selectedCar === item.numberPlate ? greencolor : '#BFD0E5',
//               }}>
//               <View style={styles.cardimgContainer}>
//                 <Icon3 name="car-alt" color={maincolor} size={h('5%')} />
//               </View>
//               <View style={styles.cardtxtContainer}>
//                 <Text style={TextStyles.confirmcardatatitletxtcard}>
//                   {item.carName}
//                 </Text>
//                 <Text style={TextStyles.confirmcardatadesctxtcard}>
//                   {textStrings.carCategoryTxt} :
//                   <Text style={{color: 'black'}}>{item.category}</Text>
//                 </Text>
//                 <Text style={TextStyles.confirmcardatadesctxtcard}>
//                   {textStrings.carPlateTxt} :
//                   <Text style={{color: 'black'}}>{item.numberPlate}</Text>
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={
//             <View
//               style={{
//                 width: '100%',
//                 height: h('75%'),
//               }}>
//               <View
//                 style={{
//                   width: '100%',
//                   height: h('40%'),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexDirection: 'column',
//                 }}>
//                 <Image
//                   style={{
//                     width: w('50%'),
//                     height: h('20%'),
//                     resizeMode: 'contain',
//                   }}
//                   source={require('../assets/addcars.png')}
//                 />
//               </View>
//               <AppBtn
//                 title={textStrings.addACar}

//                 clickfun={clickFun }
//               />
//             </View>
//           }
//         />
//       </View>
//       {carsData.length > 0 && selectedCar.length > 0 ? (
//         <AppBtn
//           height={h('7%')}
//           title={textStrings.nextTxt}
//           clickfun={forButonsFunct}
//         />
//       ) : null}
//       {carsData.length > 0 ? (
//         <View style={{marginBottom: 30}}>
//           <AppBtn
//             title={textStrings.addACar}
//             clickfun={clickFun}
//           />
//         </View>
//       ) : null}
//       <LoadingModal visibleModal={loadingModal} />
//       <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>{textStrings.fuelTypeTxt}</Text>
//           <RadioButton.Group
//             onValueChange={(value) => setFuelType(value)}
//             value={fuelType}
//           >
//             <RadioButton.Item label={textStrings.petrol} value="Petrol" />
//             <RadioButton.Item label={textStrings.diesel} value="Diesel" />
//           </RadioButton.Group>
//           {error ? <Text style={styles.errorText}>{error}</Text> : null}
//           <View style={styles.modalButtons}>
//             <AppBtn
//               title={textStrings.back}
//               clickfun={() => setIsModalVisible(false)}
//               customStyles={styles.closeButton}
//               customTextStyle={styles.buttonText}
//             />
//             <AppBtn
//               title={textStrings.nextTxt}
//               clickfun={handleConfirmFuelType}
//               customStyles={styles.confirmButton}
//               customTextStyle={styles.buttonText}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ConfirmCardataScreen;

// const styles = StyleSheet.create({
//   fillscreenbg: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   otherContent: {
//     flex: 1,
//     marginTop: 5,
//   },
//   mainbtndivsel: {
//     width: '90%',
//     alignSelf: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   mainbtndiviconcont: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     backgroundColor: greencolor,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainbtndivmaincont: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardContainerMain: {
//     width: '93%',
//     height: 100,
//     alignSelf: 'center',
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 10,
//     elevation: 1,
//     borderWidth: 0.7,
//     borderColor: '#BFD0E5',
//     marginBottom: 10,
//   },
//   cardimgContainer: {
//     width: '20%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardtxtContainer: {
//     width: '80%',
//     justifyContent: 'center',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '50%',
//     justifyContent: 'center',
//   },
//   confirmButton: {
//     flex: 1,
//     marginRight: 10,
//   },
//   closeButton: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   buttonText: {
//     color: 'white',
//   },
//   errorText: {
//     color: 'red',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {greencolor, maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useSelector, useDispatch} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import {
  setBatteryCompaniesData,
  setBatteryData,
  setClientCarsData,
  setEngineOilData,
  setEngineOilPetrolData,
  setFiltersDta,
  setOilCompaniesData,
  setOilsData,
  setTireCompaniesData,
  setTireData,
} from '../store/projectSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../Components/LoadingModal';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import {getDataWholeCollection, getMyCars} from '../DataBase/databaseFunction';

const ConfirmCardataScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {clientCarsData} = useSelector(state => state.project);
  const {orderProcessName, enableCardData, curentOrderProductData} =
    useSelector(state => state.orderProcess);
  const [selectedCar, setselectedCar] = useState('');
  const cardDtatNull = clientCarsData ? clientCarsData : [];
  const [loadingModal, setloadingModal] = useState(false);
  const carsData = cardDtatNull ? cardDtatNull : [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fuelType, setFuelType] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const getUserID = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedUserId) {
        console.log(`userID: ${storedUserId}`);
        return storedUserId;
      }
      return null;
    } catch (error) {
      console.log('User is not logged in');
    }
  };

  const clickFun = async () => {
    const userId = await getUserID();
    if (userId) {
      navigation.navigate('MyCarsAddScreen');
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    const getAllMyCars = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          const carsResult = await getMyCars(storedUserId);
          console.log(carsResult, `carsResult`);
          if (carsResult && carsResult.length > 0) {
            dispatch(setClientCarsData({clientCarsData: carsResult}));
          } else {
            dispatch(setClientCarsData({clientCarsData: []})); // If no cars, set empty array
          }
        }
      } catch (error) {
        console.log('Error fetching cars:', error);
      } finally {
        setloadingModal(false); // Ensure loading modal is closed after data fetch
      }
    };
    setloadingModal(true);
    getAllMyCars();
  }, [dispatch]);

  // const fetchAllCarsData = async () => {
  //   setloadingModal(true);
  //   try {
  //     const carsResult = await AsyncStorage.getItem('ac-zurex-client-CarsData');
  //     console.log(`cardata`,carsResult);

  //     if (carsResult) {
  //       dispatch(setClientCarsData({clientCarsData: JSON.parse(carsResult)}));
  //     }
  //   } catch (error) {
  //   } finally {
  //     setloadingModal(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllCarsData();
  // }, []);

  const forButonsFunct = async () => {
    const selectedCarData = carsData?.find(
      dat => dat.numberPlate === selectedCar,
    );

    console.log('Selected Car Details:', selectedCarData); // Log details of the selected car

    if (orderProcessName === 'oilFilter') {
      setIsModalVisible(true);
    } else {
      proceedToNextScreen();
    }
  };

  // const forButonsFunct = async () => {
  //   console.log("hhhhhhhhhhh");
  //   if (orderProcessName === 'oilFilter') {
  //     setIsModalVisible(true);
  //   } else {
  //     proceedToNextScreen();
  //   }
  // };

  const proceedToNextScreen = async () => {
    const selectedCarData = carsData?.find(
      dat => dat.numberPlate === selectedCar,
    );
    await dispatch(
      setCurentOrderProductData({
        curentOrderProductData: {
          ...curentOrderProductData,
          selectedCar: selectedCarData,
          fuelType: fuelType,
        },
      }),
    );
    if (orderProcessName === 'oilFilter') {
      console.log(`1111111111111`, fuelType);
      setloadingModal(true);

      // const BatteryCompanies = await getDataWholeCollection('BatteryCompanies');
      // dispatch(setBatteryCompaniesData({ batteryCompaniesData: BatteryCompanies }));

      // const OilCompanies = await getDataWholeCollection('OilCompanies');
      // dispatch(setOilCompaniesData({ oilCompaniesData: OilCompanies }));

      let engineOilDataDb;
      if (fuelType === 'Petrol') {
        engineOilDataDb = await getDataWholeCollection('engineOilPetrol');
        dispatch(
          setEngineOilPetrolData({engineOilPetrolData: engineOilDataDb}),
        );
      } else {
        engineOilDataDb = await getDataWholeCollection('engineOil');
        dispatch(setEngineOilData({engineOilData: engineOilDataDb}));
      }
      setloadingModal(false);
      navigation.navigate('EngineOilDescScreen', {fuelType});
      setselectedCar('');
    } else if (orderProcessName === 'tyre') {
      setloadingModal(true);
      const Tyres = await getDataWholeCollection('Tyres');
      dispatch(setTireData({tireData: Tyres}));
      console.log(Tyres, 'rrrrrrrrr');
      setloadingModal(false);
      navigation.navigate('TyreDescScreen');
      setselectedCar('');
    } else if (orderProcessName === 'support') {
      navigation.navigate('SupportServicesScreen');
      setselectedCar('');
    } else if (orderProcessName === 'battery') {
      setloadingModal(true);
      const btteries = await getDataWholeCollection('btteries');
      dispatch(setBatteryData({batteryData: btteries}));
      setloadingModal(false);
      navigation.navigate('BatteryTypeScreen');
      setselectedCar('');
    } else {
    }
  };

  const handleConfirmFuelType = () => {
    if (!fuelType) {
      setError(textStrings.selectFuelTypeError);
      return;
    }
    setError('');
    Alert.alert(
      'Confirm Fuel Type',
      `${textStrings.confirmFuelTypeMessage} ${fuelType}. ${textStrings.proceedWithOrder}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setIsModalVisible(false);
            proceedToNextScreen();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.carsTxt}
        iconName1={'left'}
        iconName2={''}
        firstbtnFun={() => navigation.pop()}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <FlatList
          data={carsData}
          ItemSeparatorComponent={() => <View style={{height: h('1%')}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setselectedCar(item.numberPlate);
              }}
              key={index}
              style={{
                ...styles.cardContainerMain,
                borderWidth: selectedCar === item.numberPlate ? 2 : 0.7,
                borderColor:
                  selectedCar === item.numberPlate ? greencolor : '#BFD0E5',
              }}>
              <View style={styles.cardimgContainer}>
                <Icon3 name="car-alt" color={maincolor} size={h('5%')} />
              </View>
              <View style={styles.cardtxtContainer}>
                <Text style={TextStyles.confirmcardatatitletxtcard}>
                  {item.carName}
                </Text>
                <Text style={TextStyles.confirmcardatadesctxtcard}>
                  {textStrings.carCategoryTxt} :
                  <Text style={{color: 'black'}}>{item.category}</Text>
                </Text>
                <Text style={TextStyles.confirmcardatadesctxtcard}>
                  {textStrings.carPlateTxt} :
                  <Text style={{color: 'black'}}>{item.numberPlate}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View
              style={{
                width: '100%',
                height: h('75%'),
              }}>
              <View
                style={{
                  width: '100%',
                  height: h('40%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                <Image
                  style={{
                    width: w('50%'),
                    height: h('20%'),
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/addcars.png')}
                />
              </View>
              <AppBtn title={textStrings.addACar} clickfun={clickFun} />
            </View>
          }
        />
      </View>
      {carsData.length > 0 && selectedCar.length > 0 ? (
        <AppBtn
          height={h('7%')}
          title={textStrings.nextTxt}
          clickfun={forButonsFunct}
        />
      ) : null}
      {carsData.length > 0 ? (
        <View style={{marginBottom: 30}}>
          <AppBtn title={textStrings.addACar} clickfun={clickFun} />
        </View>
      ) : null}
      <LoadingModal visibleModal={loadingModal} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{textStrings.fuelTypeTxt}</Text>
          <RadioButton.Group
            onValueChange={value => setFuelType(value)}
            value={fuelType}>
            <RadioButton.Item label={textStrings.petrol} value="Petrol" />
            <RadioButton.Item label={textStrings.diesel} value="Diesel" />
          </RadioButton.Group>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.modalButtons}>
            <AppBtn
              title={textStrings.back}
              clickfun={() => setIsModalVisible(false)}
              customStyles={styles.closeButton}
              customTextStyle={styles.buttonText}
            />
            <AppBtn
              title={textStrings.nextTxt}
              clickfun={handleConfirmFuelType}
              customStyles={styles.confirmButton}
              customTextStyle={styles.buttonText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmCardataScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    flex: 1,
    backgroundColor: 'white',
  },
  otherContent: {
    flex: 1,
    marginTop: 5,
  },
  mainbtndivsel: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  mainbtndiviconcont: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: greencolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainbtndivmaincont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerMain: {
    width: '93%',
    height: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    elevation: 1,
    borderWidth: 0.7,
    borderColor: '#BFD0E5',
    marginBottom: 10,
  },
  cardimgContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardtxtContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    // justifyContent: 'center',
  },
  confirmButton: {
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
});
