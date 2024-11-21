import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {useDispatch, useSelector} from 'react-redux';
import {setIsArabicLanguage} from '../store/authSlice';
import {useTranslation} from '../Text/TextStrings';
import {useState} from 'react';
import {WhiteColor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginUprHeader = ({
  isTamara,
  children,
  imgSrc,
  changeImageFun,
  isLanguageSwich,
}) => {
  //isLanguageSwich = true;
  const [loadingModal, setloadingModal] = useState(false);
  const {textStrings} = useTranslation();

  const dispatch = useDispatch();
  const {isArabicLanguage} = useSelector(state => state.auth);
  const switchLanguage = async () => {
    const langValue = isArabicLanguage ? 'english' : 'arabic';
    setloadingModal(true);
    await dispatch(setIsArabicLanguage({isArabicLanguage: !isArabicLanguage}));
    await AsyncStorage.setItem('ac-zuex-client-language', langValue);
    setloadingModal(false);
  };
  return (
    <ImageBackground
      style={styles.hadershow}
      source={require('../assets/fancyheaderbg.png')}>
      {imgSrc ? (
        <TouchableOpacity style={styles.imgBtnOverlay} onPress={changeImageFun}>
          <Image
            style={styles.logoimg2}
            source={imgSrc ? imgSrc : require('../assets/logo.png')}
          />
        </TouchableOpacity>
      ) : (
        <Image style={styles.logoimg} source={require('../assets/logo.png')} />
      )}

      {isTamara && (
        <Image
          style={styles.logoimgtamara}
          source={require('../assets/tamara.png')}
        />
      )}
      {isLanguageSwich ? (
        <TouchableOpacity
          style={styles.languageSwitcher}
          onPress={switchLanguage}>
          <Text style={{...TextStyles.aboutanswertxt, color: WhiteColor}}>
            {isArabicLanguage ? 'Engish' : 'العربية'}
          </Text>
        </TouchableOpacity>
      ) : null}
      {children}
    </ImageBackground>
  );
};

export default LoginUprHeader;

const styles = StyleSheet.create({
  hadershow: {
    width: '100%',
    height: h('15%'),
    position: 'relative',
    marginBottom: h('9%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logoimg: {
    width: w('39%'),
    height: w('39%'),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -h('14%'),
    alignSelf: 'center',
  },
  imgBtnOverlay: {
    position: 'absolute',
    bottom: -h('10%'),
    alignSelf: 'center',
  },
  logoimg2: {
    width: w('39%'),
    height: w('39%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: w('39%'),
  },
  languageSwitcher: {
    top: h('2%'),
    left: 10,
    width: 'auto',
    minHeight: h('5%'),
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: w('2%'),
    borderRadius: w('2%'),
    borderColor: WhiteColor,
    borderWidth: 1,
  },
  logoimgtamara: {
    width: w('20%'),
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    right: 10,
  },
});
