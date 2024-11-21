import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {greencolor, maincolor, redcolor} from '../assets/Colors';
import {scale} from 'react-native-size-matters';
import {
  setBatteryData,
  setEngineOilData,
  setEngineOilPetrolData,
  setFiltersDta,
  setOilsData,
  setTireData,
} from '../store/projectSlice';
import {useSelector, useDispatch} from 'react-redux';
import {getDataWholeCollection} from '../DataBase/databaseFunction';

const MyOrderComponents = ({
  id,
  orderStatus,
  quantity,
  Date,
  orderPrice,
  freeServicesCount,
  onPress,
  products,
}) => {
  const {textStrings} = useTranslation();
  const {isArabicLanguage} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    engineOilData,
    engineOilPetrolData,
  } = useSelector(state => state.project);

  const fetchFilters = async () => {
    if (filtersData.length === 0) {
      try {
        const filters = await getDataWholeCollection('Filters');
        dispatch(setFiltersDta({filtersData: filters}));
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    }
  };

  const fetchOils = async () => {
    if (oilsData.length === 0) {
      try {
        const Oils = await getDataWholeCollection('Oils');
        dispatch(setOilsData({oilsData: Oils}));
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    }
  };

  const fetchEngineOilPetrol = async () => {
    if (engineOilPetrolData.length === 0) {
      try {
        const engineOilDataDb = await getDataWholeCollection('engineOilPetrol');
        dispatch(
          setEngineOilPetrolData({engineOilPetrolData: engineOilDataDb}),
        );
      } catch (error) {
        console.error('Error fetching engine oil petrol:', error);
      }
    }
  };

  const fetchEngineOilDiesel = async () => {
    if (engineOilData.length === 0) {
      try {
        const engineOilDataDb = await getDataWholeCollection('engineOil');
        dispatch(setEngineOilData({engineOilData: engineOilDataDb}));
      } catch (error) {
        console.error('Error fetching engine oil diesel:', error);
      }
    }
  };

  const fetchTyresData = async () => {
    if (tireData.length === 0) {
      try {
        const tyres = await getDataWholeCollection('Tyres');
        dispatch(setTireData({tireData: tyres}));
      } catch (error) {
        console.error('Error fetching tyre data:', error);
      }
    }
  };
  const fetchBatteryData = async () => {
    if (batteryData.length === 0) {
      try {
        const btteries = await getDataWholeCollection('btteries');
        dispatch(setBatteryData({batteryData: btteries}));
      } catch (error) {
        console.error('Error fetching tyre data:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchFilters(),
        fetchTyresData(),
        fetchEngineOilPetrol(),
        fetchEngineOilDiesel(),
        fetchOils(),
        fetchBatteryData(),
      ]);
    };
    fetchData();
  });

  const getImageLink = () => {
    if (!products || products.length === 0) {
      return '';
    }
    const reference = products[0]?.referance;
    if (
      ['Filters', 'Oils', 'engineOil', 'engineOilPetrol'].includes(reference)
    ) {
      return require('../assets/oilimg.png');
    } else if (reference === 'Tyres') {
      return require('../assets/tyresimg.png');
    } else if (reference === 'btteries') {
      return require('../assets/scrensheader.png');
    } else {
      return require('../assets/logo-short.png');
    }
  };

  const findTitle = () => {
    if (!products || products.length === 0) {
      return '';
    }

    const productRef = products[0]?.referance;
    const productId = products[0].id;

    let data;
    switch (productRef) {
      case 'Filters':
        data = filtersData.find(dat => dat.id === productId);
        break;
      case 'Oils':
        data = oilsData.find(dat => dat.id === productId);
        break;
      case 'Tyres':
        data = tireData.find(dat => dat.id === productId);
        break;
      case 'btteries':
        data = batteryData.find(dat => dat.id === productId);
        break;
      case 'engineOil':
        data = engineOilData.find(dat => dat.id === productId);
        break;
      case 'engineOilPetrol':
        data = engineOilPetrolData.find(dat => dat.id === productId);
        break;
      default:
        return textStrings.productHasBeenDeleted;
    }

    const productTitle = isArabicLanguage
      ? data?.productNameArab
      : data?.productNameEng;
    return productTitle || textStrings.productHasBeenDeleted;
  };

  const getStatusColor = () => {
    if (orderStatus === 'pending' || orderStatus === 'assigned') {
      return redcolor;
    } else if (orderStatus === 'approved') {
      return greencolor;
    } else if (orderStatus === 'canceled') {
      return redcolor;
    } else {
      return maincolor;
    }
  };

  const getStatusText = () => {
    if (orderStatus === 'pending' || orderStatus === 'assigned') {
      return textStrings.orderStatusPanding;
    } else if (orderStatus === 'approved') {
      return textStrings.orderStatusApproved;
    } else if (orderStatus === 'canceled') {
      return textStrings.orderStatusCanceled;
    } else {
      return textStrings.orderStatusComplete;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.orderCradCont}>
      <View style={styles.UperConat}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              backgroundColor: maincolor,
            }}
            source={getImageLink()}
          />
        </View>
        <View style={styles.infoContainerCont}>
          <View style={styles.firstContainer}>
            <View style={styles.orderIdTextCont}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={TextStyles.myorderscreenorderid}>
                {textStrings.orderIDTxt} :
                <Text
                  style={{
                    ...TextStyles.myorderscreenorderidval,
                    fontWeight: '500',
                  }}>
                  {id}
                </Text>
              </Text>
            </View>

            <View
              style={{
                ...styles.sideBtnstatys,
                width: 95,
                borderColor: getStatusColor(),
              }}>
              <Text
                style={{
                  ...TextStyles.orderscreenststus,
                  fontSize: scale(12),
                  color: getStatusColor(),
                }}>
                {getStatusText()}
              </Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={TextStyles.myorderscreentitle}>
              {findTitle()}
            </Text>
          </View>
          <View style={styles.lowerConat}>
            <View style={styles.innerLowerCont}>
              <View style={styles.dateContainer}>
                <Image
                  source={require('../assets/calender.png')}
                  style={{
                    height: '100%',
                    width: h('3.5%'),
                    resizeMode: 'contain',
                  }}
                />
                <Text style={TextStyles.myorderscreendattxt}>
                  {Date ? `${Date}`.substring(3, Date.length) : 'DD MM YYYY'}
                </Text>
              </View>
              <View style={styles.priceConatiner}>
                <Image
                  source={require('../assets/euro.png')}
                  style={{
                    height: '100%',
                    width: h('3.5%'),
                    resizeMode: 'contain',
                  }}
                />
                <Text style={TextStyles.myorderscreendattxt}>{orderPrice}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Image
                  source={require('../assets/quantity.png')}
                  style={{
                    height: '100%',
                    width: h('3.5%'),
                    resizeMode: 'contain',
                  }}
                />
                <Text style={TextStyles.myorderscreendattxt}>
                  {quantity ? quantity : 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyOrderComponents;

const styles = StyleSheet.create({
  orderIdTextCont: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginRight: 5,
  },
  sideBtnstatys: {
    height: '100%',
    width: '37%',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    width: '23%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  priceConatiner: {
    width: '28%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateContainer: {
    width: '38%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  innerLowerCont: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  secondContainer: {
    width: '100%',
    height: h('2.5%'),
    marginVertical: h('1%'),
  },
  firstContainer: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoContainerCont: {
    width: '72%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageContainer: {
    height: h('10%'),
    width: h('10%'),
    borderRadius: h('1.5%'),
    overflow: 'hidden',
  },
  UperConat: {
    width: '100%',
    height: h('16%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  lowerConat: {
    width: '100%',
    height: h('4%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  orderCradCont: {
    width: w('90%'),
    backgroundColor: '#FBFBFB',
    height: h('16%'),
    borderWidth: 0.8,
    borderColor: '#BFD0E5',
  },
});
