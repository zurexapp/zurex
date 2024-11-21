// import {
//   ActivityIndicator,
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {useSelector} from 'react-redux';
// import {TamaraCheckoutURL} from 'react-native-tamara-sdk';
// import {useTranslation} from '../Text/TextStrings';

// const TamaraPaymentModal = ({
//   show,
//   onRequestClose,
//   onSuccessFun,
//   locationStaing,
//   cityName,
// }) => {
//   const [orderData, setorderData] = useState({
//     checkout_id: '',
//     checkout_url: '',
//     order_id: '',
//     status: '',
//   });
//   const {isArabicLanguage} = useSelector(state => state.auth);
//   const {textStrings} = useTranslation();
//   const {isAuth} = useSelector(state => state.auth);
//   const {curentOrderProductData, orderProcessName} = useSelector(
//     state => state.orderProcess,
//   );
//   const {filtersData, oilsData, tireData, batteryData} = useSelector(
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
//       title: data?.productNameEng
//         ? data?.productNameEng
//         : textStrings?.productHasBeenDeleted,
//       price: data?.originalPrice ? data.originalPrice : 0,
//     };
//   };
//   let allProducts = curentOrderProductData?.products;
//   let formattedProducts = allProducts?.map(dat => {
//     return {
//       reference_id: dat?.id,
//       type: curentOrderProductData?.productType,
//       name: findTitle(dat?.referance, dat?.id).title,
//       sku: dat?.id,
//       quantity: dat?.quantity,
//       total_amount: {
//         amount: `${findTitle(dat?.referance, dat?.id).price}`,
//         currency: 'SAR',
//       },
//     };
//   });
//   //   isAuth?.phoneNumber?.includes('+966')
//   //     ? `${isAuth?.phoneNumber}`.slice(4, isAuth?.phoneNumber?.length)
//   //     : isAuth?.phoneNumber;
//   const createSessionFun = async () => {
//     const payload = {
//       order_reference_id: `${Date.now()}`,
//       total_amount: {
//         amount: curentOrderProductData.totalPrice,
//         currency: 'SAR',
//       },
//       locale: isArabicLanguage ? 'ar_SA' : 'en_US',
//       description: 'string',
//       country_code: 'SA',
//       payment_type: 'PAY_BY_INSTALMENTS',
//       items: formattedProducts,
//       consumer: {
//         first_name: isAuth?.name,
//         last_name: isAuth?.name,
//         phone_number: isAuth?.phoneNumber,
//         email: isAuth?.userEmail,
//       },

//       shipping_address: {
//         first_name: isAuth?.name,
//         last_name: isAuth?.name,
//         line1: locationStaing,
//         city: cityName,
//         country_code: 'SA',
//         phone_number: isAuth?.phoneNumber,
//       },

//       tax_amount: {
//         amount: '0.00',
//         currency: 'SAR',
//       },
//       shipping_amount: {
//         amount: '0.00',
//         currency: 'SAR',
//       },
//       merchant_url: {
//         success: 'https://example.com/checkout/success',
//         failure: 'https://example.com/checkout/failure',
//         cancel: 'https://example.com/checkout/cancel',
//         notification: 'https://example.com/payments/tamarapay',
//       },
//     };
//     setorderData({checkout_id: '', checkout_url: '', order_id: '', status: ''});
//     fetch('https://api-sandbox.tamara.co/checkout', {
//       method: 'POST',
//       headers: new Headers({
//         Authorization:
//           'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJkYTkwNWQwYi02NzNiLTQxNzAtODRiYi05NTAxYWQzNDhmMGIiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiM2JiNGI2ZDExM2ZjZjc2ODkyMjI2NDFkY2I1NjQ5MjMiLCJpYXQiOjE2ODQ0MTY3NTgsImlzcyI6IlRhbWFyYSJ9.JLMafk_rpUg8JfK0wMKRRwJnH1WE6x-AOtcEOPmHynY2f-4nnU8KnzV3CqlOriM_7x_CCC2wh4EBSHvONpqkm_WEUQrf1KyyaDq4sRCJ--P18LjRXMNRiAEez2wTpmnHwNnxWuCfTWjNsAU286mOmB3ebRULdwzBUShcnXwJafo6ZE1huT0_4BK6FVqdmjWbxztVFL0L5hH10NipKzTCkJkoeStPk69mykMMlfIGmmbwc-OGMGjr8PlJPWCmFEu6L2Usy7y-d2orhfKj2VC7VbrI6sC8RoYkF50V1L2VMF89QmhLXwbXd6guNLQNJuZAXQtKgDMdCCzJUZLGcvUJJQ',
//         'Content-Type': 'application/json',
//       }),
//       body: JSON.stringify(payload),
//     })
//       .then(resp => resp.json())
//       .then(rest => {
//         setorderData(rest);
//         console.log(rest);
//       })
//       .catch(e => console.log('error', e));
//   };

//   useEffect(() => {
//     if (show) {
//       createSessionFun();
//     }
//   }, [locationStaing, cityName, show]);
//   return (
//     <Modal visible={show} onRequestClose={onRequestClose}>
//       {orderData.checkout_url ? (
//         <>
//           <SafeAreaView />

//           <TamaraCheckoutURL
//             checkoutURL={`${orderData.checkout_url}`}
//             cancelURL="https://example.com/checkout/cancel"
//             failURL="https://example.com/checkout/failure"
//             successURL="https://example.com/checkout/success"
//             onSuccess={onSuccessFun}
//             onFail={() => {
//               Alert.alert('Payment failed');
//               onRequestClose();
//             }}
//             onCancel={() => {
//               Alert.alert('Payment cancel');
//               onRequestClose();
//             }}
//           />
//         </>
//       ) : (
//         <View
//           style={{
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//           }}>
//           <ActivityIndicator size={'large'} color={'red'} />
//         </View>
//       )}
//     </Modal>
//   );
// };

// export default TamaraPaymentModal;

// const styles = StyleSheet.create({});
