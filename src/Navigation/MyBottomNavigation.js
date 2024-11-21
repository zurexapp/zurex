// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// import {w, h} from 'react-native-responsiveness';
// import Icon from 'react-native-vector-icons/Octicons';
// import Icon2 from 'react-native-vector-icons/Fontisto';
// import Icon3 from 'react-native-vector-icons/FontAwesome5';
// import Icon4 from 'react-native-vector-icons/MaterialIcons';
// import Home4btnScreen from '../ScreenView/Home4btnScreen';
// import MyOrderScreen from '../ScreenView/MyOrderScreen';
// import ProfileScreen from '../ScreenView/ProfileScreen';
// import MySideNavigation from './MySideNavigation';
// import TextStyles from '../Text/TextStyles';
// import {c0color, redcolor} from '../assets/Colors';
// import {useTranslation} from '../Text/TextStrings';
// import ConfirmCardataScreenDup from '../ScreenView/ConfirmCardataScreenDup';
// import ConfirmCardataScreen from '../ScreenView/ConfirmCardataScreen';
// import ConfirmCarDataScreenBtm from '../ScreenView/ConfirmCarDataScreenBtm';
// const Tab = createBottomTabNavigator();
// const MyBottomNavigation = () => {
//   const {textStrings} = useTranslation();

//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarStyle: {
//           height: h('7%'),
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 12,
//           },
//           shadowOpacity: 0.58,
//           shadowRadius: 16.0,

//           elevation: 24,
//         },
//         tabBarActiveTintColor: redcolor,
//         headerShown: false,
//         tabBarActiveBackgroundColor: 'white',
//         tabBarInactiveBackgroundColor: 'white',
//         tabBarInactiveTintColor: c0color,
//         tabBarShowLabel: false,
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home4btnScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({color, size}) => (
//             <View style={styles.btnContainer}>
//               <Icon2 name="home" color={color} size={h('3.5%')} />
//               <Text style={{...TextStyles.bottomtabbtntxtCont, color: color}}>
//                 {textStrings.homeBtnTxt}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Order"
//         component={MyOrderScreen}
//         options={{
//           tabBarLabel: 'Order',
//           tabBarIcon: ({color, size}) => (
//             <View style={styles.btnContainer}>
//               <Icon name="package" color={color} size={h('3.5%')} />
//               <Text style={{...TextStyles.bottomtabbtntxtCont, color: color}}>
//                 {textStrings.orderBtnTxt}
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="MyCar"
//         component={ConfirmCarDataScreenBtm}
//         options={{
//           tabBarLabel: 'My Car',
//           tabBarIcon: ({color, size}) => (
//             <View style={styles.btnContainer}>
//               <Icon3 name="car-alt" color={color} size={h('3.5%')} />
//               <Text style={{...TextStyles.bottomtabbtntxtCont, color: color}}>
//                 {textStrings.myCars}
//               </Text>
//             </View>
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="more"
//         component={MySideNavigation}
//         options={{
//           tabBarLabel: 'More',
//           tabBarIcon: ({color, size}) => (
//             <View style={styles.btnContainer}>
//               <Icon4 name="more-horiz" color={color} size={h('3.5%')} />
//               <Text style={{...TextStyles.bottomtabbtntxtCont, color: color}}>
//                 {textStrings.btnMore}
//               </Text>
//             </View>
//           ),
//           tabBarButton: props => <TouchableOpacity {...props} />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MyBottomNavigation;

// const styles = StyleSheet.create({
//   btnContainer: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'column',
//   },
// });

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Home4btnScreen from '../ScreenView/Home4btnScreen';
import MyOrderScreen from '../ScreenView/MyOrderScreen';
import MySideNavigation from './MySideNavigation';
import TextStyles from '../Text/TextStyles';
import {c0color, redcolor} from '../assets/Colors';
import {useTranslation} from '../Text/TextStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ConfirmCarDataScreenBtm from '../ScreenView/ConfirmCarDataScreenBtm';

const Tab = createBottomTabNavigator();

const MyBottomNavigation = () => {
  const {textStrings} = useTranslation();
  const navigation = useNavigation();

  const checkUserIdForOrder = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      navigation.navigate('Order');
    } else {
      navigation.navigate('Login');
    }
  };

  const checkUserIdForMore = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      navigation.navigate('More');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: h('7%'),
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        tabBarActiveTintColor: redcolor,
        headerShown: false,
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarInactiveTintColor: c0color,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home4btnScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.btnContainer}>
              <Icon2 name="home" color={color} size={h('3.5%')} />
              <Text style={{...TextStyles.bottomtabbtntxtCont, color}}>
                {textStrings.homeBtnTxt}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={MyOrderScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.btnContainer}>
              <Icon name="package" color={color} size={h('3.5%')} />
              <Text style={{...TextStyles.bottomtabbtntxtCont, color}}>
                {textStrings.orderBtnTxt}
              </Text>
            </View>
          ),
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={checkUserIdForOrder} />
          ),
        }}
      />
      <Tab.Screen
        name="MyCar"
        component={ConfirmCarDataScreenBtm}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.btnContainer}>
              <Icon3 name="car-alt" color={color} size={h('3.5%')} />
              <Text style={{...TextStyles.bottomtabbtntxtCont, color}}>
                {textStrings.myCars}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MySideNavigation}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.btnContainer}>
              <Icon4 name="more-horiz" color={color} size={h('3.5%')} />
              <Text style={{...TextStyles.bottomtabbtntxtCont, color}}>
                {textStrings.btnMore}
              </Text>
            </View>
          ),
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={checkUserIdForMore} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyBottomNavigation;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});
