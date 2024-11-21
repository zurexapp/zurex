import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import {c0color, greencolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBtn from '../Components/AppBtn';
import {useTranslation} from '../Text/TextStrings';
import TextStyles from '../Text/TextStyles';

const ConfirmCardataScreenDup = ({navigation, route}) => {
  const {textStrings} = useTranslation();

  const [isSelectedExam, setisSelectedExam] = useState(false);
  const {params} = route;
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.carsTxt}
        iconName1={'left'}
        iconName2={''}
        firstbtnFun={() => navigation.goBack()}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <View style={styles.cardContainerMain}>
          <View style={styles.cardimgContainer}>
            <Image
              style={{
                width: '100%',
                resizeMode: 'contain',
                height: h('5%'),
              }}
              source={require('../assets/pngwing.com.png')}
            />
          </View>
          <View style={styles.cardtxtContainer}>
            <Text style={TextStyles.confirmcardatatitletxtcard}>BMW</Text>
            <Text style={TextStyles.confirmcardatadesctxtcard}>
              {textStrings.carCategoryTxt} :
              <Text style={{color: 'black'}}>
                {textStrings.seventhCategoryTxt}
              </Text>
            </Text>
            <Text style={TextStyles.confirmcardatadesctxtcard}>
              {textStrings.carPlateTxt} :
              <Text style={{color: 'black'}}>7.8339 - 90</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setisSelectedExam(!isSelectedExam)}
          style={styles.mainbtndivsel}>
          <View
            style={{
              ...styles.mainbtndiviconcont,
              backgroundColor: isSelectedExam ? greencolor : 'rgba(0,0,0,0.3)',
            }}>
            <Icon name="done" size={h('2.7%')} color={'white'} />
          </View>

          <Text style={TextStyles.confirmcardatamainbtndivseltxt}>
            {textStrings.confirmCarDataTxt}
          </Text>
        </TouchableOpacity>
      </View>
      <AppBtn
        title={textStrings.nextTxt}
        clickfun={() => navigation.replace('BatteryTypeScreen')}
      />
    </View>
  );
};

export default ConfirmCardataScreenDup;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  mainbtndivsel: {
    width: w('90%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: h('3%'),
  },
  mainbtndivseltxt: {
    width: w('79%'),
    lineHeight: h('3%'),
    fontSize: h('2.3%'),
  },
  mainbtndiviconcont: {
    height: h('4.2%'),
    width: h('4.2%'),
    borderRadius: h('7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerMain: {
    width: '90%',
    height: h('13%'),
    paddingVertical: h('1%'),
    backgroundColor: '#FBFBFB',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    borderRadius: 5,
  },
  cardimgContainer: {
    width: w('10%'),
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  cardtxtContainer: {
    width: w('70%'),
    height: '90%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  titletxtcard: {
    fontSize: h('2.5%'),
    color: 'black',
  },
  desctxtcard: {
    fontSize: h('2.2%'),
    color: c0color,
  },
});
