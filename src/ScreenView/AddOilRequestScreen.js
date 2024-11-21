// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import {w, h} from 'react-native-responsiveness';
// import OrderPriceCalculator from '../Components/OrderPriceCalculator';
// import {greencolor, maincolor} from '../assets/Colors';
// import AppBtn from '../Components/AppBtn';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import {useSelector, useDispatch} from 'react-redux';
// import {setCurentOrderProductData} from '../store/orderProcessSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {WebView} from 'react-native-webview'; // Add this import

// const AddOilRequestScreen = ({route, navigation}) => {
//   const {textStrings} = useTranslation();
//   const dispatch = useDispatch();
//   const [isSelectedExam, setIsSelectedExam] = useState(false);
//   const {isAuth} = useSelector(state => state.auth);
//   const SUBSCRIPTION_FEE = 100;

//   //   <WebView
//   //   source={{
//   //     html: `
//   //       <html>
//   //         <head>
//   //           <script src="https://checkout.tabby.ai/tabby-promo.js" async></script>
//   //         </head>
//   //         <body>
//   //           <div id="TabbyPromo" class="tabby-promo center" style="margin-top: 12px; display: flex; align-items: center; justify-content: center;"></div>
//   //         </body>
//   //       </html>
//   //     `,
//   //   }}
//   //   style={{
//   //     marginTop: h('2%'),
//   //     height: 200, // Adjust the height based on your design
//   //     backgroundColor: 'transparent',
//   //   }}
//   // />

//   // Redux state selectors
//   const {
//     filtersData,
//     oilsData,
//     engineOilPetrolData,
//     tireData,
//     batteryData,
//     engineOilData,
//   } = useSelector(state => state.project);
//   const {curentOrderProductData, orderProcessName} = useSelector(
//     state => state.orderProcess,
//   );

//   const {selectedProducts} = route.params;
//   const {selectedBattery} = route.params;

//   useEffect(() => {}, [selectedProducts]);

//   const preferdProductsList = curentOrderProductData.products;

//   const findProductPrice = (data, id, type) => {
//     const filtered = data.find(item => item.id === id);
//     if (!filtered) return {price: 0, discountPrice: 0};
//     const basePrice = filtered.originalPrice || 0;
//     const value = type === 'commercial' ? filtered?.commercialPrice : basePrice;
//     const discountPrice = filtered.discountPrice || 0;
//     return {price: value, discountPrice};
//   };

//   const calculatePrice = () => {
//     let finalPrice = 0;
//     let totalDiscount = 0;
//     preferdProductsList?.forEach(item => {
//       const quantity = parseInt(item.quantity, 10) || 1;
//       const dataSource =
//         item.referance === 'Filters'
//           ? filtersData
//           : item.referance === 'Oils'
//           ? oilsData
//           : item.referance === 'engineOilPetrol'
//           ? engineOilPetrolData
//           : item.referance === 'Tyres'
//           ? tireData
//           : item.referance === 'btteries'
//           ? batteryData
//           : item.referance === 'engineOil'
//           ? engineOilData
//           : [];
//       const {price, discountPrice} = findProductPrice(
//         dataSource,
//         item.id,
//         item.type,
//       );
//       finalPrice += price * quantity;
//       if (discountPrice > 0) {
//         totalDiscount += (price - discountPrice) * quantity;
//       }
//       // Removed the else block that resets totalDiscount to 0
//     });
//     return {finalPrice, totalDiscount};
//   };

//   const findTaxFn = subtotal => {
//     return parseFloat(((15 / 100) * subtotal).toFixed(2));
//   };

//   const {finalPrice, totalDiscount} = calculatePrice();

//   const price = finalPrice;
//   const serviceCharge = 0;
//   const subscriptionFee = isSelectedExam ? SUBSCRIPTION_FEE : 0;
//   const discount = totalDiscount;

//   const subtotal = price + serviceCharge + subscriptionFee - discount;

//   const taxPrice = findTaxFn(subtotal);
//   const totalPrice = subtotal + taxPrice;

//   const handleConfirmOrder = async () => {
//     if (finalPrice <= 0) {
//       Alert.alert(
//         textStrings.productTitleEror,
//         textStrings.productNotSelectedFlowEror,
//       );
//     } else {
//       await dispatch(
//         setCurentOrderProductData({
//           curentOrderProductData: {
//             ...curentOrderProductData,
//             orderPrice: subtotal,
//             taxPrice: taxPrice,
//             totalPrice: totalPrice,
//             freeServicesCount: isSelectedExam ? 2 : 0,
//             warentyEnabled: isSelectedExam,
//           },
//         }),
//       );

//       try {
//         const storedUserId = await AsyncStorage.getItem('userId');
//         console.log(storedUserId);

//         if (storedUserId) {
//           navigation.navigate('CompletePaymentScreen');
//         } else {
//           navigation.navigate('Login', {
//             routeName: 'CompletePaymentScreen',
//           });
//         }
//       } catch (error) {
//         console.error(error, 'Error fetching user ID');
//         // Navigate to Login in case of error
//         navigation.navigate('Login', {
//           routeName: 'CompletePaymentScreen',
//         });
//       }
//     }
//   };

//   const submitBtnFun = async () => {
//     handleConfirmOrder();
//   };
//   // Inject JavaScript for the Tabby promo
//   const injectedJavaScript = `
//     (function() {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.tabby.ai/tabby-promo.js';
//       script.async = true;
//       script.onload = function() {
//         new window.TabbyPromo({
//           selector: '#TabbyPromo',
//           currency: 'AED',
//           price: ${totalPrice.toFixed(2)},  // Dynamically pass the price
//           installmentsCount: 4,
//           lang: 'en',
//           source: 'product',
//           publicKey: 'YOUR_PUBLIC_API_KEY',
//           merchantCode: 'YOUR_MERCHANT_CODE',
//         });
//       };
//       script.onerror = function() {
//         console.error("Tabby promo script failed to load.");
//       };
//       document.body.appendChild(script);
//     })();
//     true; // Ensure WebView renders properly
//   `;

//   // Check if WebView is loading properly
//   const handleNavigationStateChange = state => {
//     if (state.loading === false) {
//       console.log('WebView loaded, running injected JavaScript');
//     }
//   };

//   return (
//     <View style={styles.fillscreenbg}>
//       <CurvedHeaderComp
//         name={textStrings.myOrder}
//         iconName1={'left'}
//         firstbtnFun={() => navigation.goBack()}
//         secbtnFun={() => console.log('next')}
//         reddot={false}
//       />
//       <View style={styles.otherContent}>
//         <ScrollView>
//           {orderProcessName !== 'oilFilter' && (
//             <TouchableOpacity
//               onPress={() => setIsSelectedExam(!isSelectedExam)}
//               style={styles.mainbtndivsel}>
//               {/* <View
//                 style={{
//                   ...styles.mainbtndiviconcont,
//                   backgroundColor: isSelectedExam
//                     ? greencolor
//                     : 'rgba(0,0,0,0.3)',
//                 }}>
//                 <Icon name="done" size={h('2.7%')} color={'white'} />
//               </View> */}
//               {/* <Text
//                 style={{
//                   ...TextStyles.addoilreqmainbtndivseltxt,
//                   textAlign: 'left',
//                   color: isSelectedExam ? greencolor : 'rgba(0,0,0,0.5)',
//                 }}>
//                 {textStrings.addWarentytxt}
//               </Text> */}
//             </TouchableOpacity>
//           )}
//           {isSelectedExam && (
//             <View
//               style={{
//                 ...styles.mainbtndivsel,
//                 justifyContent: 'center',
//                 marginTop: h('1%'),
//               }}>
//               <Text
//                 style={{
//                   ...TextStyles.addoilreqmainbtndivseltxt,
//                   textAlign: 'center',
//                   color: maincolor,
//                 }}>
//                 {textStrings.saved25SS}
//               </Text>
//             </View>
//           )}
//           <OrderPriceCalculator
//             taxesdat={[
//               {
//                 name: textStrings.priceTxt,
//                 price: price.toFixed(2),
//                 id: 0,
//               },
//               {
//                 name: textStrings.wagesTxt,
//                 price: serviceCharge.toFixed(2),
//                 id: 1,
//               },
//               {
//                 name: textStrings.taxTxt,
//                 price: taxPrice.toFixed(2),
//                 id: 2,
//               },
//               ...(discount > 0
//                 ? [
//                     {
//                       name: textStrings.discountTxt,
//                       price: discount.toFixed(2),
//                       id: 4,
//                     },
//                   ]
//                 : []),
//               ...(isSelectedExam
//                 ? [
//                     {
//                       name: textStrings.subscriptionTxt,
//                       price: subscriptionFee.toFixed(2),
//                       id: 3,
//                     },
//                   ]
//                 : []),
//             ]}
//             total={totalPrice.toFixed(2)}
//             selectedProducts={selectedProducts}
//           />

//           <AppBtn title={textStrings.completeOrder} clickfun={submitBtnFun} />
//         </ScrollView>
//         {/* Tabby WebView for Promo */}
//         <WebView
//   source={{
//     html: `
//       <html>
//         <head>
//           <script src="https://checkout.tabby.ai/tabby-promo.js" async></script>
//         </head>
//         <body>
//           <div style="display: flex; align-items: center; justify-content: center; padding: 10px;">
//             <!-- Container with border for the promo and text -->
//             <div style="display: flex; align-items: center; border: 1px solid #ccc; padding: 10px; border-radius: 8px;">
//               <div id="TabbyPromo" class="tabby-promo" style="margin-right: 10px;"></div>
//               <!-- Custom Text next to the promo -->
//               <p style="font-size: 24px; color: #000; margin: 0; font-weight: bold;">
//                 Enjoy easy installments with Tabby! Pay in 4 interest-free installments.
//               </p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `,
//   }}
//   originWhitelist={['*']} // Ensure WebView accepts all origins
//   javaScriptEnabled={true} // Enable JavaScript to run scripts
//   domStorageEnabled={true} // Enable DOM Storage if needed
//   injectedJavaScript={injectedJavaScript} // Inject the Tabby script
//   style={{
//     marginTop: h('2%'),
//     height: 200, // Maintain the original height
//     backgroundColor: 'transparent',
//   }}
//   onNavigationStateChange={handleNavigationStateChange}
// />
//       </View>
//     </View>
//   );
// };

// export default AddOilRequestScreen;

// const styles = StyleSheet.create({
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   otherContent: {
//     width: '100%',
//     flex: 1,
//   },
//   mainbtndivsel: {
//     width: w('90%'),
//     alignSelf: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   mainbtndiviconcont: {
//     height: h('4.2%'),
//     width: h('4.2%'),
//     borderRadius: h('7%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import OrderPriceCalculator from '../Components/OrderPriceCalculator';
import {greencolor, maincolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useSelector, useDispatch} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview'; // Add this import
import {TabbyProductPageSnippet} from 'tabby-react-native-sdk';

const AddOilRequestScreen = ({route, navigation}) => {
  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const [isSelectedExam, setIsSelectedExam] = useState(false);
  const {isAuth} = useSelector(state => state.auth);
  const SUBSCRIPTION_FEE = 100;

  // Redux state selectors
  const {
    filtersData,
    oilsData,
    engineOilPetrolData,
    tireData,
    batteryData,
    engineOilData,
  } = useSelector(state => state.project);
  const {curentOrderProductData, orderProcessName} = useSelector(
    state => state.orderProcess,
  );

  const {selectedProducts} = route.params;
  const {selectedBattery} = route.params;

  const preferdProductsList = curentOrderProductData.products;

  const findProductPrice = (data, id, type) => {
    const filtered = data.find(item => item.id === id);
    if (!filtered) return {price: 0, discountPrice: 0};
    const basePrice = filtered.originalPrice || 0;
    const value = type === 'commercial' ? filtered?.commercialPrice : basePrice;
    const discountPrice = filtered.discountPrice || 0;
    return {price: value, discountPrice};
  };

  const calculatePrice = () => {
    let finalPrice = 0;
    let totalDiscount = 0;
    preferdProductsList?.forEach(item => {
      const quantity = parseInt(item.quantity, 10) || 1;
      const dataSource =
        item.referance === 'Filters'
          ? filtersData
          : item.referance === 'Oils'
          ? oilsData
          : item.referance === 'engineOilPetrol'
          ? engineOilPetrolData
          : item.referance === 'Tyres'
          ? tireData
          : item.referance === 'btteries'
          ? batteryData
          : item.referance === 'engineOil'
          ? engineOilData
          : [];
      const {price, discountPrice} = findProductPrice(
        dataSource,
        item.id,
        item.type,
      );
      finalPrice += price * quantity;
      if (discountPrice > 0) {
        totalDiscount += (price - discountPrice) * quantity;
      }
    });
    return {finalPrice, totalDiscount};
  };

  const findTaxFn = subtotal => {
    return parseFloat(((15 / 100) * subtotal).toFixed(2));
  };

  const {finalPrice, totalDiscount} = calculatePrice();

  const price = finalPrice;
  const serviceCharge = 0;
  const subscriptionFee = isSelectedExam ? SUBSCRIPTION_FEE : 0;
  const discount = totalDiscount;

  const subtotal = price + serviceCharge + subscriptionFee - discount;

  const taxPrice = findTaxFn(subtotal);
  const totalPrice = subtotal + taxPrice;

  const handleConfirmOrder = async () => {
    if (finalPrice <= 0) {
      Alert.alert(
        textStrings.productTitleEror,
        textStrings.productNotSelectedFlowEror,
      );
    } else {
      await dispatch(
        setCurentOrderProductData({
          curentOrderProductData: {
            ...curentOrderProductData,
            orderPrice: subtotal,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
            freeServicesCount: isSelectedExam ? 2 : 0,
            warentyEnabled: isSelectedExam,
          },
        }),
      );

      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log(storedUserId);

        if (storedUserId) {
          navigation.navigate('CompletePaymentScreen');
        } else {
          navigation.navigate('Login', {
            routeName: 'CompletePaymentScreen',
          });
        }
      } catch (error) {
        console.error(error, 'Error fetching user ID');
        // Navigate to Login in case of error
        navigation.navigate('Login', {
          routeName: 'CompletePaymentScreen',
        });
      }
    }
  };

  const submitBtnFun = async () => {
    handleConfirmOrder();
  };

  // Check if WebView is loading properly
  const handleNavigationStateChange = state => {
    if (state.loading === false) {
      console.log('WebView loaded, running injected JavaScript');
    }
  };

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.myOrder}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
        secbtnFun={() => console.log('next')}
        reddot={false}
      />
      <View style={styles.otherContent}>
        <ScrollView>
          {orderProcessName !== 'oilFilter' && (
            <TouchableOpacity
              onPress={() => setIsSelectedExam(!isSelectedExam)}
              style={styles.mainbtndivsel}>
              {/* <View
                style={{
                  ...styles.mainbtndiviconcont,
                  backgroundColor: isSelectedExam
                    ? greencolor
                    : 'rgba(0,0,0,0.3)',
                }}>
                <Icon name="done" size={h('2.7%')} color={'white'} />
              </View> */}
              {/* <Text
                style={{
                  ...TextStyles.addoilreqmainbtndivseltxt,
                  textAlign: 'left',
                  color: isSelectedExam ? greencolor : 'rgba(0,0,0,0.5)',
                }}>
                {textStrings.addWarentytxt}
              </Text> */}
            </TouchableOpacity>
          )}
          {isSelectedExam && (
            <View
              style={{
                ...styles.mainbtndivsel,
                justifyContent: 'center',
                marginTop: h('1%'),
              }}>
              <Text
                style={{
                  ...TextStyles.addoilreqmainbtndivseltxt,
                  textAlign: 'center',
                  color: maincolor,
                }}>
                {textStrings.saved25SS}
              </Text>
            </View>
          )}
          <OrderPriceCalculator
            taxesdat={[
              {
                name: textStrings.priceTxt,
                price: price.toFixed(2),
                id: 0,
              },
              {
                name: textStrings.wagesTxt,
                price: serviceCharge.toFixed(2),
                id: 1,
              },
              {
                name: textStrings.taxTxt,
                price: taxPrice.toFixed(2),
                id: 2,
              },
              ...(discount > 0
                ? [
                    {
                      name: textStrings.discountTxt,
                      price: discount.toFixed(2),
                      id: 4,
                    },
                  ]
                : []),
              ...(isSelectedExam
                ? [
                    {
                      name: textStrings.subscriptionTxt,
                      price: subscriptionFee.toFixed(2),
                      id: 3,
                    },
                  ]
                : []),
            ]}
            total={totalPrice.toFixed(2)}
            selectedProducts={selectedProducts}
          />

          <AppBtn title={textStrings.completeOrder} clickfun={submitBtnFun} />
        </ScrollView>
        {/* Alternatively, use TabbyProductPageSnippet */}
        <TabbyProductPageSnippet
          lang={'en'} // Arabic Language
          currency="AED" // Currency
          price={totalPrice.toFixed(2)} // Product Price
          //  maxLimit={"5000.00"}  // Optional Max Limit
          priceTextStyle={{
            fontSize: 12,
            fontFamily: 'Cairo',
          }}
          currencyTextStyle={{
            fontSize: 14,
            fontFamily: 'Inter',
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: 'Courier',
          }}
          containerStyle={{
            elevation: 3,
            shadowColor: '#000000',
          }}
          withCurrencyInArabic={true} // Optionally display currency in Arabic
        />
      </View>
    </View>
  );
};

export default AddOilRequestScreen;

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
  mainbtndivsel: {
    width: w('90%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainbtndiviconcont: {
    height: h('4.2%'),
    width: h('4.2%'),
    borderRadius: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
