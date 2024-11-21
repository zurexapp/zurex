import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {w, h} from 'react-native-responsiveness';
import {textcolor, redcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setClientCarsData,
  setMyOrdersData,
  setMySupportServicesData,
  setMySupportServicesItems,
} from '../store/projectSlice';
import LoadingModal from './LoadingModal';
import {getDataWithRef, postUserDataWithId} from '../DataBase/databaseFunction';
import auth from '@react-native-firebase/auth';

const CustomDrawer = props => {
  const {textStrings} = useTranslation();
  const navigation = useNavigation();
  const [showAlert, setshowAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [username, setUsername] = useState(''); // State to hold username
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.auth);

  // Fetch username from AsyncStorage when component mounts
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('userName'); // Adjust key as necessary
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          setUsername(isAuth.name);
        }
      } catch (error) {
        console.log('Error fetching username from AsyncStorage:', error);
      }
    };

    fetchUsername();
  });

  const logoutFunctionUser = async () => {
    setisLoading(true);

    try {
      // Get the userId and token from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('fcmToken');

      if (userId && token) {
        const userData = await getDataWithRef('user', userId);
        if (userData) {
          const userDataObj = Object.values(userData)[2];
          if (Array.isArray(userDataObj) && userDataObj.includes(token)) {
            const updatedTokens = userDataObj.filter(t => t !== token);
            await postUserDataWithId(userId, {deviceToken: updatedTokens});
          }
        }
      }

      // Clear all AsyncStorage data
      await AsyncStorage.clear();

      // Clear Redux state
      dispatch(setClientCarsData({clientCarsData: []}));
      dispatch(setAuth({isAuth: null}));
      dispatch(setMyOrdersData({myOrdersData: []}));
      dispatch(setMySupportServicesData({mySupportServicesData: []}));
      dispatch(setMySupportServicesItems({mySupportServicesItems: []}));

      try {
        await auth().signOut();
        console.log('User signed out from Firebase');
      } catch (error) {
        console.log('Error signing out from Firebase:', error);
      }

      navigation.replace('home4btn');
    } catch (error) {
      console.log('Error during logout:', error);
    } finally {
      setisLoading(false);
      setshowAlert(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <LoadingModal visibleModal={isLoading} />
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          onPress={() => navigation.navigate('profile')}
          style={{
            width: w('71.5%'),
            height: h('15%'),
            position: 'relative',
          }}>
          <Image
            source={require('../assets/Header.png')}
            style={{
              width: '100%',
              height: h('18%'),
              resizeMode: 'contain',
              position: 'absolute',
              top: -h('3%'),
            }}
          />
          <View
            style={{
              width: '100%',
              height: h('9%'),
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: h('7%'),
                height: h('7%'),
                borderRadius: h('7%'),
                overflow: 'hidden',
              }}>
              <Image
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                source={
                  isAuth?.userImage
                    ? {uri: isAuth?.userImage}
                    : require('../assets/face.png')
                }
              />
            </View>
            <View
              style={{
                width: '70%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingLeft: w('2%'),
              }}>
              <View style={{flex: 1, marginRight: 10, overflow: 'hidden'}}>
                <Text style={TextStyles.profilenamedrawertxt}>{username}</Text>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign name="right" size={h('3%')} color="#c0c0c0" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          height: h('12%'),
        }}>
        <TouchableOpacity
          style={{
            width: '87%',
            height: h('5%'),
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            Alert.alert(textStrings.logoutTxt, textStrings.signOutTitleTxt, [
              {
                text: textStrings.noTxtLog,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: textStrings.yesTxtLog,
                onPress: logoutFunctionUser,
              },
            ]);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                height: h('4%'),
                width: h('4%'),
                borderRadius: h('5%'),
                backgroundColor: redcolor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: w('1.5%'),
              }}>
              <Ionicons name="power" size={h('2.3%')} color="white" />
            </View>
            <Text style={TextStyles.drwerlogouttxt}>
              {textStrings.logoutTxt}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={textStrings.signOutTitleTxt}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={textStrings.noBtnTxt}
        confirmText={textStrings.yesSureTxt}
        confirmButtonColor="transparent"
        onCancelPressed={() => setshowAlert(false)}
        onConfirmPressed={logoutFunctionUser}
        confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
        cancelButtonColor="transparent"
        cancelButtonTextStyle={{color: redcolor, fontSize: h('2.3%')}}
        cancelButtonStyle={{marginRight: h('10%')}}
      />
    </View>
  );
};

export default CustomDrawer;
