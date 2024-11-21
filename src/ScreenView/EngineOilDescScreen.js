import {StyleSheet, Text, View, FlatList, Alert, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTempTwo from '../Components/CustomTempTwo';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import LoadingModal from '../Components/LoadingModal';
import {filterProductWithCar} from '../DataBase/databaseFunction';
import BigImageProductComp from '../Components/BigImageProductComp';
import analytics from '@react-native-firebase/analytics';

const EngineOilDescScreen = ({navigation, route}) => {
  const {fuelType} = route.params;
  const {textStrings} = useTranslation();
  const {filtersData, engineOilData, engineOilPetrolData} = useSelector(
    state => state.project,
  );
  const dispatch = useDispatch();
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {isArabicLanguage} = useSelector(state => state.auth);
  const [productsByCar, setproductsByCar] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const {selectedCar} = curentOrderProductData;

  useEffect(() => {
    const fetchFilteredData = async () => {
      setisLoading(true);
      const oilData =
        fuelType === 'Petrol' ? engineOilPetrolData : engineOilData;
      const result = await filterProductWithCar(
        'Engineoils',
        oilData,
        selectedCar?.carName,
      );
      const productArray = result?.data || [];
      setproductsByCar(productArray);
      setisLoading(false);
      if (productArray.length === 0) {
        setNoProductsFound(true);
        Alert.alert(
          'No Suitable Products Found',
          'Please contact customer support or go back to the previous page.',
          [
            {
              text: 'Back',
              onPress: () => {
                setNoProductsFound(false);
                navigation.goBack();
              },
            },
            {
              text: 'Contact Support',
              onPress: () => {
                Linking.openURL(
                  'https://api.whatsapp.com/send/?phone=966557488008',
                );
                setNoProductsFound(false);
              },
            },
          ],
          {cancelable: false},
        );
      }
    };
    fetchFilteredData();
  }, [
    filtersData,
    engineOilData,
    engineOilPetrolData,
    navigation,
    selectedCar?.carName,
    fuelType,
  ]);

  const filterSelctFun = async dat => {
    const numberOfCylinders = parseInt(selectedCar?.cylinder) || 0;
    const products = [
      {
        id: dat,
        referance: fuelType === 'Petrol' ? 'engineOilPetrol' : 'engineOil',
        quantity: numberOfCylinders,
      },
    ];
    const selectedProduct = productsByCar.find(product => product.id === dat);
    const productName = isArabicLanguage
      ? selectedProduct?.productNameArab
      : selectedProduct?.productNameEng;
    console.log('Selected Product Name:', productName);
    await dispatch(
      setCurentOrderProductData({
        curentOrderProductData: {
          ...curentOrderProductData,
          products: products,
        },
      }),
    );
    if (productName) {
      await analytics().logEvent('app_Product_Viewed', {
        EngineOilName: productName,
      });
    } else {
      console.warn('Product name is missing');
    }
    navigation.navigate('OilFilterDescScreen');
  };
  return (
    <>
      <CustomTempTwo
        firstbtnFun={() => navigation.goBack()}
        imglink={require('../assets/oilHeader.png')}
        child2={true}
        name={textStrings.oilFilterTitleTxt}>
        <View style={[styles.container, noProductsFound && styles.greyBg]}>
          <View style={styles.fillcontent}>
            <Text style={TextStyles.oilfilterrefiltxt}>
              {selectedCar?.cylinder
                ? `${textStrings.numberOfOilRefills} : ${selectedCar?.cylinder}`
                : textStrings.pleseEnterOilCapcity}
            </Text>
            <View
              style={{
                width: '100%',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                marginTop: h('2%'),
              }}>
              <FlatList
                data={productsByCar}
                ItemSeparatorComponent={() => <View style={{height: 15}} />}
                ListFooterComponent={<View style={{height: h('7%')}} />}
                renderItem={({item, index}) => {
                  const productName = isArabicLanguage
                    ? item?.productNameArab
                    : item?.productNameEng;
                  return (
                    <BigImageProductComp
                      image={item?.images[0]?.imgLink}
                      onClickFun={() => {
                        filterSelctFun(item.id);
                      }}
                      price={
                        item?.discountPrice ? (
                          <View style={styles.priceWrapper}>
                            <Text style={styles.originalPriceText}>
                              {item?.originalPrice
                                ? `${item?.originalPrice} SAR`
                                : ''}
                            </Text>
                            <Text style={styles.discountPriceText}>
                              {item?.discountPrice
                                ? `${item?.discountPrice} SAR`
                                : ''}
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.originalPriceOnlyText}>
                            {item?.originalPrice
                              ? `${item?.originalPrice} SAR`
                              : ''}
                          </Text>
                        )
                      }
                      title={productName}
                      key={index}
                    />
                  );
                }}
              />
            </View>
          </View>
        </View>
      </CustomTempTwo>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default EngineOilDescScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fillcontent: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    marginVertical: h('1%'),
    marginTop: h('4%'),
  },
  greyBg: {
    backgroundColor: '#d3d3d3',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginRight: 8,
    fontSize: h('2.5%'),
  },
  discountPriceText: {
    fontSize: h('2.5%'),
    color: 'red',
  },
  originalPriceOnlyText: {
    fontSize: h('2.5%'),
    color: 'black',
  },
});
