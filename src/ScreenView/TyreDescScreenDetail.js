import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react'; // Import useCallback
import CustomTempTwo from '../Components/CustomTempTwo';
import {w, h} from 'react-native-responsiveness';
import AppBtn from '../Components/AppBtn';
import {maincolor, redcolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useSelector, useDispatch} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import SelectNewProductModal from '../Components/SelectNewProductModal';
import {webengage} from '../webengage';
import LoadingModal from '../Components/LoadingModal';
import {filterProductWithCar} from '../DataBase/databaseFunction';
import CustomBtn from '../Components/CustomBtn';

const TyreDescScreenDetail = ({navigation, route}) => {
  const {textStrings} = useTranslation();
  const {selectedTireId} = route?.params;
  const dispatch = useDispatch();
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {isArabicLanguage} = useSelector(state => state.auth);
  const [selectNewProduct, setselectNewProduct] = useState(false);
  const {tireData} = useSelector(state => state.project);
  const [productsByCar, setproductsByCar] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {selectedCar} = curentOrderProductData;
  const [modalDataActive, setmodalDataActive] = useState({});
  const [no_of_tyres, setNumberOfTyres] = useState(1);

  useEffect(() => {
    if (selectedTireId?.length > 0) {
      setmodalDataActive(tireData?.find(dat => dat.id === selectedTireId));
    }
  }, [selectedTireId, tireData]); // Added tireData as a dependency

  const completeBatteryOrder = async () => {
    const preferdCompany = [];
    const products = [
      {id: modalDataActive.id, referance: 'Tyres', quantity: no_of_tyres},
    ];
    webengage.track('Product Viewed', {
      'Product Name': modalDataActive?.productNameEng,
      Price: modalDataActive?.originalPrice,
      Offer: modalDataActive?.offerEnglish,
      Currency: 'SAR',
      Image:
        modalDataActive[0]?.imglInk &&
        modalDataActive[0]?.imglInk?.includes('http')
          ? [modalDataActive[0]?.imglInk]
          : [''],
      'Brand Name': modalDataActive?.productNameEng,
      Quantity: no_of_tyres,
    });
    await dispatch(
      setCurentOrderProductData({
        curentOrderProductData: {
          ...curentOrderProductData,
          preferdCompany: preferdCompany,
          products: products,
        },
      }),
    );
    navigation.replace('addOilRequestScreen', {selectedTireId});
  };

  // Memoize fetchFilteredData using useCallback to avoid re-creating the function on every render
  const fetchFilteredData = useCallback(async () => {
    setisLoading(true);
    const result = await filterProductWithCar(
      'tires',
      tireData,
      selectedCar?.carName,
    );
    setproductsByCar(result?.data);
    setisLoading(false);
  }, [selectedCar?.carName, tireData]); // Added tireData and selectedCar.carName as dependencies

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]); // Using the memoized fetchFilteredData

  return (
    <>
      <View style={styles.fillscreenbg}>
        <CustomTempTwo
          imglink={require('../assets/tyresimg.png')}
          child2={true}
          firstbtnFun={() => navigation.pop()}
          name={textStrings.tiresTitleTxt}>
          <View style={stylesNew.containerView}>
            <ScrollView>
              <View style={stylesNew.innerContainer}>
                <Text style={TextStyles.batteriesdescbatterytitle}>
                  {isArabicLanguage
                    ? modalDataActive?.productNameArab
                    : modalDataActive?.productNameEng}
                </Text>
                <View style={stylesNew.descriptionContainer}>
                  <Text style={TextStyles.batteriesdescbatterydesched}>
                    {textStrings.descriptionTxt}:
                  </Text>
                  <TouchableOpacity onPress={() => setselectNewProduct(true)}>
                    <Text style={stylesNew.changeText}>
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
                        <Text style={stylesNew.taxname}>
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
                <View style={stylesNew.quantityContainer}>
                  <Text style={stylesNew.desc}>
                    {textStrings.tyres_quantity}:
                  </Text>

                  <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => {
                      if (no_of_tyres !== 1) {
                        setNumberOfTyres(no_of_tyres - 1);
                      }
                    }}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}> {no_of_tyres}</Text>
                  <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => {
                      setNumberOfTyres(no_of_tyres + 1);
                    }}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={stylesNew.divider} />

                <AppBtn
                  title={textStrings.nextTxt}
                  clickfun={completeBatteryOrder}
                />
              </View>
            </ScrollView>
          </View>
        </CustomTempTwo>
      </View>
      {isLoading ? <LoadingModal visibleModal={isLoading} /> : null}

      {productsByCar ? (
        <SelectNewProductModal
          data={productsByCar}
          hide={() => setselectNewProduct(!selectNewProduct)}
          show={selectNewProduct}
          value={modalDataActive}
          onChange={e => {
            setmodalDataActive(e);
          }}
        />
      ) : null}
    </>
  );
};

export default TyreDescScreenDetail;

const stylesNew = StyleSheet.create({
  containerView: {
    width: '100%',
    flex: 1,
    marginTop: h('4%'),
  },
  innerContainer: {
    width: w('90%'),
    alignSelf: 'center',
    marginBottom: h('5%'),
  },
  descriptionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h('1%'),
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: h('1%'),
    paddingVertical: h('2%'),
  },
  linecomp: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: h('3.6%'),
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
  divider: {
    width: '100%',
    marginVertical: h('1%'),
    borderWidth: 0.25,
    borderColor: '#BFD0E5',
  },
  taxname: {
    color: 'black',
    fontSize: h('2.3%'),
    flex: 2, // Adjust flex value as needed
  },
  valueText: {
    color: textcolor,
    textAlign: 'center',
    flex: 1, // Adjust flex value as needed
  },
  changeText: {
    ...TextStyles.addoilsmallborderdivtext,
    maxWidth: '100%',
    textAlign: 'right',
  },
  quantity: {
    paddingHorizontal: 10,
    marginRight: 3,
  },

  buttonLeft: {
    alignItems: 'center',
    backgroundColor: '#5E5E5E',
    borderRightWidth: 1,
    borderRightColor: 'black',
    padding: 10,
  },

  buttonRight: {
    alignItems: 'center',
    backgroundColor: '#5E5E5E',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    padding: 10,
  },
  desc: {
    color: 'black',
    fontSize: h('2.3%'),
    width: '60%',
    alignSelf: 'center',
    marginBottom: h('1%'),
  },
});

const styles = StyleSheet.create({
  btnimagechild: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    maxHeight: 30,
  },
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  quantityButtonText: {
    fontSize: h('3%'), // Increase font size here
    color: 'black',
  },
});
