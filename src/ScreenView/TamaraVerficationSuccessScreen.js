import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const TamaraVerficationSuccessScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.screencont}>
        <LoginUprHeader isTamara={true} />

        <View
          style={{
            width: '100%',
            height: h('55%'),
          }}>
          <View
            style={{
              width: '100%',
              height: h('41%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Image
              style={{
                width: w('25%'),
                height: w('25%'),
                resizeMode: 'contain',
                marginBottom: h('3%'),
              }}
              source={require('../assets/successicon.png')}
            />
            <Text style={TextStyles.verificationtxt}>
              {textStrings.verifcationConfirmedTitle}
            </Text>
            <Text style={TextStyles.verificationsubtxt}>
              {textStrings.verifcationConfirmedSubTitle}
            </Text>
          </View>
          <AppBtn
            title={textStrings.followUpTxt}
            clickfun={() => navigation.navigate('paymentCompleteScreen')}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: h('10%'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default TamaraVerficationSuccessScreen;

const styles = StyleSheet.create({
  hadershow: {
    width: '100%',
    height: h('25%'),
    position: 'relative',
    marginBottom: h('9%'),
  },
  logoimg: {
    width: w('39%'),
    height: w('39%'),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -h('11%'),
    alignSelf: 'center',
  },
  screencont: {
    width: w('100%'),
    height: h('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
