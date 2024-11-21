import {StyleSheet, Text, View, Image, Modal} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import CustomBtn from '../Components/CustomBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurentOrderProductData,
  setEnableCardData,
  setOrderProcessName,
} from '../store/orderProcessSlice';
import {webengage} from '../webengage';

const OrderCompletedScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();

  // Extract orderId from route params
  const {orderId} = route.params;
  console.log(orderId);

  const {curentOrderProductData} = useSelector(state => state.orderProcess);

  const dispatch = useDispatch();
  const setDefault = async () => {
    await dispatch(setOrderProcessName({orderProcessName: ''}));
    await dispatch(setEnableCardData({enableCardData: false}));
    await dispatch(setCurentOrderProductData({curentOrderProductData: null}));
  };

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp name={' '} />
        <View style={styles.otherContent}>
          <Image
            style={styles.mainimage}
            source={require('../assets/ordsercomplet.png')}
          />
          <Text style={TextStyles.ordercompletemaintxt}>
            {textStrings.orderSuccess}
          </Text>
          <Text style={TextStyles.ordercompletemaintxt1}>
            {`Order ID: ${orderId}`}
          </Text>
          <Text
            style={{
              ...TextStyles.ordercompletesubtext,
              width: '80%',
              marginBottom: h('6%'),
              color: 'black',
            }}>
            {textStrings.loremTxt}
          </Text>

          <View style={styles.btnConatiners}>
            <CustomBtn
              title={textStrings.homeBtnTxt}
              bgColor={'white'}
              secColor={maincolor}
              clickfun={async () => {
                await setDefault();
                navigation.replace('home4btn');
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderCompletedScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  mainimage: {
    width: w('90%'),
    resizeMode: 'contain',
    height: h('30%'),
  },
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  btnConatiners: {
    width: w('90%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: '49%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
