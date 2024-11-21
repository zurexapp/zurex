import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {maincolor, redcolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const VerficationCodeScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <KeyboardAwareScrollView>
      <View style={styles.screencont}>
        <LoginUprHeader isTamara={true} />
        <View
          style={{
            width: '100%',
            height: h('59%'),
          }}>
          <View
            style={{
              width: '100%',
              height: h('47%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
            <View style={{width: '100%', marginTop: h('3%')}}>
              <Text style={TextStyles.verificationCodemainhed}>
                {textStrings.enterVerfCodeTxt}
              </Text>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text style={TextStyles.verifcationcodesentdesc}>
                  {textStrings.enterVerfSubTxt}
                  {'\n'}
                  <Text style={{color: redcolor}}>(+966 569551312)</Text>
                </Text>
                <TouchableOpacity>
                  <Text style={TextStyles.verficationchangenumber}>
                    {textStrings.enterVerfChangNum}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                height: w('15%'),
                alignSelf: 'center',
                backgroundColor: '#FBFBFB',
              }}>
              <Text
                style={{
                  ...TextStyles.verifCodeScreentxt,
                  marginBottom: h('1.5%'),
                }}>
                {textStrings.verfCode}
              </Text>
              <CodeField
                ref={ref}
                value={value}
                onChangeText={setValue}
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[TextStyles.celltxt, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: h('3%'),
              }}>
              <TouchableOpacity>
                <Text style={TextStyles.verificationresendtxt}>
                  {textStrings.reSendTxt}
                </Text>
              </TouchableOpacity>
              <Text style={TextStyles.verifcationtime}>00:58</Text>
            </View>
          </View>

          <AppBtn
            title={textStrings.followUpTxt}
            isDisabled={value?.length < 4 ? true : false}
            clickfun={() => navigation.navigate('verificationIdentityScreen')}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: h('6%'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VerficationCodeScreen;

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: w('72%'),
    height: w('15.1%'),
  },

  focusCell: {
    borderColor: 'red',
  },
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
