import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../ScreenView/SplashScreen';
import LoginScreen from '../ScreenView/LoginScreen';
import SignUpScreen from '../ScreenView/SignUpScreen';
import OrderDetailScreen from '../ScreenView/OrderDetailScreen';
import AddOilRequestScreen from '../ScreenView/AddOilRequestScreen';
import TamaraLoginScreen from '../ScreenView/TamaraLoginScreen';
import VerficationCodeScreen from '../ScreenView/VerficationCodeScreen';
import VerficationIdentityScreen from '../ScreenView/VerficationIdentityScreen';
import TamaraVerficationSuccessScreen from '../ScreenView/TamaraVerficationSuccessScreen';
import TamaraVerficationFailedScreen from '../ScreenView/TamaraVerficationFailedScreen';
import PaymentCompScreen from '../ScreenView/PaymentCompScreen';
import PaymentMethodScreen from '../ScreenView/PaymentMethodScreen';
import BalanceScreen from '../ScreenView/BalanceScreen';
import MyOrderFollowUpPay from '../ScreenView/MyOrderFollowUpPay';
import WaitScreen from '../ScreenView/WaitScreen';
import AddCarsScreen from '../ScreenView/AddCarsScreen';
import MyCarsAddScreen from '../ScreenView/MyCarsAddScreen';
import Home4btnScreen from '../ScreenView/Home4btnScreen';
import BatteriesDescriptionScreen from '../ScreenView/BatteriesDescriptionScreen';
import BatteriesScreenDescT from '../ScreenView/BatteriesScreenDescT';
import OrderCompletedScreen from '../ScreenView/OrderCompletedScreen';
import MyOrderScreen from '../ScreenView/MyOrderScreen';
import BatteryTypeScreen from '../ScreenView/BatteryTypeScreen';
import CompletePaymentScreen from '../ScreenView/CompletePaymentScreen';
import ConfirmCardataScreen from '../ScreenView/ConfirmCardataScreen';
import OilFilterDescScreen from '../ScreenView/OilFilterDescScreen';
import TyreDescScreen from '../ScreenView/TyreDescScreen';
import ContactScreen from '../ScreenView/ContactScreen';
import ProfileScreen from '../ScreenView/ProfileScreen';
import SettingsScreen from '../ScreenView/SettingsScreen';
import MyCarBillScreen from '../ScreenView/MyCarBillScreen';
import WarentyCarDataScreen from '../ScreenView/WarentyCarDataScreen';
import SupportServicesScreen from '../ScreenView/SupportServicesScreen';
import OilFilterSelectorScreen from '../ScreenView/OilFilterSelectorScreen';
import TiresSelectorScreen from '../ScreenView/TiresSelectorScreen';
import MyBottomNavigation from './MyBottomNavigation';
import ConfirmCardataScreenDup from '../ScreenView/ConfirmCardataScreenDup';
import TrackingOrderScreen from '../ScreenView/TrackingOrderScreen';
import ProcessScreen from '../ProcesScreen/ProcessScreen';
import BalanceScreenNew from '../ScreenView/BalanceScreenNew';
import EngineOilDescScreen from '../ScreenView/EngineOilDescScreen';
import TyreDescScreenDetail from '../ScreenView/TyreDescScreenDetail';

const Stack = createNativeStackNavigator();

const MyStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Splash'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="home4btn" component={MyBottomNavigation} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{routeName: null}}
      />
      <Stack.Screen name="ProcessScreen" component={ProcessScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        initialParams={{routeName: null}}
      />
      <Stack.Screen
        name="orderDetailScreen"
        component={OrderDetailScreen}
        initialParams={{data: {}}}
      />
      <Stack.Screen
        name="addOilRequestScreen"
        component={AddOilRequestScreen}
      />
      <Stack.Screen name="tamaraLogin" component={TamaraLoginScreen} />
      <Stack.Screen
        name="verificationScreen"
        component={VerficationCodeScreen}
      />
      <Stack.Screen
        name="verificationIdentityScreen"
        component={VerficationIdentityScreen}
      />
      <Stack.Screen
        name="verificationSuccessScreen"
        component={TamaraVerficationSuccessScreen}
      />
      <Stack.Screen
        name="verificationFailedScreen"
        component={TamaraVerficationFailedScreen}
      />
      <Stack.Screen
        name="paymentCompleteScreen"
        component={PaymentCompScreen}
      />
      <Stack.Screen name="paymethodScreen" component={PaymentMethodScreen} />
      <Stack.Screen name="MyOrderFollowUpPay" component={MyOrderFollowUpPay} />
      <Stack.Screen name="WaitScreen" component={WaitScreen} />
      <Stack.Screen name="AddCarsScreen" component={AddCarsScreen} />
      <Stack.Screen name="MyCarsAddScreen" component={MyCarsAddScreen} />
      <Stack.Screen
        name="BatteriesDescriptionScreen"
        component={BatteriesDescriptionScreen}
        initialParams={{selectedBatteryId: ''}}
      />
      <Stack.Screen
        name="BatteriesScreenDescT"
        component={BatteriesScreenDescT}
      />
      <Stack.Screen
        name="OrderCompletedScreen"
        component={OrderCompletedScreen}
      />
      <Stack.Screen name="BalanceScreen" component={BalanceScreenNew} />
      <Stack.Screen
        name="TrackingOrderScreen"
        component={TrackingOrderScreen}
      />
      <Stack.Screen name="BatteryTypeScreen" component={BatteryTypeScreen} />
      <Stack.Screen
        name="CompletePaymentScreen"
        component={CompletePaymentScreen}
      />
      <Stack.Screen
        name="ConfirmCardataScreen"
        component={ConfirmCardataScreen}
      />
      <Stack.Screen
        name="ConfirmCardataScreenDup"
        component={ConfirmCardataScreenDup}
      />
      <Stack.Screen
        name="EngineOilDescScreen"
        component={EngineOilDescScreen}
      />
      <Stack.Screen
        name="OilFilterDescScreen"
        component={OilFilterDescScreen}
      />
      <Stack.Screen name="TyreDescScreen" component={TyreDescScreen} />
      <Stack.Screen
        name="TyreDescScreenDetail"
        component={TyreDescScreenDetail}
        initialParams={{selectedTireId: ''}}
      />

      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="MyCarBillScreen" component={MyCarBillScreen} />
      <Stack.Screen
        name="WarentyCarDataScreen"
        component={WarentyCarDataScreen}
      />
      <Stack.Screen
        name="SupportServicesScreen"
        component={SupportServicesScreen}
      />
      <Stack.Screen
        name="OilFilterSelectorScreen"
        component={OilFilterSelectorScreen}
      />
      <Stack.Screen
        name="TiresSelectorScreen"
        component={TiresSelectorScreen}
      />
    </Stack.Navigator>
  );
};

export default MyStackNavigation;
