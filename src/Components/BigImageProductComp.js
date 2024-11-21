import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {WhiteColor, borderColor, redcolor} from '../assets/Colors';
import {useTranslation} from '../Text/TextStrings';
import TextStyles from '../Text/TextStyles';
const BigImageProductComp = ({image, title, price, onClickFun}) => {
  const {textStrings} = useTranslation();
  return (
    <TouchableOpacity onPress={onClickFun} style={styles.bigImageMainContainer}>
      {image ? (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      ) : null}
      <View style={styles.txtContainer}>
        <Text numberOfLines={2} style={TextStyles.oilselectrmainheadingtxt}>
          {title}
        </Text>
        <View style={{...styles.linComp, marginVertical: h('1.7%')}}>
          <Image
            style={{
              resizeMode: 'contain',
              height: '100%',
              width: h('3%'),
            }}
            source={require('../assets/riyal_logo.jpg')}
          />
          <Text
            style={{
              ...TextStyles.oilsectorfilltxtspae,
              color: redcolor,
            }}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BigImageProductComp;

const styles = StyleSheet.create({
  imageContainer: {
    width: '30%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigImageMainContainer: {
    width: Dimensions.get('screen').width - 58,
    alignSelf: 'center',
    height: h('18%'),
    backgroundColor: WhiteColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: Platform.OS === 'android' ? 2 : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderWidth: 0.65,
    borderColor: '#BFD0E5',
    paddingHorizontal: h('1%'),
  },
  txtContainer: {
    flex: 1,
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginLeft: 10,
  },
  linComp: {
    width: '100%',
    height: h('3%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
