// import {
//   ActivityIndicator,
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Linking,
// } from 'react-native';
// import React, { useRef, useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { TabbyPaymentWebView } from 'tabby-react-native-sdk';
// import { maincolor } from '../assets/Colors';
// import { useTranslation } from '../Text/TextStrings';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getChildNodeCount, getDataWithRef, getMYOrders } from '../DataBase/databaseFunction'; // Import getMYOrders
// import {getCreatedDate,tabby_checkout} from '../ScreenView/CommonUtils'

// const TabbyPaymentModal = ({
//   show,
//   onRequestClose,
//   onSuccessFun,
//   locationStaing,
//   cityName,
// }) => {
//   const { textStrings } = useTranslation();
//   const [orderData, setOrderData] = useState('');
//   const [storedUserId, setStoredUserId] = useState(null);
//   const [storedUserDetails, setstoredUserDetails] = useState(null);
//   const { isArabicLanguage, isAuth } = useSelector(state => state.auth);
//   const ctx = useRef({}).current;
//   const { curentOrderProductData } = useSelector(state => state.orderProcess);
//   const { filtersData, oilsData, tireData, batteryData } = useSelector(
//     state => state.project,
//   );

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
//       title: data?.productNameEng,
//       price: data?.originalPrice
//     };
//   };

//   let allProducts = curentOrderProductData?.products;
//   let formattedProducts = allProducts?.map(dat => ({
//     reference_id: dat?.id,
//     category: curentOrderProductData?.productType,
//     title: findTitle(dat?.referance, dat?.id).title,
//     description: findTitle(dat?.referance, dat?.id).title,
//     quantity: dat?.quantity,
//     unit_price: curentOrderProductData.totalPrice,
//   }));

//   const getUserID = async () => {
//     try {
//       const storedId = await AsyncStorage.getItem('userId');
//       if (storedId) {
//         setStoredUserId(storedId);
//       }
//     } catch (error) {
//       console.log("Error retrieving user ID", error);
//     }
//   };

//   const getUserDetails = async () => {
//     try {
//       const storedId = await AsyncStorage.getItem('userId');
//       if (storedId) {
//         const userDetails = await getDataWithRef("user", storedId);
//         setstoredUserDetails(userDetails);
//         console.log("Retrieved user details:", userDetails); // Log user details
//       }
//     } catch (error) {
//       console.log("Error retrieving user ID", error);
//     }
//   };

//   const getcurrentorderdetails = async () => {
//     console.log(`Get current order details ${JSON.stringify(curentOrderProductData, null, 2)}`);
//   };

//   const getOrderHistoryForTabby = useCallback(async () => {
//     if (storedUserId) {
//         const myOrders = await getMYOrders(storedUserId);

//         ctx.tabby_orders = [];

//         if (myOrders) {
//             myOrders.forEach((order) => {
//                 const date = new Date(order.createdAt);

//                 const deliveryInfo = order.deliveryInfo;
//                 console.log(`ssssssss`,deliveryInfo);
//                 const city = deliveryInfo.cityName.split(" ")[0];
//                 const locationName = deliveryInfo.locationName;
//                 const zipMatch = locationName.match(/\b\d{5,6}\b/);

//                 let tabbyOrder = {
//                     purchased_at: date.toISOString().slice(0, 19) + "Z",
//                     amount: order.orderTotalPrice,
//                     status: getTabbyOrderStatus(order.paymentStatus),
//                     buyer: {
//                         email: storedUserDetails?.userEmail,
//                         phone: storedUserDetails?.phoneNumber,
//                         name: storedUserDetails?.name,
//                     },
//                     shipping_address: {
//                         city: city, // Use the city extracted
//                         address: locationName.split(" " + city)[0], // Use locationName up to the city
//                         zip: zipMatch ? zipMatch[0] : "N/A", // Use the six-digit number if found
//                     },
//                 };
//                 ctx.tabby_orders.push(tabbyOrder);
//             });
//         }
//     } else {
//         console.error("User is not authenticated. Cannot fetch orders.");
//     }
// }, [storedUserId, storedUserDetails, ctx]);

//   function getTabbyOrderStatus(status) {
//     if (status === "pending") return "new";
//     else if (status === "canceled") return "canceled";
//     else if (status === "paymentSuccess") return "processing";
//     else if (status === "completed") return "complete";
//     else return "unknown";
//   }

//   useEffect(() => {
//     const fetchUserData = async () => {
//         await getUserID();
//         await getUserDetails();
//         getcurrentorderdetails();
//     };

//     fetchUserData();
// }, []);

//   // Deep Linking Handler
//   useEffect(() => {
//     const handleDeepLink = (event) => {
//       const { url } = event;
//       if (url.includes('result=success')) {
//         console.log('Payment Success');
//         onSuccessFun();
//       } else if (url.includes('result=cancel')) {
//         console.log('Payment Canceled');
//         Alert.alert('Payment canceled');
//       } else if (url.includes('result=failed')) {
//         console.log('Payment Failed');
//         Alert.alert('Payment failed');
//       }
//     };

//     // Linking.addEventListener('url', handleDeepLink);

//     return () => {
//       // Linking.removeEventListener('url', handleDeepLink);
//     };
//   }, []);

//   const createSessionFun = async () => {
//     console.log(`$$$$$$$$$$$$$$$$`, formattedProducts);

//     // Check if the stored user ID is available
//     if (!storedUserId) {
//       console.error('User ID not found');
//       return;
//     }

//     // Get the current order count and increment it
//     let orderCount = await getChildNodeCount('orders');
//     orderCount++;
//     let orderId = `${orderCount.toString().padStart(6, "0")}${getCreatedDate()}`;

//     try {
//       // Retrieve order history for Tabby
//       await getOrderHistoryForTabby();
//       const orderFulladdress = await AsyncStorage.getItem('Orderaddress');
//       console.log(`$$$$$$$$$$`, orderFulladdress);

//       const ordercityName = await AsyncStorage.getItem('OrdercityName');

//       // Prepare the Tabby payment payload
//       const tabbyPaymentPayload = {
//         merchant_code: "ايه سي زيوركسsau",
//         merchant_urls: {
//           success: `myapp://pay?result=success&gateway=tabby`,
//           cancel: `myapp://pay?result=cancel&gateway=tabby`,
//           failure: `myapp://pay?result=failed&gateway=tabby`,
//           webhook: "https://app-xaop4bxqda-uc.a.run.app/tabbyWebhook",
//         },
//         lang: "en",
//         payment: {
//           amount: `${curentOrderProductData.totalPrice}`,
//           currency: "SAR",
//           buyer: {
//             email: storedUserDetails?.userEmail || "",
//             phone: storedUserDetails?.phoneNumber || "",
//             name: storedUserDetails?.name || "",
//           },
//           shipping_address: {
//             city: ordercityName,
//             address: orderFulladdress,
//             zip: orderFulladdress.match(/\b\d{5,6}\b/)?.[0] || null,
//           },
//           buyer_history: {
//             registered_since: "2024-07-19T16:12:34Z",
//             loyalty_level: ctx?.tabby_orders?.length || 0,
//           },
//           order: {
//             reference_id: orderId,
//             items: formatProducts(formattedProducts), // Format the products before sending
//           },
//           order_history: ctx.tabby_orders || [],
//         },
//       };

//       console.log(`Get tabby details ${JSON.stringify(tabbyPaymentPayload, null, 2)}`);

//       // Send the request to Tabby
//       const response = await fetch(tabby_checkout, {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer pk_test_0c164983-e322-4e28-9f9e-27e3dd191a4d',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(tabbyPaymentPayload),
//       });

//       // Handle the response from Tabby
//       const rest = await response.json();

//       if (!response.ok) {
//         console.error('Tabby payment error response:', rest);
//         Alert.alert('Error Occurred', rest?.message || 'Unable to process payment');
//         return;
//       }

//       // Check for valid payment URL
//       if (rest?.configuration?.available_products?.installments[0]?.web_url) {
//         setOrderData(
//           rest?.configuration?.available_products?.installments[0]?.web_url,
//         );
//       } else {
//         console.error('Error: No valid payment URL from Tabby');
//         Alert.alert('Error Occurred', 'Unable to get payment URL');
//       }
//     } catch (error) {
//       console.error('Error creating Tabby payment session:', error);
//       Alert.alert('Error Occurred', 'Unable to process payment');
//     }
//   };

//   // Function to format products before sending
//   const formatProducts = (products) => {
//     if (!products || products.length === 0) {
//       console.error('Formatted products are empty or undefined.');
//       return [];
//     }

//     return products.map(product => ({
//       category: product.category || '',
//       description: product.description || '',
//       quantity: product.quantity || 1,
//       reference_id: product.reference_id || '',
//       title: product.title || '',
//       unit_price: product.unit_price || '0',
//     }));
//   };

//   useEffect(() => {
//     if (show) {
//       createSessionFun();
//     }
//   }, [show, locationStaing, cityName]);

//   return (
//     <Modal visible={show} onRequestClose={onRequestClose}>
//       {orderData.length > 0 ? (
//         <>
//           <SafeAreaView />
//           <TabbyPaymentWebView
//             onResult={onSuccessFun}
//             url={orderData}
//             loadingColor={maincolor}
//             onError={() => {
//               console.error('Error loading payment WebView');
//               onRequestClose();
//               Alert.alert('Payment failed');
//             }}
//             onBack={() => {
//               console.log('User cancelled payment');
//               onRequestClose();
//               Alert.alert('Payment cancelled');
//             }}
//           />
//         </>
//       ) : (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color={maincolor} />
//           <Text style={styles.loadingText}>{textStrings.loading}</Text>
//         </View>
//       )}
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default TabbyPaymentModal;

import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {TabbyPaymentWebView} from 'tabby-react-native-sdk';
import {maincolor} from '../assets/Colors';
import {useTranslation} from '../Text/TextStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getChildNodeCount,
  getDataWithRef,
  getMYOrders,
} from '../DataBase/databaseFunction'; // Import getMYOrders
import {getCreatedDate, tabby_checkout} from '../ScreenView/CommonUtils';

const TabbyPaymentModal = ({
  show,
  onRequestClose,
  onSuccessFun,
  locationStaing,
  cityName,
}) => {
  const {textStrings} = useTranslation();
  const [orderData, setOrderData] = useState('');
  const [storedUserId, setStoredUserId] = useState(null);
  const [storedUserDetails, setstoredUserDetails] = useState(null);
  const {isArabicLanguage, isAuth} = useSelector(state => state.auth);
  const ctx = useRef({}).current;
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    engineOilPetrolData,
    engineOilData,
  } = useSelector(state => state.project);

  const findTitle = (referance, id) => {
    console.log(`Finding title for reference: ${referance}, id: ${id}`);
    const data =
      referance === 'Filters'
        ? filtersData.find(dat => dat.id === id)
        : referance === 'engineOilPetrol'
        ? engineOilPetrolData.find(dat => dat.id === id)
        : referance === 'Oils'
        ? oilsData.find(dat => dat.id === id)
        : referance === 'Tyres'
        ? tireData.find(dat => dat.id === id)
        : referance === 'btteries'
        ? batteryData.find(dat => dat.id === id)
        : referance === 'engineOil'
        ? engineOilData.find(dat => dat.id === id)
        : {};
    // referance === 'Filters'
    //   ? filtersData.find(dat => dat.id === id)
    //   : referance === 'Oils'
    //   ? oilsData.find(dat => dat.id === id)
    //   : referance === 'Tyres'
    //   ? tireData.find(dat => dat.id === id)
    //   : referance === 'btteries'
    //   ? batteryData.find(dat => dat.id === id)
    //   : {};

    return {
      title: data?.productNameEng,
      price: data?.originalPrice,
    };
  };

  let allProducts = curentOrderProductData?.products;
  let formattedProducts = allProducts?.map(dat => {
    const titleData = findTitle(dat?.referance, dat?.id);
    console.log(`Formatted product: ${JSON.stringify(titleData)}`);
    return {
      reference_id: dat?.id,
      category: curentOrderProductData?.productType,
      title: titleData.title,
      description: titleData.title,
      quantity: dat?.quantity,
      unit_price: curentOrderProductData.totalPrice,
    };
  });

  const getUserID = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      if (storedId) {
        setStoredUserId(storedId);
        console.log(`Retrieved user ID: ${storedId}`);
      }
    } catch (error) {
      console.log('Error retrieving user ID', error);
    }
  };

  const getUserDetails = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      console.log(storedId, 'uuuuuu');

      if (storedId) {
        const userDetails = await getDataWithRef('user', storedId);
        setstoredUserDetails(userDetails);
        console.log('Retrieved user details:', userDetails);
      }
    } catch (error) {
      console.log('Error retrieving user details', error);
    }
  };

  const getcurrentorderdetails = async () => {
    console.log(
      `Get current order details ${JSON.stringify(
        curentOrderProductData,
        null,
        2,
      )}`,
    );
  };

  const getOrderHistoryForTabby = useCallback(async () => {
    console.log(`Fetching order history for user ID: ${storedUserId}`);
    if (storedUserId) {
      const myOrders = await getMYOrders(storedUserId);
      ctx.tabby_orders = [];

      if (myOrders) {
        myOrders.forEach(order => {
          const date = new Date(order.createdAt);
          const deliveryInfo = order.deliveryInfo;
          console.log(`Order delivery info: ${JSON.stringify(deliveryInfo)}`);
          const city = deliveryInfo.cityName.split(' ')[0];
          const locationName = deliveryInfo.locationName;
          const zipMatch = locationName.match(/\b\d{5,6}\b/);

          let tabbyOrder = {
            purchased_at: date.toISOString().slice(0, 19) + 'Z',
            amount: order.orderTotalPrice,
            status: getTabbyOrderStatus(order.paymentStatus),
            buyer: {
              email: storedUserDetails?.userEmail,
              phone: storedUserDetails?.phoneNumber,
              name: storedUserDetails?.name,
            },
            shipping_address: {
              city: city,
              address: locationName.split(' ' + city)[0],
              zip: zipMatch ? zipMatch[0] : 'N/A',
            },
          };
          ctx.tabby_orders.push(tabbyOrder);
          console.log(`Tabby order added: ${JSON.stringify(tabbyOrder)}`);
        });
      }
    } else {
      console.error('User is not authenticated. Cannot fetch orders.');
    }
  }, [storedUserId, storedUserDetails, ctx]);

  function getTabbyOrderStatus(status) {
    console.log(`Getting Tabby order status for: ${status}`);
    if (status === 'pending') return 'new';
    else if (status === 'canceled') return 'canceled';
    else if (status === 'paymentSuccess') return 'processing';
    else if (status === 'completed') return 'complete';
    else return 'unknown';
  }

  useEffect(() => {
    const fetchUserData = async () => {
      await getUserID();
      await getUserDetails();
      getcurrentorderdetails();
    };

    fetchUserData();
  }, []);

  // Deep Linking Handler
  useEffect(() => {
    const handleDeepLink = event => {
      const {url} = event;
      console.log(`Deep link URL: ${url}`);
      if (url.includes('result=success')) {
        console.log('Payment Success');
        onSuccessFun();
      } else if (url.includes('result=cancel')) {
        console.log('Payment Canceled');
        Alert.alert('Payment canceled');
      } else if (url.includes('result=failed')) {
        console.log('Payment Failed');
        Alert.alert('Payment failed');
      }
    };

    return () => {};
  }, []);

  const createSessionFun = async () => {
    console.log(
      `Creating session with formatted products: ${JSON.stringify(
        formattedProducts,
      )}`,
    );

    if (!storedUserId) {
      console.error('User ID not found');
      return;
    }

    let orderCount = await getChildNodeCount('orders');
    orderCount++;
    let orderId = `${orderCount
      .toString()
      .padStart(6, '0')}${getCreatedDate()}`;

    try {
      await getOrderHistoryForTabby();
      const orderFulladdress = await AsyncStorage.getItem('Orderaddress');
      console.log(`Order full address: ${orderFulladdress}`);

      const ordercityName = await AsyncStorage.getItem('OrdercityName');
      console.log(`Order city name: ${ordercityName}`);

      const tabbyPaymentPayload = {
        merchant_code: 'ايه سي زيوركسsau',
        merchant_urls: {
          success: `myapp://pay?result=success&gateway=tabby`,
          cancel: `myapp://pay?result=cancel&gateway=tabby`,
          failure: `myapp://pay?result=failed&gateway=tabby`,
          webhook: 'https://app-xaop4bxqda-uc.a.run.app/tabbyWebhook',
        },
        lang: 'en',
        payment: {
          amount: `${curentOrderProductData.totalPrice}`,
          currency: 'SAR',
          buyer: {
            email: storedUserDetails?.userEmail || '',
            phone: storedUserDetails?.phoneNumber || '',
            name: storedUserDetails?.name || '',
          },
          shipping_address: {
            city: ordercityName,
            address: orderFulladdress,
            zip: orderFulladdress.match(/\b\d{5,6}\b/)?.[0] || null,
          },
          buyer_history: {
            registered_since: '2024-07-19T16:12:34Z',
            loyalty_level: ctx?.tabby_orders?.length || 0,
          },
          order: {
            reference_id: orderId,
            items: formatProducts(formattedProducts),
          },
          order_history: ctx.tabby_orders || [],
        },
      };

      console.log(
        `Tabby payment payload: ${JSON.stringify(
          tabbyPaymentPayload,
          null,
          2,
        )}`,
      );

      const response = await fetch(tabby_checkout, {
        method: 'POST',
        headers: {
          //live key : pk_9a8d0e25-398c-4627-acbd-11ac85c3d795
          //test : pk_test_0c164983-e322-4e28-9f9e-27e3dd191a4d
          Authorization: 'Bearer pk_9a8d0e25-398c-4627-acbd-11ac85c3d795',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tabbyPaymentPayload),
      });

      const rest = await response.json();
      console.log(`Tabby response: ${JSON.stringify(rest, null, 2)}`);

      if (rest.status === 'rejected') {
        const {rejection_reason_code} = rest;
        if (rejection_reason_code === 'not_enough_limit') {
          Alert.alert(
            textStrings.Payment_Error,
            textStrings.tabbyNoEnoughLimit,
            [{text: 'OK', onPress: () => onRequestClose()}],
          );
          return;
        } else if (rejection_reason_code === 'order_amount_too_high') {
          Alert.alert(
            textStrings.Payment_Error,
            textStrings.tabbyOrderHighError,
            [{text: 'OK', onPress: () => onRequestClose()}],
          );
        } else if (rejection_reason_code === 'order_amount_too_low') {
          Alert.alert(textStrings.Payment_Error, textStrings.tabbyTooLowError, [
            {text: 'OK', onPress: () => onRequestClose()},
          ]);
        } else if (rejection_reason_code === 'not_available') {
          Alert.alert(
            textStrings.Payment_Error,
            'Tabby payment method is not available for this customer.',
            [{text: 'OK', onPress: () => onRequestClose()}],
          );
        } else {
          Alert.alert(
            textStrings.Payment_Error,
            textStrings.tabbyGeneralError,
            [{text: 'OK', onPress: () => onRequestClose()}],
          );
        }
        return;
      }

      if (!response.ok) {
        console.error('Tabby payment error response:', rest);
        Alert.alert(
          'Error Occurred',
          rest?.message || 'Unable to process payment',
        );
        return;
      }

      if (rest?.configuration?.available_products?.installments[0]?.web_url) {
        setOrderData(
          rest.configuration.available_products.installments[0].web_url,
        );
      } else {
        console.error('Error: No valid payment URL from Tabby');
        Alert.alert('Error Occurred', 'Unable to get payment URL');
      }
    } catch (error) {
      console.error('Error creating Tabby payment session:', error);
      Alert.alert('Error Occurred', 'Unable to process payment');
    }
  };

  const formatProducts = products => {
    if (!products || products.length === 0) {
      console.error('Formatted products are empty or undefined.');
      return [];
    }

    return products.map(product => ({
      category: product.category || '',
      description: product.description || '',
      quantity: product.quantity || 1,
      reference_id: product.reference_id || '',
      title: product.title || '',
      unit_price: product.unit_price || '0',
    }));
  };

  useEffect(() => {
    if (show) {
      console.log('Showing Tabby payment modal');
      createSessionFun();
    }
  }, [show, locationStaing, cityName]);

  return (
    <Modal visible={show} onRequestClose={onRequestClose}>
      {orderData.length > 0 ? (
        <>
          <SafeAreaView />
          <TabbyPaymentWebView
            onResult={onSuccessFun}
            url={orderData}
            loadingColor={maincolor}
            onError={() => {
              console.error('Error loading payment WebView');
              onRequestClose();
              Alert.alert('Payment failed');
            }}
            onBack={() => {
              console.log('User cancelled payment');
              onRequestClose();
              Alert.alert('Payment cancelled');
            }}
          />
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={maincolor} />
          <Text style={styles.loadingText}>{textStrings.loading}</Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default TabbyPaymentModal;
