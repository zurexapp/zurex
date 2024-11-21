import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppBtn from '../Components/AppBtn';
import CustomBtn from '../Components/CustomBtn';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import LoadingModal from '../Components/LoadingModal';

const SupportServicesScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const {isAuth} = useSelector(state => state.auth);
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {isArabicLanguage} = useSelector(state => state.auth);

  const {
    filtersData,
    oilCompaniesData,
    oilsData,
    tireCompaniesData,
    tireData,
    batteryData,
    myOrdersData,
    supportServicesData,
  } = useSelector(state => state.project);
  const dispatch = useDispatch();
  const [loadingModal, setloadingModal] = useState(false);
  const findTaxFn = total => {
    return Math.round((15 / 100) * total);
  };
  const batteryChrgMntn = async () => {
    setloadingModal(true);
    await dispatch(
      setCurentOrderProductData({
        curentOrderProductData: {
          ...curentOrderProductData,
          service: [supportServicesData[0]],
          orderPrice: supportServicesData[0]?.originalPrice,
          taxPrice: findTaxFn(supportServicesData[0]?.originalPrice),
          totalPrice:
            supportServicesData[0]?.originalPrice +
            findTaxFn(supportServicesData[0]?.originalPrice),
        },
      }),
    );
    setloadingModal(false);
    if (isAuth?.phoneNumber?.length > 0) {
      navigation.navigate('CompletePaymentScreen');
    } else {
      navigation.navigate('Login', {
        routeName: 'CompletePaymentScreen',
      });
    }
  };

  const warentyFun = async () => {
    setloadingModal(true);
    await dispatch(
      setCurentOrderProductData({
        curentOrderProductData: {
          ...curentOrderProductData,
          service: [supportServicesData[1]],
          orderPrice: supportServicesData[1]?.originalPrice,
          taxPrice: findTaxFn(supportServicesData[1]?.originalPrice),
          totalPrice:
            supportServicesData[1]?.originalPrice +
            findTaxFn(supportServicesData[1]?.originalPrice),
        },
      }),
    );

    setloadingModal(false);
    navigation.navigate('WarentyCarDataScreen');
  };
  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.supportTxt}
          iconName1={'left'}
          iconName2={''}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('next')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <CustomBtn
            title={textStrings.balanceTxt}
            clickfun={() => {
              if (isAuth?.phoneNumber?.length > 0) {
                navigation.navigate('BalanceScreen');
              } else {
                navigation.navigate('Login', {routeName: 'BalanceScreen'});
              }
            }}
          />
          <Text style={TextStyles.supportmainheadingtxt}>
            {textStrings.includeSupprotTxt}
          </Text>
          <View style={styles.borderedContainer}>
            <FlatList
              data={supportServicesData[0]?.products}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderColor: '#BFD0E5',
                    borderTopWidth: 0.5,
                    width: '95%',
                    alignSelf: 'center',
                  }}
                />
              )}
              renderItem={({item, index}) => (
                <View key={index} style={styles.lineComp}>
                  <Text style={TextStyles.batteriesdesctaxname}>
                    {isArabicLanguage
                      ? item?.productNameArab
                      : item?.productNameEng}
                  </Text>
                  <Icon name="done" size={h('3.3%')} color={maincolor} />
                </View>
              )}
            />
          </View>
          {/* <AppBtn title={textStrings.nextTxt} clickfun={batteryChrgMntn} /> */}
          <View style={styles.borderedContainer}>
            <FlatList
              data={supportServicesData[1]?.products}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderColor: '#BFD0E5',
                    borderTopWidth: 0.5,
                    width: '95%',
                    alignSelf: 'center',
                  }}
                />
              )}
              renderItem={({item, index}) => (
                <View key={index} style={styles.lineComp}>
                  <Text style={TextStyles.batteriesdesctaxname}>
                    {isArabicLanguage
                      ? item?.productNameArab
                      : item?.productNameEng}
                  </Text>
                  <Icon name="done" size={h('3.3%')} color={maincolor} />
                </View>
              )}
            />
          </View>
          <AppBtn title={textStrings.nextTxt} clickfun={warentyFun} />
        </View>
      </View>
      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

export default SupportServicesScreen;

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

  borderedContainer: {
    width: '90%',
    alignSelf: 'center',
    height: h('15%'),
    backgroundColor: '#FBFBFB',
    borderColor: '#BFD0E5',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    // marginVertical: h('1%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  lineComp: {
    width: w('90%'),
    height: h('7.3%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: w('2%'),
  },
  maintxtLine: {
    fontSize: h('2.3%'),
    color: 'black',
  },
});
