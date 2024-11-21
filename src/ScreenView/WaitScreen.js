import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomWaitScreenTemp from '../Components/CustomWaitScreenTemp';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {setEnableCardData} from '../store/orderProcessSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setClientCarsData} from '../store/projectSlice';

const WaitScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const {orderProcessName, enableCardData} = useSelector(
    state => state.orderProcess,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCarsData = async () => {
      const carsResult = await AsyncStorage.getItem('ac-zurex-client-CarsData');
      if (carsResult) {
        dispatch(setClientCarsData({clientCarsData: JSON.parse(carsResult)}));
      }
    };

    const switchLayout = async () => {
      if (orderProcessName) {
        await dispatch(setEnableCardData({enableCardData: true}));
        await fetchAllCarsData();
        navigation.replace('ConfirmCardataScreen');
      } else {
        await fetchAllCarsData();
        navigation.replace('home4btn', {screen: 'MyCar'});
      }
    };

    switchLayout();
  }, [dispatch, navigation, orderProcessName]);

  return (
    <View style={styles.waitContentContainer}>
      <Image style={styles.waitimage} source={require('../assets/wait.png')} />
      <Text style={TextStyles.waitscreentxt}>{textStrings.waitTitleTxt}</Text>
    </View>
  );
};

export default WaitScreen;

const styles = StyleSheet.create({
  waitContentContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  waitimage: {
    width: w('60%'),
    height: h('21%'),
    resizeMode: 'contain',
  },
});
