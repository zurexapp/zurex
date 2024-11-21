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

const OilInputRadio = ({
  title,
  isSelectedItem,
  orignalPrice,
  commercialPrice,
  selectionFunc,
  type,
}) => {
  const {textStrings} = useTranslation();

  const [isSelectedExam, setisSelectedExam] = useState(
    isSelectedItem ? isSelectedItem : false,
  );
  const [isShowInputField, setisShowInputField] = useState(false);
  const [openOrignalModal, setopenOrignalModal] = useState(false);
  return (
    <>
      <View style={styles.optionContainerMain2}>
        <View
          style={{
            ...styles.optionContainer,
            borderColor: !isSelectedExam ? '#BFD0E5' : 'red',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              setisSelectedExam(!isSelectedExam);
              selectionFunc();
            }}
            style={{
              ...styles.firstContainer,
              flex: 1,
              justifyContent: 'flex-start',
            }}>
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
          {type?.length > 0 ? (
            <Text
              style={{...TextStyles.customDropdowntitletxt, color: maincolor}}>
              {type === 'original' ? orignalPrice : commercialPrice}{' '}
              {textStrings.currencyTxt}
            </Text>
          ) : null}
        </View>
        {isShowInputField && (
          <View style={styles.iNPUTmAINcONTAINER}>
            <Text style={TextStyles.choiceinputinputxthead}>
              {`${textStrings.commercialPriceTxt} ${
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
                {commercialPrice}
              </Text>
              <Text
                style={{
                  ...TextStyles.textinputfamilyclassAll,
                  fontSize: h('2.3%'),
                  color: maincolor,
                }}>
                {textStrings.currencyTxt}
              </Text>
            </View>
          </View>
        )}
      </View>

      <Modal
        transparent
        visible={openOrignalModal}
        onRequestClose={() => setopenOrignalModal(!openOrignalModal)}>
        <View style={styles.inputMainModalContainer}>
          <View style={styles.orignalCardContainer}>
            <View
              style={{
                ...styles.iNPUTmAINcONTAINER,
                height: 'auto',
                paddingBottom: h('5%'),
              }}>
              <Text style={TextStyles.choiceinputinputxthead}>
                {`${textStrings.orignalPriceTxt} ${
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
                  {orignalPrice}
                </Text>
                <Text
                  style={{
                    ...TextStyles.textinputfamilyclassAll,
                    fontSize: h('2.3%'),
                    color: maincolor,
                  }}>
                  {textStrings.currencyTxt}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setopenOrignalModal(!openOrignalModal)}
            style={{width: '100%', flex: 1}}
          />
        </View>
      </Modal>
    </>
  );
};

export default OilInputRadio;

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
  optionContainerMain2: {
    width: Dimensions.get('screen').width - 40,
    alignSelf: 'center',
  },
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
