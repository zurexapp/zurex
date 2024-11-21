import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {maincolor, redcolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import LoginUprHeader from '../Components/LoginUprHeader';
import CustomBtn from '../Components/CustomBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';

const VerficationIdentityScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [value, setValue] = useState('');
  const [openModal, setopenModal] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.screencont}>
        <LoginUprHeader isTamara={true} />
        <View
          style={{
            width: '100%',
            height: h('63%'),
          }}>
          <View
            style={{
              width: '100%',
              height: h('51%'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}>
            <View style={{width: '100%', marginTop: h('3%')}}>
              <Text
                style={{
                  ...TextStyles.oilfilterrefiltxt,
                  color: maincolor,
                  marginBottom: h('1.1%'),
                  width: '90%',
                }}>
                {textStrings.idVerificationTitle}
              </Text>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text
                  style={{
                    ...TextStyles.verifcationcodesentdesc,
                    marginBottom: h('0.6%'),
                  }}>
                  {textStrings.verfIdSubTxt}(
                  <Text style={{color: redcolor}}>+966 569551312</Text>)
                </Text>
                <Text style={TextStyles.verficationidnotetxt}>
                  {textStrings.verfIdSubTxt1}
                </Text>
                <TouchableOpacity>
                  <Text style={TextStyles.verficationchangenumber}>
                    {textStrings.lernMoreTxt}
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
              <View
                style={{
                  width: '100%',
                  height: h('9%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                }}>
                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      ...TextStyles.tamaralogininputtxt,
                      width: '100%',
                    }}>
                    {textStrings.resdNumTxt}
                  </Text>
                  <View
                    style={{
                      width: '100%',
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
                    <TextInput
                      style={{
                        ...TextStyles.textinputfamilyclassAll,
                        flex: 1,
                        height: '100%',
                        fontSize: h('2.6%'),
                        marginLeft: 10,
                      }}
                      returnKeyType="done"
                      value={value}
                      onChangeText={text => setValue(text)}
                    />
                    <Icon2
                      name="info-outline"
                      size={h('3.5%')}
                      color={textcolor}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={TextStyles.verificationresendtxt}> </Text>
              <Text style={TextStyles.verifcationtime}>00:58</Text>
            </View>
          </View>

          <AppBtn
            title={textStrings.followUpTxt}
            isDisabled={value?.length < 4 ? true : false}
            clickfun={() => setopenModal(!openModal)}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: h('2%'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}></View>
        <Modal
          visible={openModal}
          transparent
          onRequestClose={() => setopenModal(!openModal)}>
          <View style={styles.blacktransparentdiv}>
            <TouchableOpacity
              onPress={() => setopenModal(!openModal)}
              style={{flex: 1, width: '100%'}}
            />
            <View style={styles.optionContainer}>
              <View
                style={{
                  width: '90%',
                  height: h('20%'),
                  alignSelf: 'center',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                }}>
                <Text style={TextStyles.tipscreenmainQuestionText}>
                  {textStrings.vIdModelMainTxt}{' '}
                </Text>
                <Text
                  style={{...TextStyles.aboutanswertxt, fontSize: scale(14)}}>
                  {textStrings.vIdModelSubTxt}
                </Text>
              </View>
              <View
                style={{
                  height: h('20%'),
                  width: '100%',
                }}>
                <CustomBtn
                  title={textStrings.vIdModelbtn1Txt}
                  bgColor={maincolor}
                  secColor={'white'}
                  clickfun={() =>
                    navigation.navigate('verificationSuccessScreen')
                  }
                />
                <CustomBtn
                  title={textStrings.vIdModelbtn2Txt}
                  borderColor={'transparent'}
                  bgColor={'#E5E5E5'}
                  secColor={'black'}
                  clickfun={() => {
                    setopenModal(!openModal);
                    navigation.navigate('verificationFailedScreen');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VerficationIdentityScreen;

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: w('72%'),
    height: w('15.1%'),
  },
  cell: {
    width: w('15%'),
    height: w('15%'),
    lineHeight: w('15%'),
    fontSize: 24,
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderColor: '#BFD0E5',
    textAlign: 'center',
    marginRight: w('3%'),
    borderRadius: 5,
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
  blacktransparentdiv: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  optionContainer: {
    width: '100%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: h('50%'),
    borderTopLeftRadius: h('5%'),
    borderTopRightRadius: h('5%'),
  },
});
