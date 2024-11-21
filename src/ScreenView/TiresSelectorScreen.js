import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';

import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {redcolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
const TiresSelectorScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  let oildata = [
    {
      title: textStrings.michlanTireTxt,
      img: require('../assets/michelan.png'),
      offer: textStrings.oilOfferIncludedTxt,
      price: '105',
      time: `2 ${textStrings.yearsOnlyTxt}`,
      isSelected: true,
      manu: textStrings.madeInFrance,
      id: 0,
    },
    {
      title: textStrings.bridgeStoneTireTxt,
      img: require('../assets/bridge.png'),
      offer: textStrings.oilOfferNotIncludedTxt,
      price: '105',
      isSelected: true,
      time: `2 ${textStrings.yearsOnlyTxt}`,
      manu: textStrings.madeInJapan,
      id: 1,
    },
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.tiresTitleTxt}
        iconName1={'left'}
        iconName2={''}
        firstbtnFun={() => navigation.goBack()}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <FlatList
          keyExtractor={item => item.id}
          data={oildata}
          ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
          renderItem={({item}) => (
            <View style={styles.mainConatinerCardOil}>
              <View style={styles.imageContainer}>
                <Image
                  source={item?.img}
                  style={{
                    width: '97%',
                    height: h('7%'),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={styles.txtContainer}>
                <Image
                  source={require('../assets/fillertick.png')}
                  style={{
                    width: h('4%'),
                    height: h('4%'),
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: h('0.3%'),
                    right: h('1.3%'),
                  }}
                />
                <Text style={TextStyles.tiresselectmainheadingtxt}>
                  {item?.title}
                </Text>
                <Text style={TextStyles.tireselectsubheadingtxt}>
                  {item?.manu}
                </Text>
                <View style={{...styles.linComp, marginVertical: h('1%')}}>
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
                      ...TextStyles.tiresselectfilltxtspae,
                      color: redcolor,
                      lineHeight: h('3.7%'),
                    }}>
                    {item?.price} $
                  </Text>
                </View>
                <View style={{...styles.linComp, marginBottom: h('1%')}}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: '100%',
                      width: h('3%'),
                    }}
                    source={require('../assets/prizeicon.png')}
                  />
                  <Text
                    style={{
                      ...TextStyles.oilsectorfilltxtspae,
                      lineHeight: h('3.7%'),
                    }}>
                    {item?.time}
                  </Text>
                </View>
                <View style={{...styles.linComp, marginBottom: h('3%')}}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: '100%',
                      width: h('3%'),
                    }}
                    source={require('../assets/offericon.png')}
                  />
                  <Text
                    style={{
                      ...TextStyles.oilsectorfilltxtspae,
                      lineHeight: h('3.7%'),
                    }}>
                    {item?.offer}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View
              style={{
                width: '100%',
                height: h('22%'),
                marginVertical: h('3%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}>
              <AppBtn
                title={textStrings.completeOrder}
                clickfun={() => navigation.navigate('addOilRequestScreen')}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default TiresSelectorScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  mainConatinerCardOil: {
    width: '90%',
    alignSelf: 'center',
    height: h('24%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
  },
  imageContainer: {
    width: '30%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  txtContainer: {
    width: '68%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  linComp: {
    width: '100%',
    height: h('3.7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
