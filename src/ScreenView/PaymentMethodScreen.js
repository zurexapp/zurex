import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';

const PaymentMethodScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const paymentMethods = [
    {
      smallImgSrc: require('../assets/Visa.png'),
      Cickfun: () => {},
      id: 0,
    },
    {
      smallImgSrc: require('../assets/mada.png'),
      Cickfun: () => {},
      id: 1,
    },
    {
      smallImgSrc: require('../assets/stcpay.png'),
      Cickfun: () => {},
      id: 2,
    },
    {
      smallImgSrc: require('../assets/applepay.png'),
      Cickfun: () => {},
      id: 3,
    },
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.payMethodTxt}
        iconName1={'left'}
        iconName2={''}
        firstbtnFun={() => navigation.goBack()}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <FlatList
          keyExtractor={item => item.id}
          data={paymentMethods}
          ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
          ListFooterComponent={
            <View
              style={{
                width: '95%',
                height: h('5%'),
                alignSelf: 'center',
                marginTop: h('1%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={item.Cickfun}
              style={styles.pointContainer}>
              <ImageBackground
                resizeMode="contain"
                style={styles.creditcardimg}
                source={require('../assets/creditcard.png')}>
                <View style={styles.imageContainerSmall}>
                  <Image source={item.smallImgSrc} style={styles.smallImageS} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default PaymentMethodScreen;

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
    height: h('30%'),
    alignSelf: 'center',
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
});
