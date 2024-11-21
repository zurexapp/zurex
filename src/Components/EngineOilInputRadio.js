import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WhiteColor, greencolor, maincolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const EngineOilInputRadio = ({
  title,
  isSelectedItem,
  selectionFunc,
  price,
  isRadio,
  children,
}) => {
  const {textStrings} = useTranslation();
  const [isSelectedExam, setisSelectedExam] = useState(
    isSelectedItem ? isSelectedItem : false,
  );
  return (
    <>
      {isRadio ? (
        <View style={styles.optionContainerMain}>
          <View
            style={{
              ...styles.optionContainer,
              borderColor: !isSelectedExam ? '#BFD0E5' : 'red',
            }}>
            <TouchableOpacity
              onPress={() => {
                setisSelectedExam(!isSelectedExam);
                selectionFunc();
              }}
              style={styles.firstContainer}>
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
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  ...TextStyles.choiceinputmainbtndivseltxt,
                  textAlign: 'left',
                }}>
                {title}
              </Text>
            </TouchableOpacity>
            <Text
              style={{...TextStyles.customDropdowntitletxt, color: maincolor}}>
              {price} {textStrings.currencyTxt}
            </Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            selectionFunc();
          }}
          style={styles.optionContainerMain}>
          <View
            style={{
              ...styles.optionContainer,
            }}>
            {children ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: w('15%'),
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                {children}
              </View>
            ) : null}
            <View style={styles.firstContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  ...TextStyles.choiceinputmainbtndivseltxt,
                  textAlign: 'left',
                }}>
                {title}
              </Text>
            </View>
            <Text
              style={{...TextStyles.customDropdowntitletxt, color: maincolor}}>
              {price} {textStrings.currencyTxt}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default EngineOilInputRadio;

const styles = StyleSheet.create({
  inputMainModalContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingTop: h('10%'),
  },
  orignalCardContainer: {
    width: Dimensions.get('screen').width - 90,
    alignSelf: 'center',
    backgroundColor: WhiteColor,
  },
  optionContainerMain: {
    width: Dimensions.get('screen').width - 40,
    alignSelf: 'center',
  },
  optionContainer: {
    width: '100%',
    height: h('7.5%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: h('2%'),
    paddingHorizontal: 10,
  },
  firstContainer: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  secContainer: {
    height: '100%',
    width: '54%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  iNPUTmAINcONTAINER: {
    width: '85%',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
