import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/AntDesign';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {maincolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const TamaraLoginScreen = ({navigation}) => {
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
              height: h('40%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  ...TextStyles.oilfilterrefiltxt,
                  color: maincolor,
                  width: '90%',
                }}>
                {textStrings.tamareaLoginTxt}
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <Text style={TextStyles.tamaralogininputtxt}>
                {textStrings.loginInputFieldTxt1}
              </Text>
              <View
                style={{
                  width: '90%',
                  height: h('7%'),
                  alignSelf: 'center',
                  backgroundColor: '#FBFBFB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#BFD0E5',
                  borderRadius: 6,
                  paddingHorizontal: 10,
                }}>
                <Icon name="mobile1" size={h('3.5%')} color={textcolor} />

                <View
                  style={{
                    flex: 1,
                    height: '100%',
                    fontSize: h('2.6%'),
                  }}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={`${value}`}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      paddingVertical: 0,
                    }}
                    textInputStyle={{
                      backgroundColor: 'transparent',
                      marginVertical: 0,
                    }}
                    textContainerStyle={{
                      paddingVertical: 0,
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                    defaultCode="SA"
                    disableArrowIcon
                    layout="second"
                    onChangeText={text => {
                      setValue(text);
                    }}
                    onChangeFormattedText={text => {
                      setFormattedValue(text);
                    }}
                    withDarkTheme
                    placeholder={textStrings.loginInputFieldTxt1}
                  />
                </View>
              </View>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text
                  style={{...TextStyles.tamarloginrequestnum, width: '100%'}}>
                  {textStrings.tamarMobileVerfSub}
                </Text>
              </View>
            </View>
          </View>

          <AppBtn
            title={textStrings.followUpTxt}
            clickfun={() => navigation.navigate('verificationScreen')}
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

export default TamaraLoginScreen;

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
