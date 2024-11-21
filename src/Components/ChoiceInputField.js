import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {greencolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const ChoiceInputField = ({
  title,
  value,
  setValue,
  firstInput,
  secInput,
  thirdInput,
  showthem,
  inputVCalue,
  setInputVCalue,
}) => {
  const {textStrings} = useTranslation();
  const [isSelectedExam, setisSelectedExam] = useState(false);
  const [selectedOptionValue, setselectedOptionValue] = useState('');
  const [isShowInputField, setisShowInputField] = useState(false);
  return (
    <>
      {((!firstInput && !secInput && !thirdInput) || showthem) && (
        <View style={styles.optionContainerMain}>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              onPress={() => setisSelectedExam(!isSelectedExam)}
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
                style={{
                  ...TextStyles.choiceinputmainbtndivseltxt,
                  textAlign: 'left',
                }}>
                {title}
              </Text>
            </TouchableOpacity>
            <View style={styles.secContainer}>
              <TouchableOpacity
                onPress={() => {
                  setselectedOptionValue('original');
                  setisShowInputField(!isShowInputField);
                  setInputVCalue(!inputVCalue);
                }}
                style={styles.innerbtn}>
                <Text
                  style={{
                    ...TextStyles.choiceinputbtntxt,
                    color:
                      selectedOptionValue === 'original' || isSelectedExam
                        ? greencolor
                        : textcolor,
                  }}>
                  {textStrings.orignalTxt}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setselectedOptionValue('commercial');
                  setisShowInputField(!isShowInputField);
                  setInputVCalue(!inputVCalue);
                }}
                style={styles.innerbtn}>
                <Text
                  style={{
                    ...TextStyles.choiceinputbtntxt,
                    color:
                      selectedOptionValue === 'commercial' || isSelectedExam
                        ? greencolor
                        : textcolor,
                  }}>
                  {textStrings.commercialTxt}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isShowInputField && (
            <View style={styles.iNPUTmAINcONTAINER}>
              <Text style={TextStyles.choiceinputinputxthead}>
                {selectedOptionValue === 'original'
                  ? `${textStrings.orignalPriceTxt} ${
                      title ? title?.toLowerCase() : ''
                    }`
                  : `${textStrings.commercialPriceTxt} ${
                      title ? title?.toLowerCase() : ''
                    }`}
              </Text>
              <View style={styles.inputField}>
                <Text
                  style={{
                    ...TextStyles.textinputfamilyclassAll,
                    fontSize: h('2.3%'),
                    flex: 1,
                  }}>
                  {textStrings.priceInputTxtHold}
                </Text>
              </View>
              {/* <TextInput
                style={[styles.inputField, TextStyles.textinputfamilyclassAll]}
                placeholder={textStrings.priceInputTxtHold}
                keyboardType="number-pad"
                value={value}
                onChangeText={text => setValue(text)}
                onEndEditing={() => {
                  setisShowInputField(false);
                  
                  setInputVCalue(false);
                }}
              /> */}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default ChoiceInputField;

const styles = StyleSheet.create({
  optionContainerMain: {
    width: '100%',
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
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('2%'),
  },
  firstContainer: {
    height: '100%',
    width: '43%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
