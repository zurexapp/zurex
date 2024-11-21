import {StyleSheet, Text, View, FlatList, Alert, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';
import TextStyles from '../Text/TextStyles';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from '../Components/LoadingModal';
import {filterProductWithCar} from '../DataBase/databaseFunction';
import BigImageProductComp from '../Components/BigImageProductComp';
import analytics from '@react-native-firebase/analytics';

const BatteryTypeScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {batteryData} = useSelector(state => state.project);
  const [productsByCar, setproductsByCar] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const {isArabicLanguage} = useSelector(state => state.auth);

  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {selectedCar} = curentOrderProductData;

  // Function to handle button click and log the event
  const ButtnClickFunct = async item => {
    // Get product name based on language
    const productName = isArabicLanguage
      ? item.productNameArab
      : item.productNameEng;
    console.log('Selected Product Name:', productName);

    await analytics().logEvent('app_Product_Viewed', {
      batteryName: productName,
    });

    navigation.navigate('BatteriesDescriptionScreen', {selectedBattery: item});
  };

  // Function to fetch filtered battery data based on the selected car

  // Fetch battery data when the component mounts or batteryData changes
  useEffect(() => {
    const fetchFilteredData = async () => {
      setisLoading(true);
      try {
        const result = await filterProductWithCar(
          'battery',
          batteryData,
          selectedCar?.carName,
        );
        console.log(`11111111111`, selectedCar?.carName);
        console.log(`22222222222`, result);

        const productArray = Object.values(result?.data || {});
        setproductsByCar(productArray);

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
      } catch (error) {
        console.error('Error fetching battery data:', error);
        setisLoading(false);
      } finally {
        setisLoading(false);
      }
    };
    fetchFilteredData();
  }, [batteryData, selectedCar?.carName, navigation]);

  return (
    <>
      <LoadingModal visibleModal={isLoading} />
      <View style={[styles.fillscreenbg, noProductsFound && styles.greyBg]}>
        <CurvedHeaderComp
          name={textStrings.batteryTxt}
          iconName1={'left'}
          iconName2={''}
          firstbtnFun={() => {
            navigation.pop();
          }}
          secbtnFun={() => console.log('Next button pressed')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <Text style={TextStyles.batterytypemainheading}>
            {textStrings.chooseBateryTxt} :
          </Text>
          <FlatList
            data={productsByCar}
            renderItem={({item, index}) => {
              console.log('Rendering item:', item);
              return (
                <BigImageProductComp
                  image={item?.images[0]?.imgLink}
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
                  title={
                    isArabicLanguage
                      ? item.productNameArab
                      : item?.productNameEng
                  }
                  onClickFun={() => ButtnClickFunct(item)} // Pass entire item data
                  key={index}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{marginBottom: h('1.5%')}} />
            )}
            ListFooterComponent={<View style={{height: h('9%')}} />}
          />
        </View>
      </View>
    </>
  );
};

export default BatteryTypeScreen;

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
  greyBg: {
    backgroundColor: '#d3d3d3',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  priceWrapper: {
    width: '45%',
    justifyContent: 'flex-start',
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: h('2.3%'),
  },
  discountPriceText: {
    fontSize: h('2.3%'),
    color: 'red',
    marginTop: 2,
  },
  originalPriceOnlyText: {
    fontSize: h('2.3%'),
    color: 'black',
  },
});
