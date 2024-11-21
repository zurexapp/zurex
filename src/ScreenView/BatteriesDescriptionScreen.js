import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTempTwo from '../Components/CustomTempTwo';
import {w, h} from 'react-native-responsiveness';
import AppBtn from '../Components/AppBtn';
import {useDispatch, useSelector} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import LoadingModal from '../Components/LoadingModal';
import SelectNewProductModal from '../Components/SelectNewProductModal';
import {useTranslation} from '../Text/TextStrings';
import TextStyles from '../Text/TextStyles';
import {textcolor} from '../assets/Colors';
import {filterProductWithCar} from '../DataBase/databaseFunction'; // Make sure this function is correctly implemented

const BatteriesDescriptionScreen = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {selectedBattery} = route?.params;
  const dispatch = useDispatch();
  const [selectNewProduct, setSelectNewProduct] = useState(false);
  const [modalDataActive, setModalDataActive] = useState({});
  const {batteryData, batteryCompaniesData} = useSelector(
    state => state.project,
  );
  const [productsByCar, setProductsByCar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {isArabicLanguage} = useSelector(state => state.auth);
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {selectedCar} = curentOrderProductData;

  useEffect(() => {
    if (selectedBattery) {
      setIsLoading(true); // Start loading before fetching data
      const selectedBatteryDetails = batteryData?.find(
        dat => dat.id === selectedBattery.id,
      );
      setModalDataActive(selectedBatteryDetails || selectedBattery);
      setIsLoading(false); // Stop loading once data is set
    }
  }, [selectedBattery, batteryData]);

  const completeBatteryOrder = async () => {
    setIsLoading(true); // Start loading before processing order
    const preferdCompanyId = batteryCompaniesData.find(
      dat => dat.batteryId === modalDataActive.id,
    );
    const preferdCompany = [
      {
        id: preferdCompanyId?.batteryId ? preferdCompanyId.batteryId : '',
        referance: 'BatteryCompanies',
      },
    ];
    const products = [
      {id: modalDataActive.id, referance: 'btteries', quantity: 1}, // Updated reference
    ];

    console.log('Selected Battery:', modalDataActive);
    console.log('Selected Products:', products);

    await dispatch(
      setCurentOrderProductData({
        curentOrderProductData: {
          ...curentOrderProductData,
          preferdCompany: preferdCompany,
          products: products,
        },
      }),
    );

    setIsLoading(false); // Stop loading once order is completed

    navigation.replace('addOilRequestScreen', {selectedBattery});
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      setIsLoading(true); // Start loading before fetching filtered data
      console.log(`11111111`, selectedCar?.carName);

      const result = await filterProductWithCar(
        'battery',
        batteryData,
        selectedCar?.carName,
      );
      setProductsByCar(result?.data);
      setIsLoading(false); // Stop loading once filtered data is fetched
    };
    fetchFilteredData();
  }, [batteryData, selectedCar?.carName]);

  return (
    <>
      {isLoading && <LoadingModal visibleModal={isLoading} />}
      <View style={styles.fillscreenbg}>
        <CustomTempTwo
          child2={true}
          name={textStrings.batteryTxt}
          imglink={require('../assets/batterHeader.png')}
          firstbtnFun={() => navigation.pop()}>
          <View style={stylesNew.containerView}>
            <ScrollView contentContainerStyle={stylesNew.scrollContainer}>
              <View style={{width: w('90%'), alignSelf: 'center'}}>
                <Text style={TextStyles.batteriesdescbatterytitle}>
                  {isArabicLanguage
                    ? modalDataActive?.productNameArab
                    : modalDataActive?.productNameEng}
                </Text>

                <View style={stylesNew.descriptionContainer}>
                  <Text style={TextStyles.batteriesdescbatterydesched}>
                    {textStrings.descriptionTxt}:
                  </Text>
                  <TouchableOpacity onPress={() => setSelectNewProduct(true)}>
                    <Text style={TextStyles.addoilsmallborderdivtext}>
                      {textStrings.changeTxt}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={TextStyles.batteriesdescbatterydes}>
                  {isArabicLanguage
                    ? modalDataActive.productDescArab
                    : modalDataActive?.productDescEng}
                </Text>

                <View style={stylesNew.priceInfoContainer}>
                  {modalDataActive?.productDiemensions?.map((item, index) => (
                    <View key={item?.id}>
                      <View style={stylesNew.linecomp}>
                        <Text style={TextStyles.batteriesdesctaxname}>
                          {isArabicLanguage ? item?.nameArab : item?.nameEng} /
                        </Text>
                        <Text style={stylesNew.valueText}>
                          {item?.value ? item?.value : ''}
                        </Text>
                      </View>
                      {index + 1 !==
                        modalDataActive.productDiemensions?.length && (
                        <View style={stylesNew.divider} />
                      )}
                    </View>
                  ))}
                </View>

                <View style={stylesNew.btnContainer}>
                  <AppBtn
                    title={textStrings.nextTxt}
                    clickfun={completeBatteryOrder}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </CustomTempTwo>

        {productsByCar && (
          <SelectNewProductModal
            data={productsByCar}
            hide={() => setSelectNewProduct(false)}
            show={selectNewProduct}
            value={modalDataActive}
            onChange={e => {
              setModalDataActive(e);
            }}
          />
        )}
      </View>
    </>
  );
};

export default BatteriesDescriptionScreen;

const stylesNew = StyleSheet.create({
  linecomp: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: h('3.6%'),
  },
  valueText: {
    color: textcolor,
    textAlign: 'center',
    width: '35%',
  },
  containerView: {
    width: '100%',
    flex: 1,
    marginTop: h('4%'),
  },
  scrollContainer: {
    paddingBottom: h('5%'), // Ensures enough space at the bottom for the button
  },
  priceInfoContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    paddingVertical: h('2%'),
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginTop: h('2%'),
  },
  btnContainer: {
    marginTop: h('2%'),
  },
  descriptionContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const styles = StyleSheet.create({
  fillscreenbg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});
