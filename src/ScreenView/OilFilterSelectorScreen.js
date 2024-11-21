import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import AppBtn from '../Components/AppBtn';
import TextStyles from '../Text/TextStyles';
import {redcolor} from '../assets/Colors';
import {useTranslation} from '../Text/TextStrings';
const OilFilterSelectorScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  let oildata = [
    {
      title: textStrings.oilNameSelectTitle1,
      img: require('../assets/logo-short.png'),
      offer: textStrings.oilOfferIncludedTxt,
      price: '105',
      isSelected: true,
      id: 0,
    },
    {
      title: textStrings.oilNameSelectTitle2,
      img: require('../assets/shellheliux.png'),
      offer: textStrings.oilOfferIncludedTxt,
      price: '105',
      isSelected: true,
      id: 1,
    },
    {
      title: textStrings.oilNameSelectTitle3,
      img: require('../assets/castrol.png'),
      offer: textStrings.oilOfferNotIncludedTxt,
      price: '110',
      isSelected: true,
      id: 2,
    },
    {
      title: textStrings.oilNameSelectTitle4,
      img: require('../assets/mobil.png'),
      offer: textStrings.oilOfferNotIncludedTxt,
      price: '120',
      isSelected: true,
      id: 3,
    },
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.oilFilterTitleTxt}
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
          ListFooterComponent={
            <View
              style={{
                width: '95%',
                height: h('22%'),
                alignSelf: 'center',
                marginTop: h('1%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                marginVertical: h('2%'),
              }}>
              <AppBtn
                title={textStrings.completeOrder}
                clickfun={() => navigation.navigate('addOilRequestScreen')}
              />
            </View>
          }
          renderItem={({item}) => (
            <View style={styles.mainConatinerCardOil}>
              <View style={styles.imageContainer}>
                <Image
                  source={item?.img}
                  style={{
                    width: '100%',
                    height: h('7%'),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={styles.txtContainer}>
                <Image
                  source={require('../assets/fillertick.png')}
                  style={{
                    width: h('3%'),
                    height: h('4%'),
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: h('1%'),
                    right: h('1.3%'),
                  }}
                />
                <Text style={TextStyles.oilselectrmainheadingtxt}>
                  {item?.title}
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
                      lineHeight: h('3.7%'),
                    }}>
                    {item?.price} $
                  </Text>
                </View>
                <View style={styles.linComp}>
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
        />
      </View>
    </View>
  );
};

export default OilFilterSelectorScreen;

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
    height: h('18%'),
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
