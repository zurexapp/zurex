import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import LoadingModal from '../Components/LoadingModal';
import {getMYServicesReq} from '../DataBase/databaseFunction';
import {setMySupportServicesData} from '../store/projectSlice';
const BalanceScreenNew = ({navigation}) => {
  const {textStrings} = useTranslation();

  const focus = useIsFocused();
  const {isAuth} = useSelector(state => state.auth);
  const [loadingModal, setloadingModal] = useState(false);
  const {mySupportServicesData} = useSelector(state => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    const getmyServicesRequest = async () => {
      setloadingModal(true);
      const support = await getMYServicesReq(`${isAuth?.userId}`);
      dispatch(setMySupportServicesData({mySupportServicesData: support}));
      setloadingModal(false);
    };
    navigation.addListener('focus', () => {
      if (isAuth === null) {
        navigation.replace('Login', {routeName: 'home4btn'});
      } else {
        getmyServicesRequest();
      }
    });
  }, [navigation, isAuth, focus, dispatch]);

  const paymentMethods = [
    {
      firstTxt: textStrings.balanceTxt,
      subtext: textStrings.balanceSubTxt,
      value: `${isAuth?.balance ? isAuth?.balance : 0} ${
        textStrings.currencyTxt
      }`,
      id: 0,
    },
    {
      firstTxt: textStrings.supportTxt,
      subtext: textStrings.supportSubTxt,
      value: `${
        mySupportServicesData?.length > 0 ? mySupportServicesData?.length : 0
      } ${textStrings.requestTxt}`,
      id: 1,
    },
  ];
  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.balanceTxt}
          iconName1={'left'}
          firstbtnFun={() => navigation.pop()}
        />
        <View style={styles.otherContent}>
          <Image
            source={require('../assets/undraw_wallet.png')}
            style={styles.balanceImg}
          />
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
              <View style={styles.pointContainer}>
                <View style={styles.firstTxtCont}>
                  <Text style={TextStyles.balancemainTxt}>
                    {item?.firstTxt}
                  </Text>
                  <Text style={TextStyles.balancesubtxt}>{item?.subtext}</Text>
                </View>
                <View style={styles.firstTxtCont}>
                  <Text style={TextStyles.balancevaluetxt}>{item?.value}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

export default BalanceScreenNew;

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
});
