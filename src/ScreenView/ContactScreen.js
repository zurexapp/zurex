import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const ContactScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const termsdata = [
    {
      question: textStrings.whatsappTxt,
      imglink: require('../assets/whatsapp.png'),
      id: 0,
      link: 'https://api.whatsapp.com/send/?phone=966557488008',
    },
    {
      question: textStrings.instagramTxt,
      id: 1,
      imglink: require('../assets/insta.png'),
      link: 'https://www.instagram.com/zurex.sa/',
    },
    {
      question: textStrings.twitterTxt,
      id: 2,
      imglink: require('../assets/twitter.png'),
      link: 'https://x.com/aczurex20',
    },
    {
      question: textStrings.emailTxt,
      id: 3,
      imglink: require('../assets/email.png'),
      link: 'mailto:Info@zurex.sa',
    },
    {
      question: textStrings.mobileTxt,
      id: 4,
      imglink: require('../assets/mobile.png'),
      link: 'tel:+966920002574',
    },
    // New Snapchat Section
    {
      question: textStrings.snapchatTxt,
      id: 5,
      imglink: require('../assets/snapchat.jpg'),
      link: 'https://www.snapchat.com/add/zurex.sa',
    },
    // New TikTok Section
    {
      question: textStrings.tiktokTxt,
      id: 6,
      imglink: require('../assets/tictok.jpg'),
      link: 'https://www.tiktok.com/@zurex.sa?_t=8plUym0Jj3o&_r=1',
    },
  ];

  const handleItemClick = link => {
    Linking.openURL(link).catch(err =>
      console.error('Failed to open the link', err),
    );
  };

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.contactUsTxt}
        iconName2={''}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.otherContent}>
          <Text style={TextStyles.contactscreenmainHeading}>
            {textStrings.contactUsDescTxt}
          </Text>
          {termsdata.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.btnConatiner}
              onPress={() => handleItemClick(item.link)}>
              <View style={styles.btnIMageCont}>
                <Image
                  source={item?.imglink}
                  style={{width: '100%', height: '80%', resizeMode: 'contain'}}
                />
              </View>
              <Text style={TextStyles.completepaytitle}>{item?.question}</Text>
            </TouchableOpacity>
          ))}
          {/* Additional spacing for the end of the ScrollView */}
          <View style={styles.footerSpace}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  otherContent: {
    width: '100%',
    paddingVertical: h('2%'),
    alignItems: 'center',
  },
  btnConatiner: {
    width: w('90%'),
    height: h('7%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    backgroundColor: '#FBFBFB',
    marginVertical: h('1%'), // Add margin between items
  },
  btnIMageCont: {
    position: 'absolute',
    top: 0,
    left: w('1.5%'),
    height: '100%',
    width: w('14%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSpace: {
    height: h('10%'), // Additional space at the end of the scroll view
  },
});
