// import {
//   ActivityIndicator,
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import WebView from 'react-native-webview';
// import {useTranslation} from '../Text/TextStrings';
// import {useSelector} from 'react-redux';
// import CryptoJS from 'react-native-crypto-js';
// import TextStyles from '../Text/TextStyles';
// import {w, h} from 'react-native-responsiveness';
// import Icon2 from 'react-native-vector-icons/AntDesign';
// import {textcolor} from '../assets/Colors';
// import {
//   alrahhi_terminal_resource_key,
//   alrajhi_payment_page,
//   alrahhi_transportal_id,
//   alrahhi_transportal_pwd,
//   alrajhi_create_session,
//   getCreatedDate,
// } from '../ScreenView/CommonUtils';
// import {getChildNodeCount} from '../DataBase/databaseFunction';

// const ARPaymentModal = ({
//   show,
//   onRequestClose,
//   onSuccessFun,
//   onVerifyPayment,
// }) => {
//   const {textStrings} = useTranslation();
//   const [hasNavigatedToCancel, setHasNavigatedToCancel] = useState(false);
//   const ctx = useRef({}).current;

//   const {curentOrderProductData, orderProcessName} = useSelector(
//     state => state.orderProcess,
//   );

//   const [isLoading, setisLoading] = useState(false);
//   const [paymentId, setpaymentId] = useState('');

//   function generateRandomNumber(length) {
//     let randomNumber = '';
//     for (let i = 0; i < length; i++) {
//       randomNumber += Math.floor(Math.random() * 10);
//     }
//     return randomNumber;
//   }

//   const aesEncrypt = (trandata, key) => {
//     const iv = 'PGKEYENCDECIVSPC';
//     const enckey = CryptoJS.enc.Utf8.parse(key);
//     const rkEncryptionIv = CryptoJS.enc.Utf8.parse(iv);

//     // Encrypt using AES in CBC mode
//     const encryptedData = CryptoJS.AES.encrypt(trandata, enckey, {
//       iv: rkEncryptionIv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     // Convert the encrypted data to hexadecimal representation
//     const encryptedHex = encryptedData.ciphertext.toString(CryptoJS.enc.Hex);
//     return encryptedHex;
//   };

//   const webHookLink =
//     'https://app-xaop4bxqda-uc.a.run.app/alrajhiPaymentUpdate';
//   // const webHookLink = "https://us-central1-aczurex-d4b61.cloudfunctions.net/app/alrajhiPaymentUpdate"

//   function getMyData() {
//     // let orderCount = await getChildNodeCount('orders');
//     let orderId = generateRandomNumber(6) + `${getCreatedDate()}`;
//     ctx.orderId = orderId;
//     const myData = [
//       {
//         id: alrahhi_transportal_id,
//         password: alrahhi_transportal_pwd,
//         action: '1',
//         udf1: orderId,
//         currencyCode: '682',
//         trackId: `${generateRandomNumber(9)}`,
//         amt: `${curentOrderProductData?.totalPrice}`,
//         responseURL: webHookLink,
//         errorURL: webHookLink,
//       },
//     ];
//     return myData;
//   }

//   const createTheAlrajhiSession = async () => {
//     try {
//       setisLoading(true);
//       const data = getMyData();
//       const encryptedData = aesEncrypt(
//         JSON.stringify(data),
//         alrahhi_terminal_resource_key,
//       );
//       const response = await fetch(alrajhi_create_session, {
//         method: 'POST',
//         headers: new Headers({
//           'Content-Type': 'application/json; charset=utf-8',
//         }),
//         body: JSON.stringify([
//           {
//             id: alrahhi_transportal_id,
//             trandata: `${encryptedData}`,
//             responseURL: webHookLink,
//             errorURL: webHookLink,
//           },
//         ]),
//       });
//       const rest = await response.json();
//       if (rest[0]?.error) {
//         Alert.alert(
//           textStrings.productTitleEror,
//           `Error occured with code ${rest[0]?.error}`,
//         );
//         onRequestClose();
//       } else {
//         const fetchResult = `${rest[0]?.result}`.split(
//           `:${alrajhi_payment_page}`,
//         )[0];
//         setpaymentId(fetchResult);
//       }

//       setisLoading(false);
//     } catch (error) {
//       Alert.alert(textStrings.productTitleEror, 'Error Occured');
//       onRequestClose();
//     }
//   };

//   function timeout(delay) {
//     return new Promise(res => setTimeout(res, delay));
//   }

//   async function asyncPaymentValidation() {
//     await timeout(2000);
//     onRequestClose();
//     onVerifyPayment(ctx.orderId);
//   }

//   useEffect(() => {
//     if (show) {
//       createTheAlrajhiSession();
//     }
//   }, [show, createTheAlrajhiSession]);

//   const responcehandle = data => {
//     // onSuccessFun(ctx.orderId);
//     if (data.url.includes('/paymentcancel')) {
//       setHasNavigatedToCancel(true);
//       onRequestClose();
//       Alert.alert(textStrings.productTitleEror, textStrings.paymentCanceled);
//     } else if (data.url === webHookLink && !hasNavigatedToCancel) {
//       asyncPaymentValidation();
//     }
//   };

//   return (
//     <Modal visible={show} onRequestClose={onRequestClose}>
//       {isLoading && paymentId?.length <= 0 ? (
//         <View
//           style={{
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//           }}>
//           <ActivityIndicator size={'large'} color={'blue'} />
//         </View>
//       ) : (
//         <>
//           <SafeAreaView />
//           <View style={{width: '100%', flex: 1}}>
//             <View style={styles.headerDivCont}>
//               <TouchableOpacity
//                 onPress={onRequestClose}
//                 style={styles.headerbtn}>
//                 <Icon2 name="left" size={h('3.5%')} color={textcolor} />
//               </TouchableOpacity>
//               <View style={styles.screenname}>
//                 <Text
//                   style={{
//                     ...TextStyles.curvedHeaderscreenname,
//                   }}>
//                   {' '}
//                 </Text>
//               </View>
//               <View style={styles.headerbtn} />
//             </View>
//             <WebView
//               source={{
//                 uri: `${alrajhi_payment_page}?PaymentID=${paymentId}`,
//               }}
//               style={{flex: 1}}
//               onNavigationStateChange={data => responcehandle(data)}
//             />
//           </View>
//         </>
//       )}
//     </Modal>
//   );
// };

// export default ARPaymentModal;

// const styles = StyleSheet.create({
//   headerDivCont: {
//     width: '100%',
//     height: h('7%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   headerbtn: {
//     width: w('15%'),
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     position: 'relative',
//   },
//   screenname: {
//     width: w('70%'),
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
// });

import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {useTranslation} from '../Text/TextStrings';
import {useSelector} from 'react-redux';
import CryptoJS from 'react-native-crypto-js';
import TextStyles from '../Text/TextStyles';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {textcolor} from '../assets/Colors';
import {
  alrahhi_terminal_resource_key,
  alrajhi_payment_page,
  alrahhi_transportal_id,
  alrahhi_transportal_pwd,
  alrajhi_create_session,
  getCreatedDate,
} from '../ScreenView/CommonUtils';
import {getChildNodeCount} from '../DataBase/databaseFunction';

const ARPaymentModal = ({
  show,
  onRequestClose,
  onSuccessFun,
  onVerifyPayment,
}) => {
  const {textStrings} = useTranslation();
  const [hasNavigatedToCancel, setHasNavigatedToCancel] = useState(false);
  const ctx = useRef({}).current;

  const {curentOrderProductData, orderProcessName} = useSelector(
    state => state.orderProcess,
  );

  const [isLoading, setisLoading] = useState(false);
  const [paymentId, setpaymentId] = useState('');

  function generateRandomNumber(length) {
    let randomNumber = '';
    for (let i = 0; i < length; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

  const aesEncrypt = (trandata, key) => {
    const iv = 'PGKEYENCDECIVSPC';
    const enckey = CryptoJS.enc.Utf8.parse(key);
    const rkEncryptionIv = CryptoJS.enc.Utf8.parse(iv);

    // Encrypt using AES in CBC mode
    const encryptedData = CryptoJS.AES.encrypt(trandata, enckey, {
      iv: rkEncryptionIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // Convert the encrypted data to hexadecimal representation
    const encryptedHex = encryptedData.ciphertext.toString(CryptoJS.enc.Hex);
    return encryptedHex;
  };

  const webHookLink =
    'https://app-xaop4bxqda-uc.a.run.app/alrajhiPaymentUpdate';
  // const webHookLink = "https://us-central1-aczurex-d4b61.cloudfunctions.net/app/alrajhiPaymentUpdate"

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function asyncPaymentValidation() {
    await timeout(2000);
    onRequestClose();
    onVerifyPayment(ctx.orderId);
  }

  useEffect(() => {
    function getMyData() {
      // let orderCount = await getChildNodeCount('orders');
      let orderId = generateRandomNumber(6) + `${getCreatedDate()}`;
      ctx.orderId = orderId;
      const myData = [
        {
          id: alrahhi_transportal_id,
          password: alrahhi_transportal_pwd,
          action: '1',
          udf1: orderId,
          currencyCode: '682',
          trackId: `${generateRandomNumber(9)}`,
          amt: `${curentOrderProductData?.totalPrice}`,
          responseURL: webHookLink,
          errorURL: webHookLink,
        },
      ];
      return myData;
    }
    const createTheAlrajhiSession = async () => {
      try {
        setisLoading(true);
        const data = getMyData();
        const encryptedData = aesEncrypt(
          JSON.stringify(data),
          alrahhi_terminal_resource_key,
        );
        const response = await fetch(alrajhi_create_session, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
          }),
          body: JSON.stringify([
            {
              id: alrahhi_transportal_id,
              trandata: `${encryptedData}`,
              responseURL: webHookLink,
              errorURL: webHookLink,
            },
          ]),
        });
        const rest = await response.json();
        if (rest[0]?.error) {
          Alert.alert(
            textStrings.productTitleEror,
            `Error occured with code ${rest[0]?.error}`,
          );
          onRequestClose();
        } else {
          const fetchResult = `${rest[0]?.result}`.split(
            `:${alrajhi_payment_page}`,
          )[0];
          setpaymentId(fetchResult);
        }
        setisLoading(false);
      } catch (error) {
        Alert.alert(textStrings.productTitleEror, 'Error Occured');
        onRequestClose();
      }
    };
    if (show) {
      createTheAlrajhiSession();
    }
  }, [
    show,
    textStrings,
    curentOrderProductData?.totalPrice,
    onRequestClose,
    ctx,
  ]);

  const responcehandle = data => {
    // onSuccessFun(ctx.orderId);
    if (data.url.includes('/paymentcancel')) {
      setHasNavigatedToCancel(true);
      onRequestClose();
      Alert.alert(textStrings.productTitleEror, textStrings.paymentCanceled);
    } else if (data.url === webHookLink && !hasNavigatedToCancel) {
      asyncPaymentValidation();
    }
  };

  return (
    <Modal visible={show} onRequestClose={onRequestClose}>
      {isLoading && paymentId?.length <= 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      ) : (
        <>
          <SafeAreaView />
          <View style={{width: '100%', flex: 1}}>
            <View style={styles.headerDivCont}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={styles.headerbtn}>
                <Icon2 name="left" size={h('3.5%')} color={textcolor} />
              </TouchableOpacity>
              <View style={styles.screenname}>
                <Text
                  style={{
                    ...TextStyles.curvedHeaderscreenname,
                  }}>
                  {' '}
                </Text>
              </View>
              <View style={styles.headerbtn} />
            </View>
            <WebView
              source={{
                uri: `${alrajhi_payment_page}?PaymentID=${paymentId}`,
              }}
              style={{flex: 1}}
              onNavigationStateChange={data => responcehandle(data)}
            />
          </View>
        </>
      )}
    </Modal>
  );
};

export default ARPaymentModal;

const styles = StyleSheet.create({
  headerDivCont: {
    width: '100%',
    height: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  screenname: {
    width: w('70%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
