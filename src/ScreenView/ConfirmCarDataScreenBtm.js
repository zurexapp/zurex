// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Alert,
//   Platform,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { w, h } from 'react-native-responsiveness';
// import { greencolor, maincolor, redcolor, textcolor } from '../assets/Colors';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AppBtn from '../Components/AppBtn';
// import TextStyles from '../Text/TextStyles';
// import { useTranslation } from '../Text/TextStrings';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCurentOrderProductData } from '../store/orderProcessSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon3 from 'react-native-vector-icons/FontAwesome5';
// import { setClientCarsData } from '../store/projectSlice';
// import LoadingModal from '../Components/LoadingModal';
// import { getMyCars, removeData } from '../DataBase/databaseFunction';
// import { TABLE_CLIENT_CARS } from './CommonUtils';

// const ConfirmCarDataScreenBtm = ({ navigation }) => {
//   const { textStrings } = useTranslation();
//   const dispatch = useDispatch();
//   const [isLoading, setisLoading] = useState(true);
//   const { clientCarsData } = useSelector(state => state.project);

//   useEffect(()=>{
//     getAllMyCars();
//   },[])

//   const getAllMyCars = async () => {
//     setisLoading(true);
//     const storedUserId = await AsyncStorage.getItem('userId');
//     const carsResult = await getMyCars(storedUserId);

//     if (carsResult) {
//       dispatch(setClientCarsData({clientCarsData: carsResult}));
//     }
//     setisLoading(false);
//   };

//   const removeCarById = async carId => {
//     setisLoading(true);
//     await removeData(TABLE_CLIENT_CARS, carId).then(async () => {
//       const clientCarsDataNew = clientCarsData?.filter(
//         (dat, index) => dat.id !== carId,
//       );
//       dispatch(setClientCarsData({ clientCarsData: clientCarsDataNew }));
//     });
//     setisLoading(false);
//     Alert.alert(textStrings.successFullTxt, textStrings.carDataUpdatedDone);
//   };

//   return (
//     <View style={styles.fillscreenbg}>
//       <LoadingModal visibleModal={isLoading} />
//       <CurvedHeaderComp name={textStrings.carsTxt} />
//       <View style={styles.otherContent}>
//         <FlatList
//           data={clientCarsData ? clientCarsData : []}
//           ItemSeparatorComponent={() => <View style={{ height: h('1%') }} />}
//           renderItem={({ item, index }) => (
//             <View
//               key={index}
//               style={{
//                 ...styles.cardContainerMain,
//                 borderColor: '#BFD0E5',
//               }}>
//               <View style={styles.cardimgContainer}>
//                 <Icon3 name="car-alt" color={maincolor} size={h('5%')} />
//               </View>
//               <View style={styles.cardtxtContainer}>
//                 <Text style={TextStyles.confirmcardatatitletxtcard}>
//                   {item.carName}
//                 </Text>
//                 <View style={styles.rowContainerView}>
//                   <View style={styles.carTxtContaierView}>
//                     <Text style={TextStyles.confirmcardatadesctxtcard}>
//                       {textStrings.carCategoryTxt} :
//                       <Text style={{ color: 'black' }}>{item.category}</Text>
//                     </Text>
//                     <Text style={TextStyles.confirmcardatadesctxtcard}>
//                       {textStrings.carPlateTxt} :
//                       <Text style={{ color: 'black' }}>{item.numberPlate}</Text>
//                     </Text>
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => removeCarById(item.id)}
//                     style={styles.deleteCarBtn}>
//                     <Icon3 name="trash" color={redcolor} size={h('3.5%')} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
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
//                     width: w('70%'),
//                     height: h('20%'),
//                     resizeMode: 'contain',
//                   }}
//                   source={require('../assets/addcars.png')}
//                 />
//               </View>
//               <AppBtn
//                 title={textStrings.addACar}
//                 clickfun={() => navigation.navigate('Login')}
//               />
//             </View>
//           }
//           ListFooterComponent={<View style={{ marginTop: h('5%') }} />}
//         />
//       </View>
//       {clientCarsData?.length > 0 ? (
//         <TouchableOpacity
//           onPress={() => navigation.navigate('MyCarsAddScreen')}
//           style={{
//             width: '75%',
//             height: h('7.5'),
//             backgroundColor: maincolor,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-evenly',
//             flexDirection: 'column',
//             marginBottom: Platform.OS === 'android' ? h('13%') : h('25%'),
//             marginTop: h('1%'),
//             alignSelf: 'center',
//           }}>
//           <Text style={TextStyles.appbtntxt}>{textStrings.addACar}</Text>
//         </TouchableOpacity>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   deleteCarBtn: {
//     position: 'absolute',
//     top: '50%', // Position the delete icon vertically centered in the card container
//     right: 10,
//     transform: [{ translateY: -17 }], // Adjust vertically to center the icon
//   },
//   carTxtContaierView: {
//     height: '100%',
//     flex: 1,
//     display: 'flex', // Corrected from 'absolute'
//     alignItems: 'flex-start',
//     marginLeft: 10,
//     marginRight: 10,
//     justifyContent: 'flex-start',
//     flexDirection: 'column',
//   },
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   otherContent: {
//     width: '100%',
//     flex: 1,
//     paddingHorizontal: w('5%'),
//   },
//   mainbtndivsel: {
//     width: w('90%'),
//     alignSelf: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     marginTop: h('3%'),
//   },
//   mainbtndiviconcont: {
//     height: h('4.2%'),
//     width: h('4.2%'),
//     borderRadius: h('7%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rowContainerView: {
//     width: '100%',
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   cardContainerMain: {
//     width: '100%',
//     height: h('14%'),
//     paddingVertical: h('1%'),
//     backgroundColor: '#FBFBFB',
//     alignSelf: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//     borderWidth: 0.5,
//     borderColor: '#BFD0E5',
//     borderRadius: 5,
//     position: 'relative',
//     paddingHorizontal: w('5%'),
//   },
//   cardimgContainer: {
//     width: w('10%'),
//     height: '100%', // Ensure the car icon container takes full height
//     display: 'flex',
//     marginLeft: 10,
//     marginRight: 10, // Corrected to 'marginRight' from 'marginright'
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   cardtxtContainer: {
//     flex: 1,
//     width: '80%', // Allow the text container to grow vertically
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     flexDirection: 'column',
//     paddingRight: 30, // Adjust for delete icon width
//   },
// });

// export default ConfirmCarDataScreenBtm;

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {greencolor, maincolor, redcolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useSelector, useDispatch} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {setClientCarsData} from '../store/projectSlice';
import LoadingModal from '../Components/LoadingModal';
import {getMyCars, removeData} from '../DataBase/databaseFunction';
import {TABLE_CLIENT_CARS} from './CommonUtils';

const ConfirmCarDataScreenBtm = ({navigation}) => {
  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const [storedUserId, setStoredUserId] = useState(null);
  const {clientCarsData} = useSelector(state => state.project);

  useEffect(() => {
    const getAllMyCars = async () => {
      setisLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      setStoredUserId(userId); // Store the userId for further checks

      if (userId) {
        const carsResult = await getMyCars(userId);
        if (carsResult) {
          dispatch(setClientCarsData({clientCarsData: carsResult}));
        }
      }
      setisLoading(false);
    };
    setisLoading(true);
    getAllMyCars();
    setisLoading(false);
  }, [dispatch]);

  const removeCarById = async carId => {
    setisLoading(true);
    await removeData(TABLE_CLIENT_CARS, carId).then(async () => {
      const clientCarsDataNew = clientCarsData?.filter(
        (dat, index) => dat.id !== carId,
      );
      dispatch(setClientCarsData({clientCarsData: clientCarsDataNew}));
    });
    setisLoading(false);
    Alert.alert(textStrings.successFullTxt, textStrings.carDataUpdatedDone);
  };

  return (
    <View style={styles.fillscreenbg}>
      <LoadingModal visibleModal={isLoading} />
      <CurvedHeaderComp name={textStrings.carsTxt} />
      <View style={styles.otherContent}>
        <FlatList
          data={clientCarsData ? clientCarsData : []}
          ItemSeparatorComponent={() => <View style={{height: h('1%')}} />}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                ...styles.cardContainerMain,
                borderColor: '#BFD0E5',
              }}>
              <View style={styles.cardimgContainer}>
                <Icon3 name="car-alt" color={maincolor} size={h('5%')} />
              </View>
              <View style={styles.cardtxtContainer}>
                <Text style={TextStyles.confirmcardatatitletxtcard}>
                  {item.carName}
                </Text>
                <View style={styles.rowContainerView}>
                  <View style={styles.carTxtContaierView}>
                    <Text style={TextStyles.confirmcardatadesctxtcard}>
                      {textStrings.carCategoryTxt} :
                      <Text style={{color: 'black'}}>{item.category}</Text>
                    </Text>
                    <Text style={TextStyles.confirmcardatadesctxtcard}>
                      {textStrings.carPlateTxt} :
                      <Text style={{color: 'black'}}>{item.numberPlate}</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeCarById(item.id)}
                    style={styles.deleteCarBtn}>
                    <Icon3 name="trash" color={redcolor} size={h('3.5%')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                width: '100%',
                height: h('75%'),
                alignItems: 'center',
                justifyContent: 'center',
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
                    width: w('70%'),
                    height: h('20%'),
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/addcars.png')}
                />
              </View>
              <Text style={TextStyles.confirmcardatadesctxtcard}>
                {storedUserId === null
                  ? textStrings.loginRequired
                  : textStrings.noCarsAvailable}
              </Text>
              <AppBtn
                title={textStrings.addACar}
                clickfun={() =>
                  navigation.navigate(
                    storedUserId === null ? 'Login' : 'MyCarsAddScreen',
                  )
                }
              />
            </View>
          }
          ListFooterComponent={<View style={{marginTop: h('5%')}} />}
        />
      </View>
      {clientCarsData?.length > 0 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('MyCarsAddScreen')}
          style={{
            width: '75%',
            height: h('7.5'),
            backgroundColor: maincolor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            marginBottom: Platform.OS === 'android' ? h('13%') : h('25%'),
            marginTop: h('1%'),
            alignSelf: 'center',
          }}>
          <Text style={TextStyles.appbtntxt}>{textStrings.addACar}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteCarBtn: {
    position: 'absolute',
    top: '50%', // Position the delete icon vertically centered in the card container
    right: 10,
    transform: [{translateY: -17}], // Adjust vertically to center the icon
  },
  carTxtContaierView: {
    height: '100%',
    flex: 1,
    display: 'flex', // Corrected from 'absolute'
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
    paddingHorizontal: w('5%'),
  },
  mainbtndivsel: {
    width: w('90%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: h('3%'),
  },
  mainbtndiviconcont: {
    height: h('4.2%'),
    width: h('4.2%'),
    borderRadius: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainerView: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardContainerMain: {
    width: '100%',
    height: h('14%'),
    paddingVertical: h('1%'),
    backgroundColor: '#FBFBFB',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    borderRadius: 5,
    position: 'relative',
    paddingHorizontal: w('5%'),
  },
  cardimgContainer: {
    width: w('10%'),
    height: '100%', // Ensure the car icon container takes full height
    display: 'flex',
    marginLeft: 10,
    marginRight: 10, // Corrected to 'marginRight' from 'marginright'
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardtxtContainer: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});

export default ConfirmCarDataScreenBtm;
