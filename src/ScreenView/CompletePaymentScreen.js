// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Modal,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useState, useRef, useEffect} from 'react';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import {w, h} from 'react-native-responsiveness';
// import AppBtn from '../Components/AppBtn';
// import {maincolor, textcolor, c0color, borderColor} from '../assets/Colors';
// import Icon from 'react-native-vector-icons/Ionicons';
// import CustomBtn from '../Components/CustomBtn';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import DateSelectorModelInput from '../Components/DateSelectorModelInput';
// import {scale} from 'react-native-size-matters';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import GetLocation from 'react-native-get-location';
// import {useDispatch, useSelector} from 'react-redux';
// import axios from 'axios';
// import LoadingModal from '../Components/LoadingModal';
// import {setCurentOrderProductData} from '../store/orderProcessSlice';
// import {
//   postDataWithRef,
//   getEmployDataWithJobrole,
//   getChildNodeCount,
//   UpdateOrderWithId,
//   getBookedTimeSlotsByDate,
//   getPaymentStatusByOrderId,
//   getMYOrders,
// } from '../DataBase/databaseFunction';
// // import TamaraPaymentModal from '../Components/TamaraPaymentModal';
// import TabbyPaymentModal from '../Components/TabbyPaymentModal';
// import {webengage} from '../webengage';
// import moment from 'moment';
// import ARPaymentModal from '../Components/ARPaymentModal';
// import {getCreatedDate} from './CommonUtils';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import analytics from '@react-native-firebase/analytics';

// const CompletePaymentScreen = ({navigation}) => {
//   const mapKey = 'AIzaSyDBwLNe1n4ITYmoqkgGip1-M8k7fpVZb6k';
//   const {textStrings} = useTranslation();
//   const {isAuth} = useSelector(state => state.auth);
//   const {curentOrderProductData, orderProcessName} = useSelector(
//     state => state.orderProcess,
//   );
//   const {
//     engineOilPetrolData,
//     engineOilData,
//     filtersData,
//     oilsData,
//     tireData,
//     batteryData,
//   } = useSelector(state => state.project);
//   const findTitle = (referance, id) => {
//     const data =
//       referance === 'Filters'
//         ? filtersData.find(dat => dat.id === id)
//         : referance === 'Oils'
//         ? oilsData.find(dat => dat.id === id)
//         : referance === 'Tyres'
//         ? tireData.find(dat => dat.id === id)
//         : referance === 'btteries'
//         ? batteryData.find(dat => dat.id === id)
//         : {};
//     return {
//       title: data?.productNameEng
//         ? data?.productNameEng
//         : textStrings.productHasBeenDeleted,
//       price: data?.originalPrice ? data?.originalPrice : 0,
//     };
//   };
//   const map = useRef(null);
//   const [stepNumber, setstepNumber] = useState(1);
//   const [openTabbyModal, setopenTabbyModal] = useState(false);
//   const [locationStaing, setlocationStaing] = useState('');
//   const [openMapModal, setopenMapModal] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [timeValue, setTimeValue] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [avalbleAppoints, setAvalbleAppoints] = useState(false);
//   const [cityName, setCityName] = useState('');
//   const [paymentMethodName, setpaymentMethodName] = useState('');
//   const [openTamaraModal, setOpenTamaraModal] = useState(false);
//   const [openAlRajhiPayment, setopenAlRajhiPayment] = useState(false);
//   const toggleTamaraModal = () => setOpenTamaraModal(!openTamaraModal);
//   const toggleTabbyModal = () => setopenTabbyModal(!openTabbyModal);
//   const toggleAlRajhiModal = () => setopenAlRajhiPayment(!openAlRajhiPayment);
//   const [booked_slots, setBookedSlots] = useState([]);
//   const [validate_payment, setValidatePayment] = useState();
//   const [userOrders, setUserOrders] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date()); // Track the selected date
//   const [availableSlots, setAvailableSlots] = useState([]);

//   const getUserDetails = async () => {
//     try {
//       const userPhoneNumber = await AsyncStorage.getItem('acZurexLoginUserId');
//       const userId = await AsyncStorage.getItem('userId');
//       if (userPhoneNumber !== null && userId !== null) {
//         let userOrders = null;
//         try {
//           userOrders = await getMYOrders(userId);
//         } catch (fetchError) {
//           console.error('Error fetching user orders:', fetchError);
//         }
//         return {userPhoneNumber, userId, userOrders};
//       } else {
//         console.log('User details not found');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error retrieving user details:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (booked_slots.length > 0) {
//       console.log('Booked slots updated', booked_slots);
//     }
//   }, [booked_slots]);

//   useEffect(() => {
//     getUserDetails();
//     async function getBookedSlots() {
//       const bookedSlots = await getBookedTimeSlotsByDate(
//         new Date(date).toDateString(),
//         orderProcessName,
//       );
//       console.log(`new Date : ${new Date(date).toDateString()}`);

//       setBookedSlots(bookedSlots);
//     }
//     getBookedSlots();
//   }, [date]);

//   const checkLocationPermission = async () => {
//     try {
//       const result = await check(
//         Platform.OS === 'ios'
//           ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//           : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       );

//       if (result === RESULTS.GRANTED) {
//         getCurentLcation();
//       } else {
//         requestLocationPermission();
//       }
//     } catch (err) {
//       console.error('Error checking location permission:', err);
//     }
//   };

//   const requestLocationPermission = async () => {
//     try {
//       const result = await request(
//         Platform.OS === 'ios'
//           ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//           : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       );

//       if (result === RESULTS.GRANTED) {
//         getCurentLcation();
//       } else {
//         Alert.alert(textStrings.locationPermissionDenied);
//       }
//     } catch (err) {
//       console.error('Error requesting location permission:', err);
//     }
//   };

//   useEffect(() => {
//     async function getPaymentStatus(validate_payment) {
//       const orderPaymentDetails = await getPaymentStatusByOrderId(
//         validate_payment,
//       );
//       // setBookedSlots(bookedSlots)
//       if (orderPaymentDetails === null || orderPaymentDetails.length === 0) {
//         await timeout(5000);
//         getPaymentStatus(validate_payment);
//       } else {
//         if (orderPaymentDetails[0].error) {
//           setValidatePayment(undefined);
//           Alert.alert(
//             textStrings.productTitleEror,
//             `Error occured with code ${orderPaymentDetails[0].errorText}`,
//           );
//         } else {
//           lastStepFun(textStrings.installTxt + ' Al-rajhi', validate_payment);
//           // toggleAlRajhiModal();
//         }
//       }
//     }
//     if (validate_payment) {
//       getPaymentStatus(validate_payment);
//     }
//   }, [validate_payment]);

//   function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
//   }

//   const timeArrayBattries = [
//     {id: 0, time: '10:30 AM - 11:30 AM', max_bookings: 1},
//     {id: 1, time: '11:30 AM - 12:30 PM', max_bookings: 1},
//     {id: 2, time: '12:30 PM - 01:30 PM', max_bookings: 1},
//     {id: 3, time: '01:30 PM - 02:30 PM', max_bookings: 1},
//     {id: 4, time: '02:30 PM - 03:30 PM', max_bookings: 1},
//     {id: 5, time: '03:30 PM - 04:30 PM', max_bookings: 1},
//     {id: 6, time: '04:30 PM - 05:30 PM', max_bookings: 1},
//     {id: 7, time: '05:30 PM - 06:30 PM', max_bookings: 1},
//     {id: 8, time: '06:30 PM - 07:30 PM', max_bookings: 1},
//     {id: 9, time: '07:30 PM - 08:30 PM', max_bookings: 1},
//     {id: 10, time: '08:30 PM - 09:30 PM', max_bookings: 1},
//     {id: 11, time: '09:30 PM - 10:30 PM', max_bookings: 1},
//   ];

//   const timeArrayTyres = [
//     {id: 0, time: '10:00 AM - 12:00 PM', max_bookings: 1},
//     {id: 1, time: '12:00 PM - 02:00 PM', max_bookings: 1},
//     {id: 2, time: '02:00 PM - 04:00 PM', max_bookings: 1},
//     {id: 3, time: '04:00 PM - 06:00 PM', max_bookings: 1},
//     {id: 4, time: '06:00 PM - 08:00 PM', max_bookings: 1},
//   ];

//   const timeArrayOils = [
//     {id: 0, time: '10:00 AM - 12:00 PM', max_bookings: 1},
//     {id: 1, time: '12:00 PM - 02:00 PM', max_bookings: 1},
//     {id: 2, time: '02:00 PM - 04:00 PM', max_bookings: 1},
//     {id: 3, time: '04:00 PM - 06:00 PM', max_bookings: 1},
//     {id: 4, time: '06:00 PM - 08:00 PM', max_bookings: 1},
//   ];

//   const timeSlots =
//     orderProcessName === 'battery'
//       ? timeArrayBattries
//       : orderProcessName === 'tyre'
//       ? timeArrayTyres
//       : timeArrayOils;

//   const isPastTimeSlot = time => {
//     const selectedDate = new Date(date);
//     selectedDate.setHours(0, 0, 0, 0);

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedDate > today) {
//       return false;
//     }

//     if (selectedDate < today) {
//       return true;
//     }

//     const [hours, minutesPart] = time.split(' ');
//     const [hour, minute] = hours.split(':');
//     const isPM = minutesPart.toLowerCase() === 'pm';
//     const slotTime = new Date();
//     slotTime.setHours(
//       isPM && hour !== '12' ? parseInt(hour) + 12 : parseInt(hour),
//       parseInt(minute),
//       0,
//       0,
//     );

//     return slotTime < currentTime;
//   };

//   const [loadingModal, setloadingModal] = useState(false);
//   const [originCoods, setoriginCoods] = useState({
//     latitude: 24.7237501,
//     longitude: 46.1630812,
//   });

//   const [selectePlace, setSelectedPlace] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   const getAddressFromCoordinates = async (latitude, longitude) => {
//     try {
//       const result = await axios
//         .get(
//           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapKey}`,
//           {responseType: 'json'},
//         )
//         .then(dat => {
//           var stateName = dat?.data?.results[0].address_components.filter(
//             x =>
//               x.types.filter(t => t == 'administrative_area_level_1').length >
//               0,
//           )[0].short_name;
//           return {
//             address: dat?.data?.results[0]?.formatted_address,
//             cityName: stateName,
//           };
//         });
//       return result;
//     } catch (error) {}
//   };
//   const getCurentLcation = async () => {
//     setloadingModal(true);
//     await GetLocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 15000,
//     })
//       .then(async location => {
//         setoriginCoods({
//           latitude: location.latitude,
//           longitude: location.longitude,
//         });
//         setSelectedPlace({
//           latitude: location.latitude,
//           longitude: location.longitude,
//         });
//         setloadingModal(false);
//       })
//       .catch(error => {
//         setloadingModal(false);
//       });
//   };
//   // const YourCurentLocatFun = async () => {
//   //   if (selectePlace.latitude === 0 || selectePlace.longitude === 0) {
//   //     checkLocationPermission()
//   //     return
//   //   }
//   //   setloadingModal(true);
//   //   const getPlaceName = await getAddressFromCoordinates(
//   //     selectePlace.latitude,
//   //     selectePlace.longitude,
//   //   );
//   //   setlocationStaing(getPlaceName?.address);
//   //   setCityName(getPlaceName?.cityName);
//   //   setloadingModal(false);
//   // };
//   // const getOtherDta = async (latitude, longitude) => {
//   //   const getPlaceName = await getAddressFromCoordinates(latitude, longitude);
//   //   setlocationStaing(getPlaceName?.address);
//   //   setCityName(getPlaceName?.cityName);
//   // };

//   const YourCurentLocatFun = async () => {
//     if (selectePlace.latitude === 0 || selectePlace.longitude === 0) {
//       checkLocationPermission();
//       return;
//     }
//     setloadingModal(true);

//     const getPlaceName = await getAddressFromCoordinates(
//       selectePlace.latitude,
//       selectePlace.longitude,
//     );

//     const address = getPlaceName?.address;
//     const cityName = getPlaceName?.cityName;
//     setlocationStaing(address);
//     setCityName(cityName);
//     try {
//       await AsyncStorage.setItem('Orderaddress', address);
//       await AsyncStorage.setItem('OrdercityName', cityName);
//     } catch (error) {
//       console.error('Error saving city name to AsyncStorage:', error);
//     }

//     setloadingModal(false);
//   };

//   const getOtherDta = async (latitude, longitude) => {
//     const getPlaceName = await getAddressFromCoordinates(latitude, longitude);

//     const address = getPlaceName?.address;
//     const cityName = getPlaceName?.cityName;

//     setlocationStaing(address);
//     setCityName(cityName);
//     console.log(`##3#####`, locationStaing);

//     console.log(`cityName :${cityName}`);
//     // Save cityName to AsyncStorage
//     try {
//       await AsyncStorage.setItem('Orderaddress', address);
//       await AsyncStorage.setItem('cityName', cityName);
//     } catch (error) {
//       console.error('Error saving city name to AsyncStorage:', error);
//     }
//   };

//   useEffect(() => {
//     getCurentLcation();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Update current time every minute

//     return () => clearInterval(timer);
//   }, []);
//   const dispatch = useDispatch();

//   const sendNotification = async (registrationToken, title, body) => {
//     // Ensure registrationToken is an array
//     const tokens = Array.isArray(registrationToken)
//       ? registrationToken
//       : [registrationToken];

//     for (const token of tokens) {
//       try {
//         // Send the notification data to the backend for each token
//         const response = await axios.post(
//           'https://app-xaop4bxqda-uc.a.run.app/sendNotification',
//           {
//             token, // Send as `token`, matching backend's expectations
//             title,
//             body,
//           },
//         );
//         console.log(`Notification sent successfully to token: ${token}`);
//       } catch (error) {
//         console.error(
//           `Error sending notification to token: ${token}`,
//           error.message,
//         );
//       }
//     }
//   };

//   const lastStepFun = async (payMethod = '', orderId) => {
//     setOpenTamaraModal(false);
//     const storedUserId = await AsyncStorage.getItem('userId');
//     const userDetails = await getUserDetails();

//     if (!userDetails) {
//       console.error('User details could not be retrieved');
//       setloadingModal(false);
//       return;
//     }

//     const {userPhoneNumber, userId, userOrders} = userDetails;

//     if (orderProcessName === 'support') {
//       setloadingModal(true);
//       await dispatch(
//         setCurentOrderProductData({
//           curentOrderProductData: {
//             ...curentOrderProductData,
//             deliveryInfo: {
//               locationCoordinates: selectePlace,
//               locationName: locationStaing,
//               cityName: cityName,
//             },
//             orderProcessName: orderProcessName,
//             appointment: {
//               date: new Date(date).toDateString(),
//               time: timeValue,
//             },
//             OrderedByUserId: isAuth?.userId,
//             orderStatus: 'pending',
//             paymentMethodName: payMethod ? payMethod : '',
//           },
//         }),
//       );
//       const userId = await AsyncStorage.getItem('userId');
//       if (!orderId) {
//         let orderCount = await getChildNodeCount('supportOrders');
//         console.log(`orderId: ${orderCount}`);

//         orderCount++;
//         console.log(`orderId: ${orderCount}`);

//         orderId = `${orderCount
//           .toString()
//           .padStart(6, '0')}${getCreatedDate()}`;
//       }

//       await postDataWithRef('supportOrders', orderId, {
//         OrderedByUserId: userId,
//         ...curentOrderProductData,
//         deliveryInfo: {
//           locationCoordinates: selectePlace,
//           locationName: locationStaing,
//           cityName: cityName,
//         },
//         orderProcessName: orderProcessName,
//         appointment: {
//           date: new Date(date).toDateString(),
//           time: timeValue,
//         },
//         OrderedByUserId: isAuth?.userId,
//         orderStatus: 'pending',
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         paymentMethodName: payMethod ? payMethod : '',
//       })
//         .then(async () => {
//           if (payMethod) {
//             sendOrderEvent('Order created', payMethod);
//           }
//           //todo  check update freeServicesCount after service complete not while order creation
//           UpdateOrderWithId(curentOrderProductData.orderId, {
//             // setting to 1 if total price is more than 0 as 1 service is booked from 2 free services after payment
//             freeServicesCount:
//               curentOrderProductData.totalPrice > 0
//                 ? 1
//                 : curentOrderProductData.freeServicesCount - 1,
//           });

//           await analytics().logEvent('Support_Order', {
//             phoneNumber: userPhoneNumber,
//             orderId: orderId,
//           });
//           navigation.navigate('OrderCompletedScreen', {orderId});
//         })
//         .catch(e => console.log('error', e));

//       setloadingModal(false);
//       setValidatePayment(undefined);
//     } else {
//       const product = curentOrderProductData.products[0];
//       const reference = product.referance;
//       const productId = product.id;

//       const referenceToDataMap = {
//         btteries: batteryData,
//         engineOil: engineOilData,
//         engineOilPetrol: engineOilPetrolData,
//         Tyres: tireData,
//       };
//       const data = referenceToDataMap[reference];
//       const productData = data.find(item => item.id === productId);
//       const productName = productData
//         ? productData.productNameEng
//         : 'Unknown Product';

//       if (!data) {
//         console.error(`Reference '${reference}' not found in map`);
//         setloadingModal(false);
//         return;
//       }
//       setloadingModal(true);
//       await dispatch(
//         setCurentOrderProductData({
//           curentOrderProductData: {
//             ...curentOrderProductData,
//             deliveryInfo: {
//               locationCoordinates: selectePlace,
//               locationName: locationStaing,
//               cityName: cityName,
//             },
//             orderProcessName: orderProcessName,
//             appointment: {
//               date: new Date(date).toDateString(),
//               time: timeValue,
//             },
//             OrderedByUserId: isAuth?.userId,
//             orderStatus: 'pending',
//             paymentMethodName: payMethod ? payMethod : '',
//           },
//         }),
//       );
//       if (!orderId) {
//         let orderCount = await getChildNodeCount('orders');
//         console.log(`orderId: ${orderCount}`);

//         orderCount++;
//         console.log(`orderId: ${orderCount}`);
//         orderId = `${orderCount
//           .toString()
//           .padStart(6, '0')}${getCreatedDate()}`;
//       }

//       console.log(`111111111111111111`, curentOrderProductData.totalPrice);

//       const userId = await AsyncStorage.getItem('userId');
//       await postDataWithRef('orders', orderId, {
//         ...curentOrderProductData,
//         deliveryInfo: {
//           locationCoordinates: selectePlace,
//           locationName: locationStaing,
//           cityName: cityName,
//         },
//         orderProcessName: orderProcessName,
//         appointment: {
//           date: new Date(date).toDateString(),
//           time: timeValue,
//         },
//         OrderedByUserId: userId,
//         orderStatus: 'pending',
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         paymentMethodName: payMethod ? payMethod : '',
//         paymentStatus: 'pending',
//         paymentId: 'paymentId',
//       })
//         .then(async () => {
//           if (payMethod) {
//             sendOrderEvent('Order created', payMethod);
//           }
//           const notificationData = {
//             title: 'Order Placed',
//             body: `Order with ID ${orderId} has been successfully created.`,
//           };
//           const employData = await getEmployDataWithJobrole('supervisor');
//           const employDeviceTokens = [];
//           for (const key in employData) {
//             if (employData[key].deviceToken) {
//               employDeviceTokens.push(...employData[key].deviceToken);
//             }
//           }

//           await sendNotification(
//             employDeviceTokens,
//             notificationData.title,
//             notificationData.body,
//           );

//           const eventType =
//             userOrders.length > 0 ? 'app_orders_placed' : 'app_first_purchase';
//           console.log(`111111`, curentOrderProductData.productType);

//           await analytics().logEvent(eventType, {
//             phoneNumber: userPhoneNumber,
//             category: curentOrderProductData.productType,
//             purchased_product: productName,
//             orderValue: curentOrderProductData.totalPrice,
//             orderId: orderId,
//             purchased_category: curentOrderProductData.productType,
//           });
//           navigation.navigate('OrderCompletedScreen', {orderId});
//         })
//         .catch(e => console.log(e.error));

//       setloadingModal(false);
//       setValidatePayment(undefined);
//     }
//   };

//   const nextButnFuc = async () => {
//     if (stepNumber < 3) {
//       if (stepNumber === 2) {
//         if (timeValue !== '' && timeValue.length > 0) {
//           const dateTime =
//             moment(date).format('DD-MM-YYYY') + ' ' + timeValue.toUpperCase();
//           webengage.track('Checkout created', {
//             // 'abandoned checkout url': '',
//             'Product details': curentOrderProductData?.products
//               ? curentOrderProductData?.products
//               : curentOrderProductData?.service
//               ? curentOrderProductData?.service
//               : [],
//             'Number of Products': curentOrderProductData?.products
//               ? curentOrderProductData?.products?.length
//               : curentOrderProductData?.service
//               ? curentOrderProductData?.service?.length
//               : 0,
//             'product name': curentOrderProductData?.products
//               ? curentOrderProductData?.products
//                   ?.map((dat, index) => findTitle(dat.id, dat.referance)?.title)
//                   .join(', ')
//                   .toString()
//               : curentOrderProductData?.service
//               ? curentOrderProductData?.service[0]?.products
//                   ?.map((dat, index) => dat?.productNameEng)
//                   .join(', ')
//                   .toString()
//               : '',
//             Subtotal: curentOrderProductData?.orderPrice,
//             'Cart Total': curentOrderProductData?.orderPrice,
//             // 'payment method': '',
//             'billing address': locationStaing,
//             'Date & Time': dateTime,
//             'total price': curentOrderProductData?.totalPrice,
//             'total spent': curentOrderProductData?.orderPrice,

//             // 'total spent': '',
//           });
//           setstepNumber(stepNumber + 1);
//         } else {
//           Alert.alert(
//             textStrings.userInfoProcessEror,
//             textStrings.userInfoError,
//           );
//         }
//       } else {
//         if (stepNumber === 1) {
//           webengage.track('Checkout Started', {
//             'Product details': curentOrderProductData?.products
//               ? curentOrderProductData?.products
//               : curentOrderProductData?.service
//               ? curentOrderProductData?.service
//               : [],
//             'Number of Products': curentOrderProductData?.products
//               ? curentOrderProductData?.products?.length
//               : curentOrderProductData?.service
//               ? curentOrderProductData?.service?.length
//               : 0,
//             'product name': curentOrderProductData?.products
//               ? curentOrderProductData?.products
//                   ?.map((dat, index) => findTitle(dat.id, dat.referance)?.title)
//                   .join(', ')
//                   .toString()
//               : curentOrderProductData?.service
//               ? curentOrderProductData?.service[0]?.products
//                   ?.map((dat, index) => dat?.productNameEng)
//                   .join(', ')
//                   .toString()
//               : '',
//             // Subtotal: curentOrderProductData?.orderPrice,
//             'Cart Total': curentOrderProductData?.orderPrice,
//           });
//           setstepNumber(stepNumber + 1);
//         } else {
//           setstepNumber(stepNumber + 1);
//         }
//       }
//     } else if (stepNumber === 3) {
//       if (paymentMethodName !== '') {
//         if (paymentMethodName === 'cashOnDelivery') {
//           await lastStepFun(textStrings.cashPayTxt);
//         } else if (paymentMethodName === 'installments') {
//           toggleTamaraModal();
//         } else if (paymentMethodName === 'epay') {
//           Alert.alert(textStrings.productTitleEror, textStrings.inProgress);
//         }
//       } else {
//         Alert.alert(
//           textStrings.userInfoProcessEror,
//           textStrings.paymentMethodError,
//         );
//       }
//     }
//   };

//   const btnsRender = [
//     {
//       image: require('../assets/fist.png'),
//       clickfun: () => {
//         webengage.track('Payment Method Chosen', {
//           'payment method': textStrings.installTxt + ' Al-rajhi',
//         });
//         toggleAlRajhiModal();
//       },
//       title: textStrings.ePayTxt,
//       id: 0,
//     },
//     {
//       image: require('../assets/sect.png'),
//       clickfun: () => {
//         webengage.track('Payment Method Chosen', {
//           'payment method': textStrings.installTxt + ' Tabby',
//         });
//         // Alert.alert(textStrings.Appname, textStrings.ComingSoon);
//         toggleTabbyModal();
//       },
//       title: textStrings.installTxt,
//       id: 4,
//     },
//     {
//       image: require('../assets/tamara.png'),
//       clickfun: () => {
//         webengage.track('Payment Method Chosen', {
//           'payment method': textStrings.installTxt + ' Tamara',
//         });
//         Alert.alert(textStrings.Appname, textStrings.ComingSoon);
//       },
//       title: textStrings.installTxt,
//       id: 1,
//     },
//     {
//       image: require('../assets/newthr.png'),
//       clickfun: () => {
//         webengage.track('Payment Method Chosen', {
//           'payment method': textStrings.cashPayTxt,
//         });
//         lastStepFun(textStrings.cashPayTxt);
//       },
//       title: textStrings.cashPayTxt,
//       id: 2,
//     },
//   ];

//   // const btnsRender = [
//   //   {
//   //     image: require('../assets/fist.png'),
//   //     clickfun: () => {
//   //       webengage.track('Payment Method Chosen', {
//   //         'payment method': textStrings.installTxt + ' Al-rajhi',
//   //       });
//   //       toggleAlRajhiModal();
//   //     },
//   //     title: textStrings.ePayTxt,
//   //     id: 0,
//   //   },
//   //   {
//   //     image: require('../assets/sect.png'),
//   //     clickfun: () => {
//   //       webengage.track('Payment Method Chosen', {
//   //         'payment method': textStrings.installTxt + ' Tabby',
//   //       });
//   //       toggleTabbyModal();
//   //     },
//   //     title: textStrings.installTxt,
//   //     id: 4,
//   //   },
//   //   {
//   //     image: require('../assets/tamara.png'),
//   //     clickfun: () => {
//   //       webengage.track('Payment Method Chosen', {
//   //         'payment method': textStrings.installTxt + ' Tamara',
//   //       });
//   //       //toggleTamaraModal();
//   //     },
//   //     title: textStrings.installTxt,
//   //     id: 1,
//   //   },
//   //   {
//   //     image: require('../assets/newthr.png'),
//   //     clickfun: () => {
//   //       webengage.track('Payment Method Chosen', {
//   //         'payment method': textStrings.cashPayTxt,
//   //       });
//   //       lastStepFun(textStrings.cashPayTxt);
//   //     },
//   //     title: textStrings.cashPayTxt,
//   //     id: 2,
//   //   },
//   // ];

//   const freeServiceButtonsRender = [
//     {
//       image: require('../assets/newthr.png'),
//       clickfun: () => {
//         webengage.track('Payment Method Chosen', {
//           'payment method': 'Free Service',
//         });
//         lastStepFun(textStrings.free_service);
//       },
//       title: textStrings.free_service,
//       id: 2,
//     },
//   ];

//   const sendOrderEvent = (name, payment) => {
//     if (name) {
//       const dateTime =
//         moment(date).format('DD-MM-YYYY') + ' ' + timeValue.toUpperCase();

//       webengage.track(name, {
//         // 'abandoned checkout url': '',
//         'Product details': curentOrderProductData?.products
//           ? curentOrderProductData?.products
//           : curentOrderProductData?.service
//           ? curentOrderProductData?.service
//           : [],
//         'Number of Products': curentOrderProductData?.products
//           ? curentOrderProductData?.products?.length
//           : curentOrderProductData?.service
//           ? curentOrderProductData?.service?.length
//           : 0,
//         'product name': curentOrderProductData?.products
//           ? curentOrderProductData?.products
//               ?.map((dat, index) => findTitle(dat.id, dat.referance)?.title)
//               .join(', ')
//               .toString()
//           : curentOrderProductData?.service
//           ? curentOrderProductData?.service[0]?.products
//               ?.map((dat, index) => dat?.productNameEng)
//               .join(', ')
//               .toString()
//           : '',
//         Subtotal: curentOrderProductData?.orderPrice,
//         'Cart Total': curentOrderProductData?.orderPrice,
//         'payment method': payment ? payment : textStrings.cashPayTxt,
//         'billing address': locationStaing,
//         'Date & Time': dateTime,
//         'total price': curentOrderProductData?.orderPrice,
//         'total spent': curentOrderProductData?.orderPrice,

//         // 'total spent': '',
//       });
//     }
//   };
//   return (
//     <>
//       <View style={styles.fillscreenbg}>
//         <CurvedHeaderComp
//           name={textStrings.completeOrder}
//           iconName1={'left'}
//           iconName2={''}
//           firstbtnFun={() => navigation.goBack()}
//           secbtnFun={() => console.log('next')}
//           reddot={true}
//         />
//         <View style={styles.otherContent}>
//           <View style={styles.stepsContainers}>
//             <View
//               style={{
//                 ...styles.stepContainer,
//                 borderColor: stepNumber >= 1 ? maincolor : c0color,
//               }}>
//               <Icon
//                 color={stepNumber >= 1 ? maincolor : c0color}
//                 name="location-sharp"
//                 size={h('3.5%')}
//               />
//             </View>
//             <Image
//               source={require('../assets/dashes.png')}
//               style={styles.dashedImage}
//             />
//             <View
//               style={{
//                 ...styles.stepContainer,
//                 borderColor: stepNumber >= 2 ? maincolor : c0color,
//               }}>
//               <Icon
//                 color={stepNumber >= 2 ? maincolor : c0color}
//                 name="time-outline"
//                 size={h('3.5%')}
//               />
//             </View>
//             <Image
//               source={require('../assets/dashes.png')}
//               style={styles.dashedImage}
//             />
//             <View
//               style={{
//                 ...styles.stepContainer,
//                 borderColor: stepNumber === 3 ? maincolor : c0color,
//               }}>
//               <Icon
//                 color={stepNumber === 3 ? maincolor : c0color}
//                 name="checkmark"
//                 size={h('3.5%')}
//               />
//             </View>
//           </View>
//           <View style={styles.textContainer}>
//             <Text
//               style={{
//                 ...TextStyles.completesteptxt,
//                 color: stepNumber >= 1 ? maincolor : c0color,
//                 fontSize: scale(16),
//                 marginTop: 0,
//                 width: '30%',
//               }}>
//               {textStrings.locationTxt}
//             </Text>
//             <Text
//               style={{
//                 ...TextStyles.completesteptxt,
//                 width: '38%',
//                 color: stepNumber >= 2 ? maincolor : c0color,
//                 fontSize: scale(16),
//                 marginTop: 0,
//               }}>
//               {textStrings.timeTxt}
//             </Text>
//             <Text
//               style={{
//                 ...TextStyles.completesteptxt,
//                 color: stepNumber === 3 ? maincolor : c0color,
//                 fontSize: scale(16),
//                 width: '31%',
//                 marginTop: 0,
//               }}>
//               {textStrings.confirmationTxt}
//             </Text>
//           </View>
//           <View style={styles.filldivCont}>
//             {stepNumber === 1 &&
//               locationStaing === '' &&
//               locationStaing?.length <= 0 && (
//                 <View style={{marginTop: h('3%')}}>
//                   <CustomBtn
//                     title={textStrings.curntLocationTxt}
//                     clickfun={YourCurentLocatFun}
//                   />
//                   <View style={{marginTop: h('1%')}} />
//                   <CustomBtn
//                     title={textStrings.selectLocationTxt}
//                     clickfun={() => {
//                       setopenMapModal(true);
//                     }}
//                   />
//                 </View>
//               )}
//             {stepNumber === 2 && (
//               <View style={styles.mainConatinerstep2}>
//                 <View style={styles.flatListHeaderDiv}>
//                   <View
//                     style={{
//                       width: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       position: 'relative',
//                     }}>
//                     <Text
//                       style={{
//                         ...TextStyles.Myorderbtntxt,
//                         color: maincolor,
//                         position: 'absolute',
//                         left: 0,
//                       }}>
//                       {textStrings.chooseDateTxt}
//                     </Text>
//                     <View style={{width: '60%', alignSelf: 'center'}}>
//                       <DateSelectorModelInput
//                         orderProcessName={orderProcessName}
//                         placeHolder={textStrings.chooseDateTxt}
//                         giveCallBack={text => setDate(text)}
//                       />
//                     </View>
//                   </View>

//                   {/* <TouchableOpacity
//                         onPress={() => setAvalbleAppoints(!avalbleAppoints)}
//                         style={styles.avalblePointBtn}>
//                         <Text
//                           style={{
//                             ...TextStyles.ordercalctaxname,
//                             color: maincolor,
//                           }}>
//                           {textStrings.avilbleTimeSlots}
//                         </Text>
//                       </TouchableOpacity> */}
//                 </View>
//                 {booked_slots?.length == timeSlots.length ? (
//                   <View>
//                     <Text
//                       style={{
//                         color: maincolor,
//                         textAlign: 'center',
//                         fontSize: scale(16),
//                         marginTop: 0,
//                       }}>
//                       {textStrings.noSlotsForDate}
//                     </Text>
//                   </View>
//                 ) : (
//                   <>
//                     <FlatList
//                       keyExtractor={item => item.id.toString()}
//                       data={timeSlots}
//                       ItemSeparatorComponent={
//                         <View style={{marginBottom: '1%'}} />
//                       }
//                       ListFooterComponent={<View style={{height: '2%'}} />}
//                       numColumns={2}
//                       ListHeaderComponent={
//                         <Text
//                           style={{
//                             ...TextStyles.Myorderbtntxt,
//                             color: maincolor,
//                           }}>
//                           {textStrings.chooseTimeTxt}
//                         </Text>
//                       }
//                       renderItem={({item}) => {
//                         const isPastOrBooked =
//                           isPastTimeSlot(item.time) ||
//                           booked_slots.includes(item.time);
//                         const isSelected = timeValue === item.time;

//                         return (
//                           <TouchableOpacity
//                             onPress={() =>
//                               !isPastOrBooked && setTimeValue(item.time)
//                             }
//                             style={{
//                               ...styles.btnMainContainerlist2,
//                               width: '48%',
//                               backgroundColor: isSelected
//                                 ? borderColor
//                                 : '#FBFBFB',
//                               opacity: isPastOrBooked ? 0.5 : 1,
//                             }}
//                             disabled={isPastOrBooked}>
//                             <Text
//                               style={{
//                                 ...TextStyles.timeslot,
//                                 textAlign: 'center',
//                                 color: isPastOrBooked ? 'red' : 'green', // Green for freezed, red for available
//                               }}>
//                               {item.time}
//                             </Text>
//                           </TouchableOpacity>
//                         );
//                       }}

//                       // renderItem={({ item }) => {
//                       //   const isPastOrBooked = isPastTimeSlot(item.time) || booked_slots.includes(item.time);
//                       //   return (
//                       //     <TouchableOpacity
//                       //       onPress={() => !isPastOrBooked && setTimeValue(item.time)}
//                       //       style={{
//                       //         ...styles.btnMainContainerlist2,
//                       //         width: '48%',
//                       //         backgroundColor:
//                       //           timeValue === item.time ? borderColor : '#FBFBFB',
//                       //         opacity: isPastOrBooked ? 0.5 : 1,
//                       //       }}
//                       //       disabled={isPastOrBooked}>
//                       //       <Text
//                       //         style={{
//                       //           ...TextStyles.timeslot,
//                       //           textAlign: 'center',
//                       //           color: 'black'
//                       //         }}>
//                       //         {item.time}
//                       //       </Text>
//                       //     </TouchableOpacity>
//                       //   );
//                       // }}
//                     />
//                   </>
//                 )}
//               </View>
//             )}

//             {stepNumber === 3 && (
//               <View style={{...styles.mainConatinerstep2, marginTop: h('3%')}}>
//                 <FlatList
//                   keyExtractor={item => item.id}
//                   data={
//                     (orderProcessName === 'support') &
//                     (curentOrderProductData.totalPrice === 0)
//                       ? freeServiceButtonsRender
//                       : btnsRender
//                   }
//                   ItemSeparatorComponent={
//                     <View style={{marginBottom: h('2%')}} />
//                   }
//                   renderItem={({item}) => (
//                     <TouchableOpacity
//                       onPress={item?.clickfun}
//                       style={styles.btnMainContainerlist}>
//                       <View style={styles.listbtnImageCont}>
//                         <Image
//                           source={item.image}
//                           style={{
//                             width:
//                               item.id === 1 || item.id === 4 ? '67%' : '100%',
//                             height: '87%',
//                             resizeMode: 'contain',
//                           }}
//                         />
//                       </View>
//                       <View style={styles.listbtntxtCont}>
//                         <Text
//                           style={{
//                             ...TextStyles.completepaytitle,
//                             fontSize: scale(14),
//                           }}>
//                           {item.title}
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             )}
//             {stepNumber === 1 &&
//               locationStaing !== '' &&
//               locationStaing?.length > 0 && (
//                 <View style={styles.locationInfoShowCont}>
//                   <MapView
//                     ref={map}
//                     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                     style={{
//                       width: '100%',
//                       height: h('20%'),
//                     }}
//                     initialRegion={{
//                       latitude: originCoods.latitude,
//                       longitude: originCoods.longitude,
//                       latitudeDelta: 0.0622,
//                       longitudeDelta: 0.0421,
//                     }}
//                     region={{
//                       latitude: selectePlace.latitude,
//                       longitude: selectePlace.longitude,
//                       latitudeDelta: 0.0622,
//                       longitudeDelta: 0.0421,
//                     }}>
//                     <Marker
//                       coordinate={selectePlace}
//                       pinColor={maincolor}
//                       title={textStrings.curntLocationTxt}
//                       identifier="Your Current Location"
//                     />
//                   </MapView>

//                   <View style={styles.dateContainer}>
//                     <Icon
//                       color={c0color}
//                       name="calendar-outline"
//                       size={h('3.5%')}
//                     />
//                     <Text style={TextStyles.complpaydatewalatxt}>
//                       {`${new Date().toLocaleString()}`}
//                     </Text>
//                   </View>
//                   <View style={styles.showdataRowCont}>
//                     <View style={styles.firstdivbtnCont}>
//                       <Icon
//                         color={c0color}
//                         name="location-sharp"
//                         size={h('3.5%')}
//                       />
//                       <View style={styles.txtSmalContainer}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={TextStyles.completepayplacetxt}>
//                           {cityName}
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={styles.firstdivbtnCont}>
//                       <Icon
//                         color={c0color}
//                         name="md-phone-portrait-outline"
//                         size={h('3.5%')}
//                       />
//                       <Text style={TextStyles.completepayplacetxt}>
//                         {isAuth?.phoneNumber
//                           ? isAuth?.phoneNumber
//                           : '123 123 123'}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               )}
//           </View>
//           {locationStaing?.length > 0 && stepNumber < 3 ? (
//             <>
//               <AppBtn title={textStrings.nextTxt} clickfun={nextButnFuc} />
//               <View style={{marginBottom: 30}} />
//             </>
//           ) : null}
//         </View>
//         <Modal
//           visible={openMapModal}
//           onRequestClose={() => setopenMapModal(false)}>
//           <View style={{...styles.fillscreenbg}}>
//             <CurvedHeaderComp
//               name={textStrings.selectLocationTxt}
//               iconName1={'left'}
//               iconName2={''}
//               firstbtnFun={() => setopenMapModal(false)}
//               secbtnFun={() => console.log('next')}
//               reddot={true}
//             />
//             <View style={styles.otherContent}>
//               <MapView
//                 ref={map}
//                 provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                 style={{
//                   width: '100%',
//                   height: h('70%'),
//                 }}
//                 onPress={async e => {
//                   setSelectedPlace(e.nativeEvent.coordinate);
//                   await getOtherDta(
//                     e.nativeEvent.coordinate.latitude,
//                     e.nativeEvent.coordinate.longitude,
//                   );
//                 }}
//                 region={{
//                   latitude: originCoods.latitude,
//                   longitude: originCoods.longitude,
//                   latitudeDelta: 0.0622,
//                   longitudeDelta: 0.0421,
//                 }}>
//                 {selectePlace.latitude !== 0 && selectePlace.longitude !== 0 ? (
//                   <Marker
//                     coordinate={{
//                       latitude: selectePlace.latitude,
//                       longitude: selectePlace.longitude,
//                     }}
//                     pinColor={maincolor}
//                     title={textStrings.locationTxt}
//                     identifier="Your Current Location"
//                   />
//                 ) : null}
//               </MapView>

//               <AppBtn
//                 title={textStrings.nextTxt}
//                 clickfun={() => {
//                   setopenMapModal(false);
//                 }}
//               />
//               <View style={{marginBottom: 100}} />
//             </View>
//           </View>
//         </Modal>
//         {/* <Modal
//           visible={validate_payment}
//           onRequestClose={() => onSuccessFun(validate_payment)}>
//           <View style={{ ...styles.fillscreenbg }}>
//             <Text style={TextStyles.completepayplacetxt}>
//               {"Please wait, verifying your payment"}
//             </Text>
//           </View>
//         </Modal> */}
//       </View>

//       {/* <TamaraPaymentModal
//         show={openTamaraModal}
//         onRequestClose={toggleTamaraModal}
//         onSuccessFun={() => lastStepFun(textStrings.installTxt + ' Tamara')}
//         locationStaing={locationStaing}
//         cityName={cityName}
//       /> */}

//       <TabbyPaymentModal
//         cityName={cityName}
//         locationStaing={locationStaing}
//         onRequestClose={toggleTabbyModal}
//         onSuccessFun={e => {
//           if (
//             `${e}`.toLowerCase() !== 'close' &&
//             `${e}`.toLowerCase() !== 'rejected' &&
//             `${e}`.toLowerCase() !== 'expired' &&
//             `${e}`.toLowerCase() === 'authorized'
//           ) {
//             lastStepFun(textStrings.installTxt + ' Tabby');
//           } else {
//             Alert.alert(textStrings.Appname, 'Payment is cancelled');
//             toggleTabbyModal();
//           }
//         }}
//         show={openTabbyModal}
//       />

//       <ARPaymentModal
//         onRequestClose={toggleAlRajhiModal}
//         show={openAlRajhiPayment}
//         onSuccessFun={orderId => {
//           lastStepFun(textStrings.installTxt + ' Al-rajhi', orderId);
//           toggleAlRajhiModal();
//         }}
//         onVerifyPayment={orderId => {
//           setValidatePayment(orderId);
//         }}
//       />
//       <LoadingModal visibleModal={loadingModal || validate_payment} />
//     </>
//   );
// };

// export default CompletePaymentScreen;

// const styles = StyleSheet.create({
//   textContainer: {
//     width: '95%',
//     alignSelf: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   dashedImage: {
//     height: '5%',
//     width: '16%',
//     resizeMode: 'repeat',
//     marginHorizontal: w('2%'),
//   },
//   flatListHeaderDiv: {
//     width: '100%',
//     alignSelf: 'center',
//     height: h('16%'),
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'space-evenly',
//     flexDirection: 'column',
//     marginBottom: h('1.5%'),
//   },
//   btnMainContainerlist: {
//     flex: 1,
//     height: h('7%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#FBFBFB',
//     borderWidth: 0.5,
//     borderColor: '#BFD0E5',
//     borderRadius: h('1%'),
//     marginHorizontal: w('1%'),
//   },
//   btnMainContainerlist2: {
//     width: '100%',
//     height: h('7%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#FBFBFB',
//     borderWidth: 0.5,
//     borderColor: '#BFD0E5',
//     borderRadius: h('1%'),
//     marginHorizontal: w('1%'),
//   },
//   avalblePointBtn: {
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: h('4%'),
//     marginVertical: h('2%'),
//   },
//   listbtnImageCont: {
//     width: '40%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//   },
//   listbtntxtCont: {
//     width: '55%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     paddingLeft: w('3%'),
//   },
//   pickercont: {
//     width: '100%',
//     height: h('12%'),
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   mainConatinerstep2: {
//     width: '100%',
//     height: h('50%'),
//     marginTop: h('2%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'column',
//     overflow: 'hidden',
//   },
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   otherContent: {
//     width: '100%',
//     height: '80%',
//   },
//   filldivCont: {
//     flex: 1,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   stepsContainers: {
//     width: '90%',
//     alignSelf: 'center',
//     height: h('8%'),
//     // marginTop: h('1%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   stepContainer: {
//     width: w('15%'),
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     borderRadius: h('1%'),
//     borderWidth: 1,
//   },
//   absolutebelowbtn: {
//     width: '100%',
//     height: h('22%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
//   locationInfoShowCont: {
//     width: '100%',
//     height: h('33%'),
//     borderWidth: 0.5,
//     borderColor: '#BFD0E5',
//     marginTop: h('3%'),
//   },
//   dateContainer: {
//     width: '90%',
//     alignSelf: 'center',
//     height: h('5%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     marginVertical: h('0.8%'),
//   },
//   showdataRowCont: {
//     width: '90%',
//     alignSelf: 'center',
//     height: h('5%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   firstdivbtnCont: {
//     width: '50%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//   },
//   txtSmalContainer: {
//     flex: 1,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Platform} from 'react-native';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import AppBtn from '../Components/AppBtn';
import {maincolor, textcolor, c0color, borderColor} from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomBtn from '../Components/CustomBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import DateSelectorModelInput from '../Components/DateSelectorModelInput';
import {scale} from 'react-native-size-matters';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import LoadingModal from '../Components/LoadingModal';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import {
  postDataWithRef,
  getEmployDataWithJobrole,
  getChildNodeCount,
  UpdateOrderWithId,
  getBookedTimeSlotsByDate,
  getPaymentStatusByOrderId,
  getMYOrders,
} from '../DataBase/databaseFunction';
// import TamaraPaymentModal from '../Components/TamaraPaymentModal';
import TabbyPaymentModal from '../Components/TabbyPaymentModal';
import {webengage} from '../webengage';
import moment from 'moment';
import ARPaymentModal from '../Components/ARPaymentModal';
import {getCreatedDate} from './CommonUtils';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';

const CompletePaymentScreen = ({navigation}) => {
  const mapKey = 'AIzaSyDBwLNe1n4ITYmoqkgGip1-M8k7fpVZb6k';
  const {textStrings} = useTranslation();
  const {isAuth} = useSelector(state => state.auth);
  const {curentOrderProductData, orderProcessName} = useSelector(
    state => state.orderProcess,
  );
  const {
    engineOilPetrolData,
    engineOilData,
    filtersData,
    oilsData,
    tireData,
    batteryData,
  } = useSelector(state => state.project);
  const findTitle = (referance, id) => {
    const data =
      referance === 'Filters'
        ? filtersData.find(dat => dat.id === id)
        : referance === 'Oils'
        ? oilsData.find(dat => dat.id === id)
        : referance === 'Tyres'
        ? tireData.find(dat => dat.id === id)
        : referance === 'btteries'
        ? batteryData.find(dat => dat.id === id)
        : {};
    return {
      title: data?.productNameEng
        ? data?.productNameEng
        : textStrings.productHasBeenDeleted,
      price: data?.originalPrice ? data?.originalPrice : 0,
    };
  };
  const map = useRef(null);
  const [stepNumber, setstepNumber] = useState(1);
  const [openTabbyModal, setopenTabbyModal] = useState(false);
  const [locationStaing, setlocationStaing] = useState('');
  const [openMapModal, setopenMapModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timeValue, setTimeValue] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [avalbleAppoints, setAvalbleAppoints] = useState(false);
  const [cityName, setCityName] = useState('');
  const [paymentMethodName, setpaymentMethodName] = useState('');
  const [openTamaraModal, setOpenTamaraModal] = useState(false);
  const [openAlRajhiPayment, setopenAlRajhiPayment] = useState(false);
  const toggleTamaraModal = () => setOpenTamaraModal(!openTamaraModal);
  const toggleTabbyModal = () => setopenTabbyModal(!openTabbyModal);
  const toggleAlRajhiModal = () => setopenAlRajhiPayment(!openAlRajhiPayment);
  const [booked_slots, setBookedSlots] = useState([]);
  const [validate_payment, setValidatePayment] = useState();
  const [userOrders, setUserOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track the selected date
  const [availableSlots, setAvailableSlots] = useState([]);

  const getUserDetails = async () => {
    try {
      const userPhoneNumber = await AsyncStorage.getItem('acZurexLoginUserId');
      const userId = await AsyncStorage.getItem('userId');
      if (userPhoneNumber !== null && userId !== null) {
        let userOrders = null;
        try {
          userOrders = await getMYOrders(userId);
        } catch (fetchError) {
          console.error('Error fetching user orders:', fetchError);
        }
        return {userPhoneNumber, userId, userOrders};
      } else {
        console.log('User details not found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user details:', error);
      return null;
    }
  };

  useEffect(() => {
    if (booked_slots.length > 0) {
      console.log('Booked slots updated', booked_slots);
    }
  }, [booked_slots]);

  useEffect(() => {
    getUserDetails();
    async function getBookedSlots() {
      const bookedSlots = await getBookedTimeSlotsByDate(
        new Date(date).toDateString(),
        orderProcessName,
      );
      console.log(`new Date : ${new Date(date).toDateString()}`);

      setBookedSlots(bookedSlots);
    }
    getBookedSlots();
  }, [date]);

  const checkLocationPermission = async () => {
    try {
      const result = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (result === RESULTS.GRANTED) {
        getCurentLcation();
      } else {
        requestLocationPermission();
      }
    } catch (err) {
      console.error('Error checking location permission:', err);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (result === RESULTS.GRANTED) {
        getCurentLcation();
      } else {
        Alert.alert(textStrings.locationPermissionDenied);
      }
    } catch (err) {
      console.error('Error requesting location permission:', err);
    }
  };

  useEffect(() => {
    async function getPaymentStatus(validate_payment) {
      const orderPaymentDetails = await getPaymentStatusByOrderId(
        validate_payment,
      );
      // setBookedSlots(bookedSlots)
      if (orderPaymentDetails === null || orderPaymentDetails.length === 0) {
        await timeout(5000);
        getPaymentStatus(validate_payment);
      } else {
        if (orderPaymentDetails[0].error) {
          setValidatePayment(undefined);
          Alert.alert(
            textStrings.productTitleEror,
            `Error occured with code ${orderPaymentDetails[0].errorText}`,
          );
        } else {
          lastStepFun(textStrings.installTxt + ' Al-rajhi', validate_payment);
          // toggleAlRajhiModal();
        }
      }
    }
    if (validate_payment) {
      getPaymentStatus(validate_payment);
    }
  }, [validate_payment]);

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const timeArrayBattries = [
    {id: 0, time: '10:30 AM - 11:30 AM', max_bookings: 1},
    {id: 1, time: '11:30 AM - 12:30 PM', max_bookings: 1},
    {id: 2, time: '12:30 PM - 01:30 PM', max_bookings: 1},
    {id: 3, time: '01:30 PM - 02:30 PM', max_bookings: 1},
    {id: 4, time: '02:30 PM - 03:30 PM', max_bookings: 1},
    {id: 5, time: '03:30 PM - 04:30 PM', max_bookings: 1},
    {id: 6, time: '04:30 PM - 05:30 PM', max_bookings: 1},
    {id: 7, time: '05:30 PM - 06:30 PM', max_bookings: 1},
    {id: 8, time: '06:30 PM - 07:30 PM', max_bookings: 1},
    {id: 9, time: '07:30 PM - 08:30 PM', max_bookings: 1},
    {id: 10, time: '08:30 PM - 09:30 PM', max_bookings: 1},
    {id: 11, time: '09:30 PM - 10:30 PM', max_bookings: 1},
  ];

  const timeArrayTyres = [
    {id: 0, time: '10:00 AM - 12:00 PM', max_bookings: 1},
    {id: 1, time: '12:00 PM - 02:00 PM', max_bookings: 1},
    {id: 2, time: '02:00 PM - 04:00 PM', max_bookings: 1},
    {id: 3, time: '04:00 PM - 06:00 PM', max_bookings: 1},
    {id: 4, time: '06:00 PM - 08:00 PM', max_bookings: 1},
  ];

  const timeArrayOils = [
    {id: 0, time: '10:00 AM - 12:00 PM', max_bookings: 1},
    {id: 1, time: '12:00 PM - 02:00 PM', max_bookings: 1},
    {id: 2, time: '02:00 PM - 04:00 PM', max_bookings: 1},
    {id: 3, time: '04:00 PM - 06:00 PM', max_bookings: 1},
    {id: 4, time: '06:00 PM - 08:00 PM', max_bookings: 1},
  ];

  const timeSlots =
    orderProcessName === 'battery'
      ? timeArrayBattries
      : orderProcessName === 'tyre'
      ? timeArrayTyres
      : timeArrayOils;

  const isPastTimeSlot = time => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return false;
    }

    if (selectedDate < today) {
      return true;
    }

    const [hours, minutesPart] = time.split(' ');
    const [hour, minute] = hours.split(':');
    const isPM = minutesPart.toLowerCase() === 'pm';
    const slotTime = new Date();
    slotTime.setHours(
      isPM && hour !== '12' ? parseInt(hour) + 12 : parseInt(hour),
      parseInt(minute),
      0,
      0,
    );

    return slotTime < currentTime;
  };

  const [loadingModal, setloadingModal] = useState(false);
  const [originCoods, setoriginCoods] = useState({
    latitude: 24.7237501,
    longitude: 46.1630812,
  });

  const [selectePlace, setSelectedPlace] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const result = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapKey}`,
          {responseType: 'json'},
        )
        .then(dat => {
          var stateName = dat?.data?.results[0].address_components.filter(
            x =>
              x.types.filter(t => t == 'administrative_area_level_1').length >
              0,
          )[0].short_name;
          return {
            address: dat?.data?.results[0]?.formatted_address,
            cityName: stateName,
          };
        });
      return result;
    } catch (error) {}
  };
  const getCurentLcation = async () => {
    setloadingModal(true);
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        setoriginCoods({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setSelectedPlace({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setloadingModal(false);
      })
      .catch(error => {
        setloadingModal(false);
      });
  };
  // const YourCurentLocatFun = async () => {
  //   if (selectePlace.latitude === 0 || selectePlace.longitude === 0) {
  //     checkLocationPermission()
  //     return
  //   }
  //   setloadingModal(true);
  //   const getPlaceName = await getAddressFromCoordinates(
  //     selectePlace.latitude,
  //     selectePlace.longitude,
  //   );
  //   setlocationStaing(getPlaceName?.address);
  //   setCityName(getPlaceName?.cityName);
  //   setloadingModal(false);
  // };
  // const getOtherDta = async (latitude, longitude) => {
  //   const getPlaceName = await getAddressFromCoordinates(latitude, longitude);
  //   setlocationStaing(getPlaceName?.address);
  //   setCityName(getPlaceName?.cityName);
  // };

  const YourCurentLocatFun = async () => {
    if (selectePlace.latitude === 0 || selectePlace.longitude === 0) {
      checkLocationPermission();
      return;
    }
    setloadingModal(true);

    const getPlaceName = await getAddressFromCoordinates(
      selectePlace.latitude,
      selectePlace.longitude,
    );

    const address = getPlaceName?.address;
    const cityName = getPlaceName?.cityName;
    setlocationStaing(address);
    setCityName(cityName);
    try {
      await AsyncStorage.setItem('Orderaddress', address);
      await AsyncStorage.setItem('OrdercityName', cityName);
    } catch (error) {
      console.error('Error saving city name to AsyncStorage:', error);
    }

    setloadingModal(false);
  };

  const getOtherDta = async (latitude, longitude) => {
    const getPlaceName = await getAddressFromCoordinates(latitude, longitude);

    const address = getPlaceName?.address;
    const cityName = getPlaceName?.cityName;

    setlocationStaing(address);
    setCityName(cityName);
    console.log(`##3#####`, locationStaing);

    console.log(`cityName :${cityName}`);
    // Save cityName to AsyncStorage
    try {
      await AsyncStorage.setItem('Orderaddress', address);
      await AsyncStorage.setItem('cityName', cityName);
    } catch (error) {
      console.error('Error saving city name to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getCurentLcation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update current time every minute

    return () => clearInterval(timer);
  }, []);
  const dispatch = useDispatch();

  const sendNotification = async (registrationToken, title, body) => {
    // Ensure registrationToken is an array
    const tokens = Array.isArray(registrationToken)
      ? registrationToken
      : [registrationToken];

    for (const token of tokens) {
      try {
        // Send the notification data to the backend for each token
        const response = await axios.post(
          'https://app-xaop4bxqda-uc.a.run.app/sendNotification',
          {
            token, // Send as `token`, matching backend's expectations
            title,
            body,
          },
        );
        console.log(`Notification sent successfully to token: ${token}`);
      } catch (error) {
        console.error(
          `Error sending notification to token: ${token}`,
          error.message,
        );
      }
    }
  };

  const lastStepFun = async (payMethod = '', orderId) => {
    setOpenTamaraModal(false);
    const storedUserId = await AsyncStorage.getItem('userId');
    const userDetails = await getUserDetails();

    if (!userDetails) {
      console.error('User details could not be retrieved');
      setloadingModal(false);
      return;
    }

    const {userPhoneNumber, userId, userOrders} = userDetails;

    if (orderProcessName === 'support') {
      setloadingModal(true);
      await dispatch(
        setCurentOrderProductData({
          curentOrderProductData: {
            ...curentOrderProductData,
            deliveryInfo: {
              locationCoordinates: selectePlace,
              locationName: locationStaing,
              cityName: cityName,
            },
            orderProcessName: orderProcessName,
            appointment: {
              date: new Date(date).toDateString(),
              time: timeValue,
            },
            OrderedByUserId: isAuth?.userId,
            orderStatus: 'pending',
            paymentMethodName: payMethod ? payMethod : '',
          },
        }),
      );
      const userId = await AsyncStorage.getItem('userId');
      if (!orderId) {
        let orderCount = await getChildNodeCount('supportOrders');
        console.log(`orderId: ${orderCount}`);

        orderCount++;
        console.log(`orderId: ${orderCount}`);

        orderId = `${orderCount
          .toString()
          .padStart(6, '0')}${getCreatedDate()}`;
      }

      await postDataWithRef('supportOrders', orderId, {
        OrderedByUserId: userId,
        ...curentOrderProductData,
        deliveryInfo: {
          locationCoordinates: selectePlace,
          locationName: locationStaing,
          cityName: cityName,
        },
        orderProcessName: orderProcessName,
        appointment: {
          date: new Date(date).toDateString(),
          time: timeValue,
        },
        // OrderedByUserId: isAuth?.userId,
        orderStatus: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        paymentMethodName: payMethod ? payMethod : '',
      })
        .then(async () => {
          if (payMethod) {
            sendOrderEvent('Order created', payMethod);
          }
          //todo  check update freeServicesCount after service complete not while order creation
          UpdateOrderWithId(curentOrderProductData.orderId, {
            // setting to 1 if total price is more than 0 as 1 service is booked from 2 free services after payment
            freeServicesCount:
              curentOrderProductData.totalPrice > 0
                ? 1
                : curentOrderProductData.freeServicesCount - 1,
          });

          await analytics().logEvent('Support_Order', {
            phoneNumber: userPhoneNumber,
            orderId: orderId,
          });
          navigation.navigate('OrderCompletedScreen', {orderId});
        })
        .catch(e => console.log('error', e));

      setloadingModal(false);
      setValidatePayment(undefined);
    } else {
      const product = curentOrderProductData.products[0];
      const reference = product.referance;
      const productId = product.id;

      const referenceToDataMap = {
        btteries: batteryData,
        engineOil: engineOilData,
        engineOilPetrol: engineOilPetrolData,
        Tyres: tireData,
      };
      const data = referenceToDataMap[reference];
      const productData = data.find(item => item.id === productId);
      const productName = productData
        ? productData.productNameEng
        : 'Unknown Product';

      if (!data) {
        console.error(`Reference '${reference}' not found in map`);
        setloadingModal(false);
        return;
      }
      setloadingModal(true);
      await dispatch(
        setCurentOrderProductData({
          curentOrderProductData: {
            ...curentOrderProductData,
            deliveryInfo: {
              locationCoordinates: selectePlace,
              locationName: locationStaing,
              cityName: cityName,
            },
            orderProcessName: orderProcessName,
            appointment: {
              date: new Date(date).toDateString(),
              time: timeValue,
            },
            OrderedByUserId: isAuth?.userId,
            orderStatus: 'pending',
            paymentMethodName: payMethod ? payMethod : '',
          },
        }),
      );
      if (!orderId) {
        let orderCount = await getChildNodeCount('orders');
        console.log(`orderId: ${orderCount}`);

        orderCount++;
        console.log(`orderId: ${orderCount}`);
        orderId = `${orderCount
          .toString()
          .padStart(6, '0')}${getCreatedDate()}`;
      }

      console.log(`111111111111111111`, curentOrderProductData.totalPrice);

      const userId = await AsyncStorage.getItem('userId');
      await postDataWithRef('orders', orderId, {
        ...curentOrderProductData,
        deliveryInfo: {
          locationCoordinates: selectePlace,
          locationName: locationStaing,
          cityName: cityName,
        },
        orderProcessName: orderProcessName,
        appointment: {
          date: new Date(date).toDateString(),
          time: timeValue,
        },
        OrderedByUserId: userId,
        orderStatus: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        paymentMethodName: payMethod ? payMethod : '',
        paymentStatus: 'pending',
        paymentId: 'paymentId',
      })
        .then(async () => {
          if (payMethod) {
            sendOrderEvent('Order created', payMethod);
          }
          const notificationData = {
            title: 'Order Placed',
            body: `Order with ID ${orderId} has been successfully created.`,
          };
          const employData = await getEmployDataWithJobrole('supervisor');
          const employDeviceTokens = [];
          for (const key in employData) {
            if (employData[key].deviceToken) {
              employDeviceTokens.push(...employData[key].deviceToken);
            }
          }

          await sendNotification(
            employDeviceTokens,
            notificationData.title,
            notificationData.body,
          );

          const eventType =
            userOrders.length > 0 ? 'app_orders_placed' : 'app_first_purchase';
          console.log(`111111`, curentOrderProductData.productType);

          await analytics().logEvent(eventType, {
            phoneNumber: userPhoneNumber,
            category: curentOrderProductData.productType,
            purchased_product: productName,
            orderValue: curentOrderProductData.totalPrice,
            orderId: orderId,
            purchased_category: curentOrderProductData.productType,
          });
          navigation.navigate('OrderCompletedScreen', {orderId});
        })
        .catch(e => console.log(e.error));

      setloadingModal(false);
      setValidatePayment(undefined);
    }
  };

  const nextButnFuc = async () => {
    if (stepNumber < 3) {
      if (stepNumber === 2) {
        if (timeValue !== '' && timeValue.length > 0) {
          const dateTime =
            moment(date).format('DD-MM-YYYY') + ' ' + timeValue.toUpperCase();
          webengage.track('Checkout created', {
            // 'abandoned checkout url': '',
            'Product details': curentOrderProductData?.products
              ? curentOrderProductData?.products
              : curentOrderProductData?.service
              ? curentOrderProductData?.service
              : [],
            'Number of Products': curentOrderProductData?.products
              ? curentOrderProductData?.products?.length
              : curentOrderProductData?.service
              ? curentOrderProductData?.service?.length
              : 0,
            'product name': curentOrderProductData?.products
              ? curentOrderProductData?.products
                  ?.map((dat, index) => findTitle(dat.id, dat.referance)?.title)
                  .join(', ')
                  .toString()
              : curentOrderProductData?.service
              ? curentOrderProductData?.service[0]?.products
                  ?.map((dat, index) => dat?.productNameEng)
                  .join(', ')
                  .toString()
              : '',
            Subtotal: curentOrderProductData?.orderPrice,
            'Cart Total': curentOrderProductData?.orderPrice,
            // 'payment method': '',
            'billing address': locationStaing,
            'Date & Time': dateTime,
            'total price': curentOrderProductData?.totalPrice,
            'total spent': curentOrderProductData?.orderPrice,

            // 'total spent': '',
          });
          setstepNumber(stepNumber + 1);
        } else {
          Alert.alert(
            textStrings.userInfoProcessEror,
            textStrings.userInfoError,
          );
        }
      } else {
        if (stepNumber === 1) {
          webengage.track('Checkout Started', {
            'Product details': curentOrderProductData?.products
              ? curentOrderProductData?.products
              : curentOrderProductData?.service
              ? curentOrderProductData?.service
              : [],
            'Number of Products': curentOrderProductData?.products
              ? curentOrderProductData?.products?.length
              : curentOrderProductData?.service
              ? curentOrderProductData?.service?.length
              : 0,
            'product name': curentOrderProductData?.products
              ? curentOrderProductData?.products
                  ?.map((dat, index) => findTitle(dat.id, dat.referance)?.title)
                  .join(', ')
                  .toString()
              : curentOrderProductData?.service
              ? curentOrderProductData?.service[0]?.products
                  ?.map((dat, index) => dat?.productNameEng)
                  .join(', ')
                  .toString()
              : '',
            // Subtotal: curentOrderProductData?.orderPrice,
            'Cart Total': curentOrderProductData?.orderPrice,
          });
          setstepNumber(stepNumber + 1);
        } else {
          setstepNumber(stepNumber + 1);
        }
      }
    } else if (stepNumber === 3) {
      if (paymentMethodName !== '') {
        if (paymentMethodName === 'cashOnDelivery') {
          await lastStepFun(textStrings.cashPayTxt);
        } else if (paymentMethodName === 'installments') {
          toggleTamaraModal();
        } else if (paymentMethodName === 'epay') {
          Alert.alert(textStrings.productTitleEror, textStrings.inProgress);
        }
      } else {
        Alert.alert(
          textStrings.userInfoProcessEror,
          textStrings.paymentMethodError,
        );
      }
    }
  };

  const btnsRender = [
    {
      image: require('../assets/fist.png'),
      clickfun: () => {
        webengage.track('Payment Method Chosen', {
          'payment method': textStrings.installTxt + ' Al-rajhi',
        });
        toggleAlRajhiModal();
      },
      title: textStrings.ePayTxt,
      id: 0,
    },
    {
      image: require('../assets/sect.png'),
      clickfun: () => {
        webengage.track('Payment Method Chosen', {
          'payment method': textStrings.installTxt + ' Tabby',
        });
        // Alert.alert(textStrings.Appname, textStrings.ComingSoon);
        toggleTabbyModal();
      },
      title: textStrings.installTxt,
      id: 4,
    },
    {
      image: require('../assets/tamara.png'),
      clickfun: () => {
        webengage.track('Payment Method Chosen', {
          'payment method': textStrings.installTxt + ' Tamara',
        });
        Alert.alert(textStrings.Appname, textStrings.ComingSoon);
      },
      title: textStrings.installTxt,
      id: 1,
    },
    {
      image: require('../assets/newthr.png'),
      clickfun: () => {
        webengage.track('Payment Method Chosen', {
          'payment method': textStrings.cashPayTxt,
        });
        lastStepFun(textStrings.cashPayTxt);
      },
      title: textStrings.cashPayTxt,
      id: 2,
    },
  ];

  // const btnsRender = [
  //   {
  //     image: require('../assets/fist.png'),
  //     clickfun: () => {
  //       webengage.track('Payment Method Chosen', {
  //         'payment method': textStrings.installTxt + ' Al-rajhi',
  //       });
  //       toggleAlRajhiModal();
  //     },
  //     title: textStrings.ePayTxt,
  //     id: 0,
  //   },
  //   {
  //     image: require('../assets/sect.png'),
  //     clickfun: () => {
  //       webengage.track('Payment Method Chosen', {
  //         'payment method': textStrings.installTxt + ' Tabby',
  //       });
  //       toggleTabbyModal();
  //     },
  //     title: textStrings.installTxt,
  //     id: 4,
  //   },
  //   {
  //     image: require('../assets/tamara.png'),
  //     clickfun: () => {
  //       webengage.track('Payment Method Chosen', {
  //         'payment method': textStrings.installTxt + ' Tamara',
  //       });
  //       //toggleTamaraModal();
  //     },
  //     title: textStrings.installTxt,
  //     id: 1,
  //   },
  //   {
  //     image: require('../assets/newthr.png'),
  //     clickfun: () => {
  //       webengage.track('Payment Method Chosen', {
  //         'payment method': textStrings.cashPayTxt,
  //       });
  //       lastStepFun(textStrings.cashPayTxt);
  //     },
  //     title: textStrings.cashPayTxt,
  //     id: 2,
  //   },
  // ];

  const freeServiceButtonsRender = [
    {
      image: require('../assets/newthr.png'),
      clickfun: () => {
        webengage.track('Payment Method Chosen', {
          'payment method': 'Free Service',
        });
        lastStepFun(textStrings.free_service);
      },
      title: textStrings.free_service,
      id: 2,
    },
  ];

  const sendOrderEvent = (name, payment) => {
    if (name) {
      const dateTime =
        moment(date).format('DD-MM-YYYY') + ' ' + timeValue.toUpperCase();

      webengage.track(name, {
        // 'abandoned checkout url': '',
        'Product details': curentOrderProductData?.products
          ? curentOrderProductData?.products
          : curentOrderProductData?.service
          ? curentOrderProductData?.service
          : [],
        'Number of Products': curentOrderProductData?.products
          ? curentOrderProductData?.products?.length
          : curentOrderProductData?.service
          ? curentOrderProductData?.service?.length
          : 0,
        'product name': curentOrderProductData?.products
          ? curentOrderProductData?.products
              ?.map((dat, index) => findTitle(dat.id, dat.referance)?.title)
              .join(', ')
              .toString()
          : curentOrderProductData?.service
          ? curentOrderProductData?.service[0]?.products
              ?.map((dat, index) => dat?.productNameEng)
              .join(', ')
              .toString()
          : '',
        Subtotal: curentOrderProductData?.orderPrice,
        'Cart Total': curentOrderProductData?.orderPrice,
        'payment method': payment ? payment : textStrings.cashPayTxt,
        'billing address': locationStaing,
        'Date & Time': dateTime,
        'total price': curentOrderProductData?.orderPrice,
        'total spent': curentOrderProductData?.orderPrice,

        // 'total spent': '',
      });
    }
  };
  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.completeOrder}
          iconName1={'left'}
          iconName2={''}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('next')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <View style={styles.stepsContainers}>
            <View
              style={{
                ...styles.stepContainer,
                borderColor: stepNumber >= 1 ? maincolor : c0color,
              }}>
              <Icon
                color={stepNumber >= 1 ? maincolor : c0color}
                name="location-sharp"
                size={h('3.5%')}
              />
            </View>
            <Image
              source={require('../assets/dashes.png')}
              style={styles.dashedImage}
            />
            <View
              style={{
                ...styles.stepContainer,
                borderColor: stepNumber >= 2 ? maincolor : c0color,
              }}>
              <Icon
                color={stepNumber >= 2 ? maincolor : c0color}
                name="time-outline"
                size={h('3.5%')}
              />
            </View>
            <Image
              source={require('../assets/dashes.png')}
              style={styles.dashedImage}
            />
            <View
              style={{
                ...styles.stepContainer,
                borderColor: stepNumber === 3 ? maincolor : c0color,
              }}>
              <Icon
                color={stepNumber === 3 ? maincolor : c0color}
                name="checkmark"
                size={h('3.5%')}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                ...TextStyles.completesteptxt,
                color: stepNumber >= 1 ? maincolor : c0color,
                fontSize: scale(16),
                marginTop: 0,
                width: '30%',
              }}>
              {textStrings.locationTxt}
            </Text>
            <Text
              style={{
                ...TextStyles.completesteptxt,
                width: '38%',
                color: stepNumber >= 2 ? maincolor : c0color,
                fontSize: scale(16),
                marginTop: 0,
              }}>
              {textStrings.timeTxt}
            </Text>
            <Text
              style={{
                ...TextStyles.completesteptxt,
                color: stepNumber === 3 ? maincolor : c0color,
                fontSize: scale(16),
                width: '31%',
                marginTop: 0,
              }}>
              {textStrings.confirmationTxt}
            </Text>
          </View>
          <View style={styles.filldivCont}>
            {stepNumber === 1 &&
              locationStaing === '' &&
              locationStaing?.length <= 0 && (
                <View style={{marginTop: h('3%')}}>
                  <CustomBtn
                    title={textStrings.curntLocationTxt}
                    clickfun={YourCurentLocatFun}
                  />
                  <View style={{marginTop: h('1%')}} />
                  <CustomBtn
                    title={textStrings.selectLocationTxt}
                    clickfun={() => {
                      setopenMapModal(true);
                    }}
                  />
                </View>
              )}
            {stepNumber === 2 && (
              <View style={styles.mainConatinerstep2}>
                <View style={styles.flatListHeaderDiv}>
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}>
                    <Text
                      style={{
                        ...TextStyles.Myorderbtntxt,
                        color: maincolor,
                        position: 'absolute',
                        left: 0,
                      }}>
                      {textStrings.chooseDateTxt}
                    </Text>
                    <View style={{width: '60%', alignSelf: 'center'}}>
                      <DateSelectorModelInput
                        orderProcessName={orderProcessName}
                        placeHolder={textStrings.chooseDateTxt}
                        giveCallBack={text => setDate(text)}
                      />
                    </View>
                  </View>

                  {/* <TouchableOpacity
                        onPress={() => setAvalbleAppoints(!avalbleAppoints)}
                        style={styles.avalblePointBtn}>
                        <Text
                          style={{
                            ...TextStyles.ordercalctaxname,
                            color: maincolor,
                          }}>
                          {textStrings.avilbleTimeSlots}
                        </Text>
                      </TouchableOpacity> */}
                </View>
                {booked_slots?.length == timeSlots.length ? (
                  <View>
                    <Text
                      style={{
                        color: maincolor,
                        textAlign: 'center',
                        fontSize: scale(16),
                        marginTop: 0,
                      }}>
                      {textStrings.noSlotsForDate}
                    </Text>
                  </View>
                ) : (
                  <>
                    <FlatList
                      keyExtractor={item => item.id.toString()}
                      data={timeSlots}
                      ItemSeparatorComponent={
                        <View style={{marginBottom: '1%'}} />
                      }
                      ListFooterComponent={<View style={{height: '2%'}} />}
                      numColumns={2}
                      ListHeaderComponent={
                        <Text
                          style={{
                            ...TextStyles.Myorderbtntxt,
                            color: maincolor,
                          }}>
                          {textStrings.chooseTimeTxt}
                        </Text>
                      }
                      renderItem={({item}) => {
                        const isPastOrBooked =
                          isPastTimeSlot(item.time) ||
                          booked_slots.includes(item.time);
                        const isSelected = timeValue === item.time;

                        return (
                          <TouchableOpacity
                            onPress={() =>
                              !isPastOrBooked && setTimeValue(item.time)
                            }
                            style={{
                              ...styles.btnMainContainerlist2,
                              width: '48%',
                              backgroundColor: isSelected
                                ? borderColor
                                : '#FBFBFB',
                              opacity: isPastOrBooked ? 0.5 : 1,
                            }}
                            disabled={isPastOrBooked}>
                            <Text
                              style={{
                                ...TextStyles.timeslot,
                                textAlign: 'center',
                                color: isPastOrBooked ? 'red' : 'green', // Green for freezed, red for available
                              }}>
                              {item.time}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}

                      // renderItem={({ item }) => {
                      //   const isPastOrBooked = isPastTimeSlot(item.time) || booked_slots.includes(item.time);
                      //   return (
                      //     <TouchableOpacity
                      //       onPress={() => !isPastOrBooked && setTimeValue(item.time)}
                      //       style={{
                      //         ...styles.btnMainContainerlist2,
                      //         width: '48%',
                      //         backgroundColor:
                      //           timeValue === item.time ? borderColor : '#FBFBFB',
                      //         opacity: isPastOrBooked ? 0.5 : 1,
                      //       }}
                      //       disabled={isPastOrBooked}>
                      //       <Text
                      //         style={{
                      //           ...TextStyles.timeslot,
                      //           textAlign: 'center',
                      //           color: 'black'
                      //         }}>
                      //         {item.time}
                      //       </Text>
                      //     </TouchableOpacity>
                      //   );
                      // }}
                    />
                  </>
                )}
              </View>
            )}

            {stepNumber === 3 && (
              <View style={{...styles.mainConatinerstep2, marginTop: h('3%')}}>
                <FlatList
                  keyExtractor={item => item.id}
                  data={
                    (orderProcessName === 'support') &
                    (curentOrderProductData.totalPrice === 0)
                      ? freeServiceButtonsRender
                      : btnsRender
                  }
                  ItemSeparatorComponent={
                    <View style={{marginBottom: h('2%')}} />
                  }
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={item?.clickfun}
                      style={styles.btnMainContainerlist}>
                      <View style={styles.listbtnImageCont}>
                        <Image
                          source={item.image}
                          style={{
                            width:
                              item.id === 1 || item.id === 4 ? '67%' : '100%',
                            height: '87%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={styles.listbtntxtCont}>
                        <Text
                          style={{
                            ...TextStyles.completepaytitle,
                            fontSize: scale(14),
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {stepNumber === 1 &&
              locationStaing !== '' &&
              locationStaing?.length > 0 && (
                <View style={styles.locationInfoShowCont}>
                  <MapView
                    ref={map}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                      width: '100%',
                      height: h('20%'),
                    }}
                    initialRegion={{
                      latitude: originCoods.latitude,
                      longitude: originCoods.longitude,
                      latitudeDelta: 0.0622,
                      longitudeDelta: 0.0421,
                    }}
                    region={{
                      latitude: selectePlace.latitude,
                      longitude: selectePlace.longitude,
                      latitudeDelta: 0.0622,
                      longitudeDelta: 0.0421,
                    }}>
                    <Marker
                      coordinate={selectePlace}
                      pinColor={maincolor}
                      title={textStrings.curntLocationTxt}
                      identifier="Your Current Location"
                    />
                  </MapView>

                  <View style={styles.dateContainer}>
                    <Icon
                      color={c0color}
                      name="calendar-outline"
                      size={h('3.5%')}
                    />
                    <Text style={TextStyles.complpaydatewalatxt}>
                      {`${new Date().toLocaleString()}`}
                    </Text>
                  </View>
                  <View style={styles.showdataRowCont}>
                    <View style={styles.firstdivbtnCont}>
                      <Icon
                        color={c0color}
                        name="location-sharp"
                        size={h('3.5%')}
                      />
                      <View style={styles.txtSmalContainer}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={TextStyles.completepayplacetxt}>
                          {cityName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.firstdivbtnCont}>
                      <Icon
                        color={c0color}
                        name="md-phone-portrait-outline"
                        size={h('3.5%')}
                      />
                      <Text style={TextStyles.completepayplacetxt}>
                        {isAuth?.phoneNumber
                          ? isAuth?.phoneNumber
                          : '123 123 123'}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
          </View>
          {locationStaing?.length > 0 && stepNumber < 3 ? (
            <>
              <AppBtn title={textStrings.nextTxt} clickfun={nextButnFuc} />
              <View style={{marginBottom: 30}} />
            </>
          ) : null}
        </View>
        <Modal
          visible={openMapModal}
          onRequestClose={() => setopenMapModal(false)}>
          <View style={{...styles.fillscreenbg}}>
            <CurvedHeaderComp
              name={textStrings.selectLocationTxt}
              iconName1={'left'}
              iconName2={''}
              firstbtnFun={() => setopenMapModal(false)}
              secbtnFun={() => console.log('next')}
              reddot={true}
            />
            <View style={styles.otherContent}>
              <MapView
                ref={map}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{
                  width: '100%',
                  height: h('70%'),
                }}
                onPress={async e => {
                  setSelectedPlace(e.nativeEvent.coordinate);
                  await getOtherDta(
                    e.nativeEvent.coordinate.latitude,
                    e.nativeEvent.coordinate.longitude,
                  );
                }}
                region={{
                  latitude: originCoods.latitude,
                  longitude: originCoods.longitude,
                  latitudeDelta: 0.0622,
                  longitudeDelta: 0.0421,
                }}>
                {selectePlace.latitude !== 0 && selectePlace.longitude !== 0 ? (
                  <Marker
                    coordinate={{
                      latitude: selectePlace.latitude,
                      longitude: selectePlace.longitude,
                    }}
                    pinColor={maincolor}
                    title={textStrings.locationTxt}
                    identifier="Your Current Location"
                  />
                ) : null}
              </MapView>

              <AppBtn
                title={textStrings.nextTxt}
                clickfun={() => {
                  setopenMapModal(false);
                }}
              />
              <View style={{marginBottom: 100}} />
            </View>
          </View>
        </Modal>
        {/* <Modal
          visible={validate_payment}
          onRequestClose={() => onSuccessFun(validate_payment)}>
          <View style={{ ...styles.fillscreenbg }}>
            <Text style={TextStyles.completepayplacetxt}>
              {"Please wait, verifying your payment"}
            </Text>
          </View>
        </Modal> */}
      </View>

      {/* <TamaraPaymentModal
        show={openTamaraModal}
        onRequestClose={toggleTamaraModal}
        onSuccessFun={() => lastStepFun(textStrings.installTxt + ' Tamara')}
        locationStaing={locationStaing}
        cityName={cityName}
      /> */}

      <TabbyPaymentModal
        cityName={cityName}
        locationStaing={locationStaing}
        onRequestClose={toggleTabbyModal}
        onSuccessFun={e => {
          if (
            `${e}`.toLowerCase() !== 'close' &&
            `${e}`.toLowerCase() !== 'rejected' &&
            `${e}`.toLowerCase() !== 'expired' &&
            `${e}`.toLowerCase() === 'authorized'
          ) {
            lastStepFun(textStrings.installTxt + ' Tabby');
          } else {
            Alert.alert(textStrings.Appname, 'Payment is cancelled');
            toggleTabbyModal();
          }
        }}
        show={openTabbyModal}
      />

      <ARPaymentModal
        onRequestClose={toggleAlRajhiModal}
        show={openAlRajhiPayment}
        onSuccessFun={orderId => {
          lastStepFun(textStrings.installTxt + ' Al-rajhi', orderId);
          toggleAlRajhiModal();
        }}
        onVerifyPayment={orderId => {
          setValidatePayment(orderId);
        }}
      />
      <LoadingModal visibleModal={loadingModal || validate_payment} />
    </>
  );
};

export default CompletePaymentScreen;

const styles = StyleSheet.create({
  textContainer: {
    width: '95%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dashedImage: {
    height: '5%',
    width: '16%',
    resizeMode: 'repeat',
    marginHorizontal: w('2%'),
  },
  flatListHeaderDiv: {
    width: '100%',
    alignSelf: 'center',
    height: h('16%'),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginBottom: h('1.5%'),
  },
  btnMainContainerlist: {
    flex: 1,
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    borderRadius: h('1%'),
    marginHorizontal: w('1%'),
  },
  btnMainContainerlist2: {
    width: '100%',
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    borderRadius: h('1%'),
    marginHorizontal: w('1%'),
  },
  avalblePointBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: h('4%'),
    marginVertical: h('2%'),
  },
  listbtnImageCont: {
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listbtntxtCont: {
    width: '55%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: w('3%'),
  },
  pickercont: {
    width: '100%',
    height: h('12%'),
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  mainConatinerstep2: {
    width: '100%',
    height: h('50%'),
    marginTop: h('2%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    height: '80%',
  },
  filldivCont: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  stepsContainers: {
    width: '90%',
    alignSelf: 'center',
    height: h('8%'),
    // marginTop: h('1%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stepContainer: {
    width: w('15%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: h('1%'),
    borderWidth: 1,
  },
  absolutebelowbtn: {
    width: '100%',
    height: h('22%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  locationInfoShowCont: {
    width: '100%',
    height: h('33%'),
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    marginTop: h('3%'),
  },
  dateContainer: {
    width: '90%',
    alignSelf: 'center',
    height: h('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: h('0.8%'),
  },
  showdataRowCont: {
    width: '90%',
    alignSelf: 'center',
    height: h('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  firstdivbtnCont: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  txtSmalContainer: {
    flex: 1,
  },
});
