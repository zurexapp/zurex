import {StyleSheet, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {maincolor, textcolor} from '../assets/Colors';
import CustomBtn from '../Components/CustomBtn';
import CustomDropDownBtn from '../Components/CustomDropDownBtn';
import AppBtn from '../Components/AppBtn';
import {useTranslation} from '../Text/TextStrings';
import {useSelector} from 'react-redux';
const MyOrderFollowUpPay = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [selectedOil, setselectedOil] = useState('');
  const [selectedBattery, setselectedBattery] = useState('');
  const {orderProcessName} = useSelector(state => state.orderProcess);
  // oilFilter battery tyre
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.myOrder}
        iconName1={'left'}
        iconName2={''}
        firstbtnFun={() => navigation.goBack()}
        secbtnFun={() => console.log('back')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <ScrollView>
          <View style={styles.containerContent}>
            <CustomBtn
              clickfun={() => navigation.navigate('Order')}
              title={textStrings.addToCartTxt}
              iconName="shoppingcart"
            />
            <CustomBtn
              clickfun={() => console.log('check')}
              title={textStrings.anOtherReqTxt}
            />
            {orderProcessName === 'oilFilter'}
            <CustomDropDownBtn
              title={textStrings.batteryTxt}
              mainHeading={textStrings.batteryListTxt}
              value={selectedBattery}
              onCangeValue={text => setselectedBattery(text)}
              listData={[
                {title: '5 W - 10', value: '5w', id: 0},
                {title: '10 W - 20', value: '10w', id: 1},
                {title: '15 W - 30', value: '15w', id: 2},
                {title: '20 W - 40', value: '20w', id: 3},
                {title: '25 W - 50', value: '25w', id: 4},
              ]}
            />
            <CustomDropDownBtn
              mainHeading={textStrings.oilListTxt}
              listData={[
                {title: '5 L - 10', value: '5w', id: 0},
                {title: '10 L - 20', value: '10w', id: 1},
                {title: '15 L - 30', value: '15w', id: 2},
                {title: '20 L - 40', value: '20w', id: 3},
                {title: '25 L - 50', value: '25w', id: 4},
              ]}
              title={textStrings.oilTxt}
              value={selectedOil}
              onCangeValue={text => setselectedOil(text)}
            />
            <CustomDropDownBtn
              mainHeading={textStrings.batteryTxt}
              listData={[
                {title: '5 L - 10', value: '5w', id: 0},
                {title: '10 L - 20', value: '10w', id: 1},
                {title: '15 L - 30', value: '15w', id: 2},
                {title: '20 L - 40', value: '20w', id: 3},
                {title: '25 L - 50', value: '25w', id: 4},
              ]}
              title={textStrings.oilTxt}
              value={selectedOil}
              onCangeValue={text => setselectedOil(text)}
            />
            <AppBtn
              title={textStrings.folowUpPayTxt}
              clickfun={() =>
                navigation.navigate('Login', {
                  routeName: 'CompletePaymentScreen',
                })
              }
            />
            <View
              style={{
                width: '90%',
                height: h('23%'),
                alignSelf: 'center',
                backgroundColor: maincolor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/1.png')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyOrderFollowUpPay;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: h('25%'),
    resizeMode: 'contain',
    borderRadius: h('4%'),
    position: 'absolute',
    top: -h('12%'),
  },
  headerDivCont: {
    width: '100%',
    height: h('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('6.5%'),
  },
  headerbtn: {
    width: w('15%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  reddot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
    top: h('2%'),
    right: w('3%'),
  },
  screenname: {
    width: w('70%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  pointContainer: {
    width: w('90%'),
    height: h('10%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: w('5%'),
    borderWidth: 1,
    borderColor: '#BFD0E5',
    backgroundColor: '#FBFBFB',
  },
  SrNumberCont: {
    width: '100%',
    marginBottom: h('1.2%'),
  },
  MainTextCont: {
    width: '100%',
  },
  creditcardimg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
  smallImageS: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainerSmall: {
    position: 'absolute',
    top: h('2.5%'),
    left: w('6%'),
    width: w('18%'),
    height: h('5%'),
    paddingHorizontal: h('1%'),
    paddingVertical: h('1.1%'),
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  balanceImg: {
    width: '90%',
    height: h('26%'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: h('4%'),
  },
  firstTxtCont: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  mainTxt: {fontSize: h('2.3%'), color: textcolor, marginBottom: h('0.5%')},
  subtxt: {fontSize: h('1.8%'), color: textcolor},
  valuetxt: {fontSize: h('2.3%'), color: textcolor, fontWeight: 'bold'},
  containerContent: {
    width: w('100%'),
    height: h('85.5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});
