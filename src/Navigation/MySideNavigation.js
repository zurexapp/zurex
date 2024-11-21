import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import React, {useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Components/CustomDrawer';
import BalanceScreen from '../ScreenView/BalanceScreen';
import ContactScreen from '../ScreenView/ContactScreen';
import AboutScreen from '../ScreenView/AboutScreen';
import FaqScreen from '../ScreenView/FaqScreen';
import SettingsScreen from '../ScreenView/SettingsScreen';
import TermsScreen from '../ScreenView/TermsScreen';
import TipsScreen from '../ScreenView/TipsScreen';
import ProfileScreen from '../ScreenView/ProfileScreen';
import {useTranslation} from '../Text/TextStrings';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Drawer = createDrawerNavigator();

const CustomIconCont = ({label, imageLink}) => {
  return (
    <View
      style={{
        width: '100%',
        height: h('5%'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Image
        style={{height: '100%', resizeMode: 'contain'}}
        source={imageLink}
      />
      <View
        style={{
          width: '90%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: w('2%'),
        }}>
        <Text style={{fontSize: h('2%'), color: 'black'}}>{label}</Text>
        <AntDesign name="right" size={h('3%')} color="#c0c0c0" />
      </View>
    </View>
  );
};

const MySideNavigation = () => {
  const {textStrings} = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Balance"
      screenOptions={{headerShown: false, drawerLabel: false}}>
      <Drawer.Screen
        name="Balance"
        options={{
          drawerLabel: 'Balance',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.balanceTxt}
              imageLink={require('../assets/blanceicon.png')}
            />
          ),
        }}
        component={BalanceScreen}
      />
      <Drawer.Screen
        name="ContactUs"
        options={{
          drawerLabel: 'Contact us',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.contactUsTxt}
              imageLink={require('../assets/conatctusicon.png')}
            />
          ),
        }}
        component={ContactScreen}
      />
      <Drawer.Screen
        name="AboutUs"
        options={{
          drawerLabel: 'About Us',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.aboutUsQuestion1}
              imageLink={require('../assets/aboutusicon.png')}
            />
          ),
        }}
        component={AboutScreen}
      />
      <Drawer.Screen
        name="faq"
        options={{
          drawerLabel: 'FAQ',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.faqTitleTxt}
              imageLink={require('../assets/faqicon.png')}
            />
          ),
        }}
        component={FaqScreen}
      />
      <Drawer.Screen
        name="Setting"
        options={{
          drawerLabel: 'Setting',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.settingHedTxt}
              imageLink={require('../assets/settingicon.png')}
            />
          ),
        }}
        component={SettingsScreen}
      />
      <Drawer.Screen
        name="Terms"
        options={{
          drawerLabel: 'Terms & Conditions',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.termConditionTxt}
              imageLink={require('../assets/termsicon.png')}
            />
          ),
        }}
        component={TermsScreen}
      />
      <Drawer.Screen
        name="Privacy"
        options={{
          drawerLabel: 'Privacy Policy',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label="Privacy Policy"
              imageLink={require('../assets/privacy.png')}
            />
          ),
        }}
        component={PrivacyPolicyScreen}
      />
      <Drawer.Screen
        name="tips"
        options={{
          drawerLabel: 'Tips & articles',
          drawerIcon: ({color, size}) => (
            <CustomIconCont
              label={textStrings.tipsAndArticleTxt}
              imageLink={require('../assets/tipsicon.png')}
            />
          ),
        }}
        component={TipsScreen}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'profile',
          drawerItemStyle: {height: 0},
        }}
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
};

const PrivacyPolicyScreen = ({navigation}) => {
  React.useEffect(() => {
    Linking.openURL('https://zurex.sa/privacy-policy').catch(err =>
      console.error("Couldn't load page", err),
    );
    navigation.goBack();
  }, [navigation]);
  return null;
};

// const PrivacyPolicyScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const openPrivacyPolicy = async () => {
//       try {
//         await Linking.openURL('https://zurex.sa/privacy-policy');
//       } catch (err) {
//         console.error("Couldn't load page", err);
//       } finally {
//         setLoading(false);
//         navigation.goBack();
//       }
//     };

//     openPrivacyPolicy();
//   }, [navigation]);
//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Text>Loading Privacy Policy...</Text>
//       )}
//     </View>
//   );
// };

export default MySideNavigation;

const styles = StyleSheet.create({});
