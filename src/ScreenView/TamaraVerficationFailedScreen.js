import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const TamaraVerficationFailedScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const phoneInput = useRef();
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
                width: w('21%'),
                height: w('21%'),
                resizeMode: 'contain',
                marginBottom: h('3%'),
              }}
              source={require('../assets/failicon.png')}
            />
            <Text
              style={{
                ...TextStyles.verificationtxt,
                width: '85%',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {textStrings.UnVerifcationConfirmedTitle}
            </Text>
            <Text style={TextStyles.verificationsubtxt}>
              {textStrings.UnVerifcationConfirmedSubTitle}
            </Text>
          </View>
          <AppBtn
            title={textStrings.returnTxt}
            clickfun={() => navigation.navigate('home4btn')}
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
          }}>
          <TouchableOpacity
            style={{
              width: '75%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}>
            <Text style={TextStyles.loginbotonswitchnav}>
              {textStrings.gettinHelpTxt}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default TamaraVerficationFailedScreen;

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
