import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {w, h} from 'react-native-responsiveness';
import {greencolor, maincolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';
const LineedBtnMarkBill = ({
  title,
  price,
  isShowBorder,
  isSelectedItem,
  selectionFunc,
}) => {
  const {textStrings} = useTranslation();

  const [isSelectedExam, setisSelectedExam] = useState(
    isSelectedItem ? isSelectedItem : false,
  );
  return (
    <TouchableOpacity
      onPress={() => {
        setisSelectedExam(!isSelectedExam);
        selectionFunc();
      }}
      style={{
        ...styles.optionContainer,
        borderBottomWidth: isShowBorder ? 1 : 0,
      }}>
      <View style={styles.firstContainer}>
        <View
          style={{
            ...styles.mainbtndiviconcont,
            borderColor: isSelectedExam ? greencolor : 'rgba(0,0,0,0.3)',
          }}>
          <Icon
            name="done"
            size={h('2.3%')}
            color={isSelectedExam ? greencolor : 'white'}
          />
        </View>

        <Text
          style={{...TextStyles.linedbtnmainbtndivseltxt, textAlign: 'left'}}>
          {title}
        </Text>
      </View>
      <View style={styles.secContainer}>
        <View style={styles.innerbtn}>
          <Text
            style={{
              ...TextStyles.lineedbtnbtntxt,
              fontSize: scale(14),
              color: maincolor,
            }}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LineedBtnMarkBill;

const styles = StyleSheet.create({
  optionContainerMain: {
    width: '100%',
    alignSelf: 'center',
  },
  optionContainer: {
    width: '100%',
    height: h('8%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 0,
    borderColor: '#BFD0E5',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  firstContainer: {
    height: '100%',
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  secContainer: {
    height: '100%',
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  mainbtndiviconcont: {
    height: h('3.7%'),
    width: h('3.7%'),
    borderRadius: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  innerbtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  iNPUTmAINcONTAINER: {
    width: '100%',
    height: h('25%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: h('2%'),
  },
  inputField: {
    width: '100%',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    height: h('7%'),
    fontSize: h('2.3%'),
    paddingHorizontal: w('2%'),
    marginTop: h('1%'),
  },
});
