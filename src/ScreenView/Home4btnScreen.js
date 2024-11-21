import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomWaitScreenTemp from '../Components/CustomWaitScreenTemp';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useSelector, useDispatch} from 'react-redux';
import {
  setOrderProcessName,
  setCurentOrderProductData,
} from '../store/orderProcessSlice';
import {webengage} from '../webengage';
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home4btnScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // State to track if data has been fetched

  useEffect(() => {
    const fetchData = async () => {
      if (!isDataFetched) {
        // Only fetch if data hasn't been fetched yet
        try {
          await getUserId();
          setIsDataFetched(true); // Mark data as fetched
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [isDataFetched]); // Dependency on isDataFetched to control fetching

  const getUserId = async () => {
    const userIdFromStorage = await AsyncStorage.getItem('userId');
    if (userIdFromStorage) {
      console.log('User ID fetched:', userIdFromStorage);
      setUserId(userIdFromStorage);
    } else {
      console.log('No User ID found in AsyncStorage');
    }
  };

  const setOrderValue = async value => {
    try {
      console.log('Setting order value:', value);
      console.log('User ID before event:', userId);

      await dispatch(setOrderProcessName({orderProcessName: value}));
      await dispatch(
        setCurentOrderProductData({
          curentOrderProductData: {productType: `${value}`},
        }),
      );
      webengage.track('Category Clicked', {
        'Category name': value,
        name: value,
        Image: [
          'https://img.freepik.com/premium-vector/engine-oil-filters-isolated-white-background_258836-181.jpg?w=2000',
        ],
      });

      await analytics().logEvent('app_Category_Viewed', {
        categoryName: value,
        userId: userId,
      });
      console.log('Category_Viewed', value);

      if (value === 'support') {
        Alert.alert(textStrings.supportTxt, textStrings.comingSoonTxt);
      } else {
        if (value === 'oilFilter' || value === 'tyre') {
          Alert.alert(
            textStrings.attentionTxtLog,
            textStrings.oilAttentionTxt,
            [
              {
                text: textStrings.noTxtLog,
                style: 'cancel',
              },
              {
                text: textStrings.yesTxtLog,
                onPress: () => {
                  navigation.navigate('ConfirmCardataScreen');
                },
              },
            ],
          );
        } else {
          navigation.navigate('ConfirmCardataScreen');
        }
      }
    } catch (error) {
      console.error('Error setting order value:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Clear state or perform actions when the screen is focused, if needed
      dispatch(setCurentOrderProductData({curentOrderProductData: {}}));
      dispatch(setOrderProcessName({orderProcessName: ''}));
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const handleWhatsAppClick = () => {
    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=966557488008';
    Linking.openURL(whatsappUrl).catch(err =>
      console.error('Failed to open WhatsApp', err),
    );
  };

  return (
    <CustomWaitScreenTemp isSwitch={true}>
      <View style={styles.btnsContainer}>
        <View
          style={{
            ...styles.btnContainer,
            position: 'relative',
            marginBottom: 10,
            zIndex: 2000,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: -h('6%'),
              width: h('11%'),
              height: h('11%'),
              borderRadius: h('6%'),
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              left: w('100%') / 2 - h('8%'),
              zIndex: 4000,
              borderColor: '#BFD0E5',
              borderWidth: 1,
            }}>
            <Image
              style={{
                width: h('10%'),
                height: h('10%'),
                resizeMode: 'contain',
              }}
              source={require('../assets/logo.png')}
            />
          </View>

          <TouchableOpacity
            onPress={() => setOrderValue('oilFilter')}
            style={styles.imageButton}>
            <Image
              style={styles.btnimage}
              source={require('../assets/oil.png')}
            />
            <Text style={TextStyles.home4btnmaintxt}>
              {textStrings.oilFilterTitleTxt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOrderValue('battery');
            }}
            style={styles.imageButton}>
            <Image
              style={styles.btnimage}
              source={require('../assets/battery.png')}
            />
            <Text style={TextStyles.home4btnmaintxt}>
              {textStrings.batteryTxt}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => setOrderValue('tyre')}
            style={styles.imageButton}>
            <Image
              style={styles.btnimage}
              source={require('../assets/tyre.png')}
            />
            <Text style={TextStyles.home4btnmaintxt}>
              {textStrings.tiresTitleTxt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOrderValue('support')}
            style={styles.imageButton}>
            <Image
              style={styles.btnimage}
              source={require('../assets/car.png')}
            />
            <Text style={TextStyles.home4btnmaintxt}>
              {textStrings.supportTxt}
            </Text>
          </TouchableOpacity>
        </View>

        {/* WhatsApp floating button */}
        <TouchableOpacity
          onPress={handleWhatsAppClick}
          style={styles.whatsappButton}>
          <Image
            style={styles.whatsappImage}
            source={require('../assets/whatsapp.png')}
          />
        </TouchableOpacity>
      </View>
    </CustomWaitScreenTemp>
  );
};

export default Home4btnScreen;

const styles = StyleSheet.create({
  btnsContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: h('2.3%'),
  },
  btnContainer: {
    width: '83%',
    alignSelf: 'center',
    height: Platform.OS === 'android' ? h('17%') : h('16%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageButton: {
    position: 'relative',
    width: '49%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderColor: '#BFD0E5',
    borderRadius: 5,
  },
  btnimage: {
    width: w('17%'),
    resizeMode: 'contain',
    height: w('16%'),
  },
  whatsappButton: {
    position: 'absolute',
    bottom: h('12%'),
    left: w('5%'),
    width: 50,
    height: 50,
    backgroundColor: '#29a71a',
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
