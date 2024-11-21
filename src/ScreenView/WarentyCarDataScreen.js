import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import WarentyCarsComp from '../Components/WarentyCarsComp';
import {
  getDataWholeCollection,
  getMYOrders,
} from '../DataBase/databaseFunction';
import {
  setBatteryData,
  setMyOrdersData,
  setMySupportServicesItems,
  setTireData,
} from '../store/projectSlice';
import LoadingModal from '../Components/LoadingModal';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import {c0color, maincolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {w, h} from 'react-native-responsiveness';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WarentyCarDataScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const focus = useIsFocused();
  const dispatch = useDispatch();

  const {myOrdersData, batteryData, tireData, isAuth, isArabicLanguage} =
    useSelector(state => state.project);
  const {curentOrderProductData} = useSelector(state => state.orderProcess);

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const getUserID = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        return storedUserId;
      }
      return null;
    } catch (error) {
      console.log('Error retrieving user ID', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingModal(true); // Start loading
        const storedUserId = await getUserID();

        if (storedUserId) {
          const orders = await getMYOrders(storedUserId);
          dispatch(setMyOrdersData({myOrdersData: orders}));
        }

        const batteries = await getDataWholeCollection('btteries');
        dispatch(setBatteryData({batteryData: batteries}));

        const tires = await getDataWholeCollection('Tyres');
        dispatch(setTireData({tireData: tires}));

        setDataFetched(true);
        const filteredData =
          myOrdersData
            ?.filter(order => order.products && Array.isArray(order.products)) // Ensure products is an array
            .flatMap(order =>
              order.products.map(product => ({
                ...order,
                suportProduct: product,
              })),
            )
            .filter(
              item =>
                (item.suportProduct.referance === 'btteries' ||
                  item.suportProduct.referance === 'Tyres') &&
                item.orderStatus === 'completed' &&
                item.warentyEnabled,
            ) || [];

        dispatch(
          setMySupportServicesItems({mySupportServicesItems: filteredData}),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingModal(false);
      }
    };

    fetchData();
  }, [dispatch, myOrdersData]); // Add dispatch and myOrdersData as dependencies

  const findTitle = (referance, id) => {
    if (referance === 'btteries' && batteryData.length > 0) {
      const data = batteryData.find(item => item.id === id);
      return isArabicLanguage
        ? data?.productNameArab
        : data?.productNameEng || textStrings.productHasBeenDeleted;
    } else if (referance === 'Tyres' && tireData.length > 0) {
      const data = tireData.find(item => item.id === id);
      return isArabicLanguage
        ? data?.productNameArab
        : data?.productNameEng || textStrings.productHasBeenDeleted;
    }
    return textStrings.productHasBeenDeleted;
  };

  const calculateTotalWarentyRemaining = (warenty, startDate, startTime) => {
    const [startTimeOnly] = startTime.split(' - ');

    // Parse the start date
    const dateParts = startDate.split(' ');
    const monthMapping = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const month = monthMapping[dateParts[1]];
    const day = dateParts[2];
    const year = dateParts[3];
    const [time, modifier] = startTimeOnly.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;

    const appointmentMS = Date.parse(formattedDateTime);
    if (isNaN(appointmentMS)) {
      console.error(`Invalid date format: ${formattedDateTime}`);
      return false;
    }
    const warentyExpireDate = appointmentMS + warenty * 31556926000;
    return Date.now() <= warentyExpireDate;
  };

  const checkWarenty = (refer, id, appointDate, appoinTime) => {
    const data =
      refer === 'btteries'
        ? batteryData.find(item => item.id === id)
        : tireData.find(item => item.id === id);
    const warentyYear = data?.warenty || 0;

    const isValid = calculateTotalWarentyRemaining(
      warentyYear,
      appointDate,
      appoinTime,
    );
    return isValid;
  };

  const ItemSeparator = () => <View style={{height: 15}} />;

  return (
    <>
      <ScrollView style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.carsTxt}
          iconName1="left"
          firstbtnFun={() => navigation.goBack()}
          reddot={true}
        />
        <View style={styles.otherContent}>
          {dataFetched ? (
            <FlatList
              data={myOrdersData}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                // Assuming you want to check the first product in the order
                const referance = item?.products[0]?.referance;
                const id = item?.products[0]?.id;

                const productName = findTitle(referance, id);
                const warrantyStatus = checkWarenty(
                  referance,
                  id,
                  item.appointment.date,
                  item.appointment.time,
                );
                return (
                  <WarentyCarsComp
                    ProductName={productName}
                    carImg={item.imglink}
                    carName={item?.selectedCar?.carName}
                    carCategory={item?.selectedCar?.category}
                    plateNumber={item?.selectedCar?.numberPlate}
                    orderIdTxt={item.id}
                    implementDate={item?.appointment?.date}
                    warenty={warrantyStatus}
                    freeServicesCount={item.freeServicesCount}
                    onClickBookService={() => {
                      setSelectedOrder(item);
                      setIsModalVisible(true);
                      dispatch(
                        setCurentOrderProductData({
                          curentOrderProductData: {
                            ...curentOrderProductData,
                            orderId: item.id,
                            freeServicesCount: item.freeServicesCount,
                            orderPrice: item.freeServicesCount > 0 ? 0 : 125,
                            taxPrice: item.freeServicesCount > 0 ? 0 : 12,
                            totalPrice: item.freeServicesCount > 0 ? 0 : 137,
                            selectedCar: {...item?.selectedCar},
                          },
                        }),
                      );
                    }}
                  />
                );
              }}
              ItemSeparatorComponent={ItemSeparator}
              ListEmptyComponent={
                <View style={styles.emptyView}>
                  <Text style={{...TextStyles.Myorderbtntxt, color: c0color}}>
                    {textStrings.emptyListValue}
                  </Text>
                </View>
              }
            />
          ) : (
            <View style={styles.loadingView}>
              <Text style={{...TextStyles.Myorderbtntxt, color: c0color}}>
                {textStrings.loadingData}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <LoadingModal visibleModal={loadingModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EvilIcons
              name="close"
              style={{alignSelf: 'flex-end'}}
              size={h('3%')}
              color="black"
              onPress={() => setIsModalVisible(false)}
            />
            {selectedOrder && (
              <>
                {selectedOrder.freeServicesCount > 0 ? (
                  <Text style={styles.modalText}>
                    {textStrings.book_free_service_desc +
                      findTitle(
                        selectedOrder?.suportProduct?.referance,
                        selectedOrder?.suportProduct?.id,
                      )}
                  </Text>
                ) : (
                  <>
                    <Text style={styles.modalText}>
                      {textStrings.book_paid_service_desc +
                        findTitle(
                          selectedOrder?.suportProduct?.referance,
                          selectedOrder?.suportProduct?.id,
                        )}
                    </Text>
                    <Text style={styles.modalText}>
                      {textStrings.orderPrice}:{' '}
                      {curentOrderProductData?.orderPrice}
                    </Text>
                    <Text style={styles.modalText}>
                      {textStrings.taxTxt}: {curentOrderProductData?.taxPrice}
                    </Text>
                    <Text style={styles.modalText}>
                      {textStrings.totalTxt}:{' '}
                      {curentOrderProductData?.totalPrice}
                    </Text>
                  </>
                )}
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => {
                    setIsModalVisible(false);
                    navigation.navigate('CompletePaymentScreen');
                  }}>
                  <Text style={styles.nextButtonText}>
                    {textStrings.nextTxt}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default WarentyCarDataScreen;

const styles = StyleSheet.create({
  emptyView: {
    width: w('90%'),
    height: h('58%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    width: w('90%'),
    height: h('58%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  nextButton: {
    backgroundColor: maincolor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
