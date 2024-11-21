// import { StyleSheet, Text, View, ImageBackground, Image, Alert, Modal, TouchableOpacity, BackHandler } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { w, h } from 'react-native-responsiveness';
// import { maincolor } from '../assets/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { checkIsUserExist } from '../DataBase/databaseFunction';
// import { useDispatch } from 'react-redux';
// import { setAuth } from '../store/authSlice';
// import LottieView from 'lottie-react-native';
// import NetInfo from '@react-native-community/netinfo';
// import messaging from '@react-native-firebase/messaging';

// const SplashScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const [changinlayoutVideo, setchanginlayoutVideo] = useState(true);
//   const [isConnected, setIsConnected] = useState(tr ue);
//   const [modalVisible, setModalVisible] = useState(false);

//   const getUserDataFun = async () => {
//     const userNumber = await AsyncStorage.getItem('acZurexLoginUserId');
//     if (userNumber) {
//       await checkIsUserExist(userNumber)
//         .then(async result => {
//           if (result) {
//             await dispatch(setAuth({ isAuth: result }));
//           }
//         })
//         .catch(e => console.log('check', e));
//     }
//   };

//   const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       getToken();
//     }
//   };

//   const getToken = async () => {
//     try {
//       const token = await messaging().getToken();
//       await AsyncStorage.setItem('fcmToken', token);
//     } catch (error) {
//     }
//   };

//   const logStoredToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('fcmToken');
//       if (token) {
//       } else {
//       }
//     } catch (error) {
//     }
//   };

//   useEffect(() => {
//     requestUserPermission();
//     const unsubscribe = messaging().onTokenRefresh(token => {
//       AsyncStorage.setItem('fcmToken', token);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//       if (!state.isConnected) {
//         setModalVisible(true);
//       } else {
//         setModalVisible(false);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (isConnected) {
//       getUserDataFun();
//       setTimeout(() => {
//         setchanginlayoutVideo(false);
//       }, 3600);
//       logStoredToken(); // Log the stored token when component mounts
//     }
//   }, [isConnected]);

//   useEffect(() => {
//     if (changinlayoutVideo === false) {
//       setTimeout(() => {
//         navigation.replace('home4btn');
//       }, 100);
//     }
//   }, [changinlayoutVideo]);

//   const handleRetry = () => {
//     BackHandler.exitApp();
//   };

//   return (
//     <>
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>No Internet Connection</Text>
//             <Text style={styles.modalText}>Please check your internet connectivity.</Text>
//             <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
//               <Text style={styles.retryButtonText}>Retry</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {changinlayoutVideo ? (
//         <View style={styles.backgroundvidoContainer}>
//           <LottieView
//             source={require('../assets/main-gift1718026714.json')}
//             autoPlay
//             loop={false}
//             style={{
//               width: '100%',
//               height: '100%',
//             }}
//           />
//         </View>
//       ) : null}

//       <ImageBackground
//         blurRadius={25}
//         style={styles.backgroundimage}
//         source={require('../assets/splashbg.png')}>
//         <Image
//           style={styles.welcomeimg}
//           source={require('../assets/welcome.png')}
//         />
//       </ImageBackground>
//     </>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   backgroundimage: {
//     width: w('100%'),
//     height: h('100%'),
//     objectFit: 'cover',
//     backgroundColor: maincolor,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   backgroundvidoContainer: {
//     width: w('100%'),
//     height: h('100%'),
//     backgroundColor: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 4000,
//     position: 'absolute',
//     top: 0,
//   },
//   welcomeimg: {
//     width: w('85%'),
//     resizeMode: 'contain',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: w('80%'),
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//     textAlign: 'center',
//     color: 'black'
//   },
//   retryButton: {
//     marginTop: 20,
//     backgroundColor: maincolor,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor} from '../assets/Colors';
import {checkIsUserExist} from '../DataBase/databaseFunction';
import {useDispatch} from 'react-redux';
import {setAuth} from '../store/authSlice';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [changinlayoutVideo, setchanginlayoutVideo] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Memoize getUserDataFun with useCallback to ensure stability
  const getUserDataFun = useCallback(async () => {
    console.log('Fetching user data...');
    const userNumber = await AsyncStorage.getItem('acZurexLoginUserId');
    console.log('User ID from AsyncStorage:', userNumber);
    if (userNumber) {
      try {
        const result = await checkIsUserExist(userNumber);
        console.log('User existence check result:', result);
        if (result) {
          await dispatch(setAuth({isAuth: result}));
          console.log('User authenticated:', result);
        }
      } catch (e) {
        console.error('Error checking user existence:', e);
      }
    }
  }, [dispatch]);

  // Move requestUserPermission inside useEffect to avoid it changing every render
  useEffect(() => {
    const requestUserPermission = async () => {
      console.log('Requesting user permission for notifications...');
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log('Notification permission status:', authStatus);

      if (enabled) {
        console.log('User permission granted.');
        getToken();
      } else {
        console.log('User permission denied.');
      }
    };

    requestUserPermission();

    return () => {};
  }, []); // No dependencies needed here

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', token);
      console.log('FCM token retrieved and stored:', token);
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  const logStoredToken = async () => {
    try {
      const token = await AsyncStorage.getItem('fcmToken');
      if (token) {
        console.log('Stored FCM token:', token);
      } else {
        console.log('No FCM token found in storage.');
      }
    } catch (error) {
      console.error('Error fetching stored FCM token:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log('Network connectivity status:', state.isConnected);
      if (!state.isConnected) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log('Device is connected to the internet.');
      getUserDataFun();

      // Log the first open event
      analytics().logEvent('app_First_open', {});
      console.log("Logged 'app_First_open' event to analytics.");

      setTimeout(() => {
        setchanginlayoutVideo(false);
      }, 3600);
      logStoredToken();
    } else {
      console.log('Device is offline, skipping data fetch.');
    }
  }, [isConnected, getUserDataFun]); // Add getUserDataFun here

  useEffect(() => {
    if (changinlayoutVideo === false) {
      setTimeout(() => {
        console.log("Navigating to 'home4btn' screen.");
        navigation.replace('home4btn');
      }, 100);
    }
  }, [changinlayoutVideo, navigation]); // Add navigation as a dependency

  const handleRetry = () => {
    console.log('Retry button pressed. Exiting app.');
    BackHandler.exitApp();
  };

  return (
    <>
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>No Internet Connection</Text>
            <Text style={styles.modalText}>
              Please check your internet connectivity.
            </Text>
            <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {changinlayoutVideo ? (
        <View style={styles.backgroundvidoContainer}>
          <LottieView
            source={require('../assets/main-gift1718026714.json')}
            autoPlay
            loop={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      ) : null}

      <ImageBackground
        blurRadius={25}
        style={styles.backgroundimage}
        source={require('../assets/splashbg.png')}>
        <Image
          style={styles.welcomeimg}
          source={require('../assets/welcome.png')}
        />
      </ImageBackground>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundimage: {
    width: w('100%'),
    height: h('100%'),
    objectFit: 'cover',
    backgroundColor: maincolor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundvidoContainer: {
    width: w('100%'),
    height: h('100%'),
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4000,
    position: 'absolute',
    top: 0,
  },
  welcomeimg: {
    width: w('85%'),
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: w('80%'),
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: maincolor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
