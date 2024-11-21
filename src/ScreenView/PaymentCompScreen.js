import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const PaymentCompScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp name={textStrings.completeThePayTxt} />
      <View style={styles.otherContent}>
        <View
          style={{
            width: '100%',
            height: h('75%'),
          }}>
          <View
            style={{
              width: '100%',
              height: h('63%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Image
              style={{width: w('70%'), height: h('25%'), resizeMode: 'contain'}}
              source={require('../assets/compltePay.png')}
            />
            <Text
              style={{
                ...TextStyles.paymentcompletetxt,
                width: '80%',
                alignContent: 'center',
                textAlign: 'center',
              }}>
              {textStrings.payCompletSuccess}
            </Text>
          </View>
          <AppBtn
            title={textStrings.orderStatusTxt}
            clickfun={() => navigation.navigate('OrderCompletedScreen')}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentCompScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: h('25%'),
    resizeMode: 'contain',
    borderRadius: h('4%'),
    position: 'absolute',
    top: -h('12%'),
  },
  headerDivCont: {
    width: '100%',
    height: h('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('6.5%'),
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
  reddot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
    top: h('2%'),
    right: w('3%'),
  },
  screenname: {
    width: w('70%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  pointContainer: {
    width: w('90%'),
    minHeight: 20,
    alignSelf: 'center',
  },
  SrNumberCont: {
    width: '100%',
    marginBottom: h('1.2%'),
  },
  MainTextCont: {
    width: '100%',
  },
});
