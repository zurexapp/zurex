import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import OrderCompleteSteps from '../Components/OrderCompleteSteps';
import OrderPriceCalculator from '../Components/OrderPriceCalculator';
import {maincolor, textcolor} from '../assets/Colors';
import AppBtn from '../Components/AppBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AwesomeAlert from 'react-native-awesome-alerts';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import LoadingModal from '../Components/LoadingModal';
import {
  cancelOrderStatus,
  getDataWithRef,
  getEmployDataWithJobrole,
} from '../DataBase/databaseFunction';
import database from '@react-native-firebase/database';
import {webengage} from '../webengage';
import LiveTrackingComp from '../Components/LiveTrackingComp';
import {setEngineOilPetrolData} from '../store/projectSlice';
import axios from 'axios';

const OrderDetailScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {data} = route.params;
  const map = useRef(null);
  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    engineOilData,
    engineOilPetrolData,
  } = useSelector(state => state.project);
  const {isArabicLanguage} = useSelector(state => state.auth);
  const [trackingModal, setTrackingModal] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cancelOrder, setcancelOrder] = useState(false);
  const [loadingModal, setloadingModal] = useState(false);
  const [driverLocation, setdriverLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  let customObjectData = {
    OrderedByUserId: data.OrderedByUserId ? data?.OrderedByUserId : 'userid',
    appointment: {
      date: data?.appointment?.date ? data?.appointment?.date : 'date',
      time: data?.appointment?.time ? data?.appointment?.time : 'time',
    },
    deliveryStatus: data?.deliveryStatus ? data?.deliveryStatus : 'not started',
    deliveryInfo: {
      cityName: data?.deliveryInfo.cityName
        ? data?.deliveryInfo.cityName
        : 'date',
      locationCoordinates: {
        latitude: data?.deliveryInfo?.locationCoordinates?.latitude
          ? data?.deliveryInfo?.locationCoordinates?.latitude
          : 0,
        longitude: data?.deliveryInfo?.locationCoordinates?.longitude
          ? data?.deliveryInfo?.locationCoordinates?.longitude
          : 0,
      },
      locationName: data?.deliveryInfo?.locationName
        ? data?.deliveryInfo?.locationName
        : 'date',
    },
    id: data?.id ? data?.id : 'date',
    orderPrice: data?.orderPrice ? data?.orderPrice : 0,
    taxPrice: data?.taxPrice ? data?.taxPrice : 0,
    totalPrice: data?.totalPrice ? data?.totalPrice : 0,
    orderStatus: data?.orderStatus ? data?.orderStatus : 'pending',
    preferdCompany: data?.preferdCompany ? data?.preferdCompany : [],
    products: data?.products ? data?.products : [],
    serviceProviderRating: data?.serviceProviderRating
      ? data?.serviceProviderRating
      : 0,
    serviceRating: data?.serviceRating ? data?.serviceRating : 0,
    TeamId: data?.TeamId ? data?.TeamId : '',
    fuelType: data?.fuelType ? data?.fuelType : 'Not specified',
  };
  console.log('Custom Object Data:', customObjectData);

  useEffect(() => {
    if (
      customObjectData?.deliveryStatus === 'started' &&
      customObjectData?.TeamId?.length > 0
    ) {
      // Define getDriverLocation inside useEffect to avoid missing dependency
      const getDriverLocation = () => {
        database()
          .ref(`/currentLocation/${customObjectData?.TeamId}`)
          .on('value', async snapShot => {
            const result = await snapShot?.val();
            setdriverLocation({
              latitude: result?.latilude,
              longitude: result?.longitude,
            });
          });
      };

      // Start polling for the driver location every 20 seconds
      const timer = setInterval(() => {
        getDriverLocation();
      }, 20000);

      // Cleanup the interval on unmount or dependency change
      return () => clearInterval(timer);
    }
  }, [customObjectData?.deliveryStatus, customObjectData?.TeamId]); // Add the required dependencies

  const getImageLink = referance => {
    if (
      referance === 'Filters' ||
      referance === 'Oils' ||
      referance === 'engineOil' ||
      referance === 'engineOilPetrol'
    ) {
      return require('../assets/oilimg.png');
    } else if (referance === 'Tyres') {
      return require('../assets/tyresimg.png');
    } else if (referance === 'btteries') {
      return require('../assets/scrensheader.png');
    } else {
      return require('../assets/logo-short.png');
    }
  };

  const refreshWithId = async () => {
    setloadingModal(true);
    const chck = await getDataWithRef('orders', data?.id);
    if (chck?.OrderedByUserId) {
      customObjectData = {
        OrderedByUserId: chck.OrderedByUserId
          ? chck?.OrderedByUserId
          : 'userid',
        appointment: {
          date: chck?.appointment?.date ? chck?.appointment?.date : 'date',
          time: chck?.appointment?.time ? chck?.appointment?.time : 'time',
        },
        deliveryStatus: chck?.deliveryStatus
          ? chck?.deliveryStatus
          : 'not started',
        TeamId: chck?.TeamId ? chck?.TeamId : '',
        deliveryInfo: {
          cityName: chck?.deliveryInfo.cityName
            ? chck?.deliveryInfo.cityName
            : 'date',
          locationCoordinates: {
            latitude: chck?.deliveryInfo?.locationCoordinates?.latitude
              ? chck?.deliveryInfo?.locationCoordinates?.latitude
              : 0,
            longitude: chck?.deliveryInfo?.locationCoordinates?.longitude
              ? chck?.deliveryInfo?.locationCoordinates?.longitude
              : 0,
          },
          locationName: chck?.deliveryInfo?.locationName
            ? chck?.deliveryInfo?.locationName
            : 'date',
        },
        id: data?.id ? data?.id : 'date',
        orderPrice: chck?.orderPrice ? chck?.orderPrice : 'date',
        orderStatus: chck?.orderStatus ? chck?.orderStatus : 'pending',
        preferdCompany: chck?.preferdCompany ? chck?.preferdCompany : [],
        products: chck?.products ? chck?.products : [],
        serviceProviderRating: chck?.serviceProviderRating
          ? chck?.serviceProviderRating
          : 0,
        serviceRating: chck?.serviceRating ? chck?.serviceRating : 0,
        fuelType: chck?.fuelType ? chck?.fuelType : 'Not specified', // Add fuelType
      };
    } else {
    }
    setloadingModal(false);
  };

  const findTitle = (referance, id) => {
    const data =
      referance === 'Filters'
        ? filtersData.find(dat => dat.id === id)
        : referance === 'engineOilPetrol'
        ? engineOilPetrolData.find(dat => dat.id === id)
        : referance === 'Oils'
        ? oilsData.find(dat => dat.id === id)
        : referance === 'Tyres'
        ? tireData.find(dat => dat.id === id)
        : referance === 'btteries'
        ? batteryData.find(dat => dat.id === id)
        : referance === 'engineOil'
        ? engineOilData.find(dat => dat.id === id)
        : {};
    const productTitle = isArabicLanguage
      ? data?.productNameArab
      : data?.productNameEng;
    return productTitle ? productTitle : textStrings.productHasBeenDeleted;
  };

  const sendNotification = async (registrationToken, title, body) => {
    console.log('Start sending notification...');

    // Ensure registrationToken is an array
    const tokens = Array.isArray(registrationToken)
      ? registrationToken
      : [registrationToken];

    for (const token of tokens) {
      try {
        // Send the notification data to the backend for each token
        const response = await axios.post(
          'https://app-xaop4bxqda-uc.a.run.app/sendNotification',
          {
            token, // Send as `token`, matching backend's expectations
            title,
            body,
          },
        );
        console.log(`Notification sent successfully to token: ${token}`);
      } catch (error) {
        console.error(
          `Error sending notification to token: ${token}`,
          error.message,
        );
      }
    }
  };

  const cancelOrderFun = async () => {
    try {
      setloadingModal(true);
      const notificationData = {
        title: 'Order Canceled',
        body: `Order with ID ${customObjectData.id} has been canceled by the User.`,
      };

      const employData = await getEmployDataWithJobrole('supervisor');

      const employDeviceTokens = [];
      for (const key in employData) {
        if (employData[key].deviceToken) {
          employDeviceTokens.push(...employData[key].deviceToken);
        }
      }
      await cancelOrderStatus(
        customObjectData.id,
        'canceled',
        'Canceled By User',
      );
      await sendNotification(
        employDeviceTokens,
        notificationData.title,
        notificationData.body,
      );
      navigation.pop();

      setloadingModal(false);
    } catch (error) {
      setloadingModal(false);
      Alert.alert(
        textStrings.productTitleEror,
        error?.message ? error?.message : error,
      );
    }
  };

  const switchTrackingModal = () => {
    if (!trackingModal) {
      webengage.track('order_tracking', {
        order_id: customObjectData.id,
        'shipping status': 'waiting',
      });
    }
    setTrackingModal(!trackingModal);
  };

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={customObjectData.id}
          iconName1={'left'}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('next')}
          reddot={false}
        />
        <View style={styles.otherContent}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loadingModal}
                onRefresh={() => refreshWithId()}
              />
            }>
            <View style={styles.borderdivcont}>
              <OrderCompleteSteps
                isSeprator={true}
                isCompleted={
                  customObjectData?.orderStatus === 'pending' ||
                  customObjectData?.orderStatus === 'assigned' ||
                  customObjectData?.orderStatus === 'approved' ||
                  customObjectData?.orderStatus === 'completed'
                    ? true
                    : false
                }
                iconName={'cube-outline'}
                time={'08:00'}
                text={textStrings.weRcevedOrderTxt + ' ' + ' 23/3'}
              />
              <OrderCompleteSteps
                isSeprator={true}
                isCompleted={
                  customObjectData?.orderStatus === 'approved' ||
                  customObjectData?.orderStatus === 'completed'
                    ? true
                    : false
                }
                iconName={'delivery-dining'}
                time={'00:00'}
                text={textStrings.orderOnWayTxt}
              />
              <OrderCompleteSteps
                isSeprator={false}
                isCompleted={
                  customObjectData?.orderStatus === 'completed' ? true : false
                }
                iconName={'cube-outline'}
                time={'00:00'}
                text={textStrings.orderCompletedTxt}
              />
            </View>
            <View style={styles.borderdivcont}>
              <FlatList
                data={customObjectData.products}
                renderItem={({item, index}) => (
                  <View key={index} style={styles.upperdomain}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={getImageLink(item.referance)}
                        style={{
                          resizeMode: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                    <View style={styles.textinfoprod}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          ...TextStyles.ordercalctaxname,
                          marginBottom: h('1.5%'),
                        }}>
                        {findTitle(item.referance, item.id)}
                      </Text>
                      <View style={styles.locationHeading}>
                        <Image
                          source={require('../assets/quantity.png')}
                          style={{
                            height: '100%',
                            width: h('4%'),
                            resizeMode: 'contain',
                          }}
                        />
                        <View style={styles.filldivTxtcont}>
                          <Text
                            style={{
                              ...TextStyles.orderdetaillocationHeadingtitle,
                              marginLeft: w('1%'),
                            }}>
                            {textStrings.quantityTxt} :{' '}
                            <Text style={TextStyles.fwbold}>
                              {item.quantity ? item.quantity : 1}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => (
                  <View style={{height: h('3%')}} />
                )}
              />

              <View
                style={{
                  ...styles.locationHeading,
                  marginBottom: 0,
                  width: '96%',
                  marginTop: h('3%'),
                  marginLeft: 4,
                }}>
                <Icon
                  name="calendar-outline"
                  size={h('3.5%')}
                  color={textcolor}
                />
                <View style={styles.filldivTxtcont}>
                  <Text
                    style={{
                      marginLeft: 6,
                      color: 'black',
                      width: 'auto',
                      fontSize: scale(14),
                    }}>
                    {customObjectData.appointment.date}
                    {', '}
                    {customObjectData.appointment.time}
                  </Text>
                </View>
              </View>

              {customObjectData.fuelType &&
                customObjectData.fuelType !== 'Not specified' && (
                  <View
                    style={{
                      ...styles.locationHeading,
                      marginBottom: 0,
                      width: '96%',
                      marginTop: h('3%'),
                    }}>
                    <Icon name="car-sport" size={h('3.5%')} color={textcolor} />
                    <View style={styles.filldivTxtcont}>
                      <Text
                        style={{
                          ...TextStyles.orderdetaillocationHeadingtitle,
                          width: 'auto',
                        }}>
                        {textStrings.fuelTypeTxt}
                      </Text>
                      <Text
                        style={{
                          ...TextStyles.orderdetaillocationHeadingtitle,
                          color: 'black',
                          width: 'auto',
                          fontSize: scale(14),
                        }}>
                        {customObjectData.fuelType}
                      </Text>
                    </View>
                  </View>
                )}
            </View>
            <View style={{...styles.borderdivcont, paddingBottom: 0}}>
              <View style={styles.locationHeading}>
                <Icon
                  name="location-sharp"
                  size={h('3.5%')}
                  color={textcolor}
                />
                <Text style={TextStyles.orderdetaillocationHeadingtitle}>
                  {textStrings.recepiantAddressTxt}
                </Text>
              </View>
              <Text style={TextStyles.orderdetaillocationtitle}>
                {customObjectData.deliveryInfo.locationName}
              </Text>
              {customObjectData?.deliveryInfo?.locationCoordinates.latitude !==
                0 &&
              customObjectData?.deliveryInfo?.locationCoordinates.longitude !==
                0 ? (
                <MapView
                  ref={map}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.mapbtn}
                  initialRegion={{
                    latitude:
                      customObjectData?.deliveryInfo?.locationCoordinates
                        .latitude,
                    longitude:
                      customObjectData?.deliveryInfo?.locationCoordinates
                        .longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    coordinate={{
                      latitude:
                        customObjectData?.deliveryInfo?.locationCoordinates
                          .latitude,
                      longitude:
                        customObjectData?.deliveryInfo?.locationCoordinates
                          .longitude,
                    }}
                    pinColor={maincolor}
                    title={textStrings.curntLocationTxt}
                    identifier="Your Current Location"
                  />
                </MapView>
              ) : (
                <TouchableOpacity style={styles.mapbtn}>
                  <Image
                    source={require('../assets/map.png')}
                    style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <OrderPriceCalculator
              taxesdat={[
                {
                  name: textStrings.priceTxt,
                  price: customObjectData.orderPrice,
                  id: 0,
                },
                {name: textStrings.wagesTxt, price: 0, id: 1},
                {
                  name: textStrings.taxTxt,
                  price: customObjectData.taxPrice,
                  id: 2,
                },
              ]}
              total={customObjectData.totalPrice}
            />
            {customObjectData.orderStatus !== 'approved' ? (
              <>
                <AppBtn
                  title={
                    customObjectData.orderStatus === 'pending' ||
                    customObjectData?.orderStatus === 'assigned'
                      ? textStrings.cancelTxt
                      : customObjectData.orderStatus === 'completed'
                      ? textStrings.rateUsTxt
                      : ''
                  }
                  clickfun={() => {
                    if (
                      customObjectData.orderStatus === 'pending' ||
                      customObjectData?.orderStatus === 'assigned'
                    ) {
                      setcancelOrder(!cancelOrder);
                    } else {
                      setshowAlert(!showAlert);
                    }
                  }}
                />
                <View style={{marginBottom: 100}} />
              </>
            ) : null}
            {customObjectData.orderStatus === 'approved' &&
            customObjectData.deliveryStatus === 'started' ? (
              <AppBtn
                title={textStrings.trackingOrderTxt}
                clickfun={switchTrackingModal}
              />
            ) : null}
            <View style={{height: h('5%')}} />
          </ScrollView>
        </View>
        <AwesomeAlert
          show={cancelOrder}
          showProgress={false}
          title={textStrings.delOrderTitle}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText={textStrings.goNowBtnTxt}
          confirmText={textStrings.noBtnTxt}
          confirmButtonColor="transparent"
          onCancelPressed={cancelOrderFun}
          onConfirmPressed={() => {
            setcancelOrder(!cancelOrder);
          }}
          confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
          cancelButtonColor="transparent"
          cancelButtonTextStyle={{color: maincolor, fontSize: h('2.3%')}}
          cancelButtonStyle={{marginRight: h('10%')}}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={textStrings.rateUsStoreTxt}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText={textStrings.goNowBtnTxt}
          confirmText={textStrings.noBtnTxt}
          confirmButtonColor="transparent"
          onCancelPressed={() => {
            setshowAlert(!showAlert);
            setOpenModal(!openModal);
          }}
          onConfirmPressed={() => {
            setshowAlert(!showAlert);
          }}
          confirmButtonTextStyle={{color: textcolor, fontSize: h('2.3%')}}
          cancelButtonColor="transparent"
          cancelButtonTextStyle={{color: maincolor, fontSize: h('2.3%')}}
          cancelButtonStyle={{marginRight: h('10%')}}
        />
        <LiveTrackingComp
          trackingModal={trackingModal}
          switchTrackingModal={() => setTrackingModal(!trackingModal)}
          deliveryInfo={customObjectData?.deliveryInfo}
          driverLocation={driverLocation}
        />
      </View>

      <LoadingModal visibleModal={loadingModal} />
    </>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  mapbtn: {
    width: w('90%'),
    height: h('20%'),
    alignSelf: 'center',
    marginTop: h('2%'),
  },
  borderdivcont: {
    backgroundColor: 'white',
    marginBottom: h('3%'),
    paddingVertical: h('2%'),
    width: w('90%'),
    alignSelf: 'center',
    borderRadius: 7,
    borderColor: '#f0f0f0f0',
    borderWidth: 1,
    overflow: 'hidden',
  },
  locationHeading: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: h('1.5%'),
    height: h('4%'),
  },

  productInfodiv: {
    width: '100%',
    height: h('23%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  filldivTxtcont: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  upperdomain: {
    width: '100%',
    height: h('12%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  imagCXontainer: {
    width: h('13%'),
    height: '100%',
    backgroundColor: 'grey',
    borderRadius: 6,
    overflow: 'hidden',
  },
  textinfoprod: {
    width: w('60%'),
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  prodnamtxt: {
    marginBottom: h('1.5%'),
    fontSize: h('2.4%'),
    color: 'black',
  },
  modalConatiner: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    width: '95%',
    height: h('45%'),
    backgroundColor: 'white',
    borderRadius: h('1%'),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  closebtnmodal: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: h('9%'),
    height: h('9%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: '100%',
    width: h('12%'),
    borderRadius: h('1.5%'),
    overflow: 'hidden',
    backgroundColor: maincolor,
  },
});
