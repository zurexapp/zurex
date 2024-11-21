// import {StyleSheet, View, FlatList, Alert} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import AppBtn from '../Components/AppBtn';
// import LineedBtnMarkBill from '../Components/LineedBtnMarkBill';
// import {useTranslation} from '../Text/TextStrings';
// import {useDispatch, useSelector} from 'react-redux';
// import {setCurentOrderProductData} from '../store/orderProcessSlice';
// import LoadingModal from '../Components/LoadingModal';
// import { Text } from 'react-native-paper';
// import { setOilsData } from '../store/projectSlice';
// import { getDataWholeCollection } from '../DataBase/databaseFunction';

// const MyCarBillScreen = ({navigation}) => {
//   const {textStrings} = useTranslation();
//   const dispatch = useDispatch();
//   const {isArabicLanguage} = useSelector(state => state.auth);
//   const {oilsData} = useSelector(state => state.project);
//   const {curentOrderProductData} = useSelector(state => state.orderProcess);
//   const [selectedOil, setselectedOil] = useState([]);
//   const [isLoading, setisLoading] = useState(false);

//   useEffect(() => {
//     fetchOilsData();
//   }, []);

//   const fetchOilsData = async () => {
//     setisLoading(true);
//     const Oils = await getDataWholeCollection('Oils');
//     dispatch(setOilsData({ oilsData: Oils }));
//     setisLoading(false);
//   };

//   const fetchFilteredData = async () => {
//     setisLoading(true);
//     const result = oilsData;
//     setisLoading(false);
//     return result;
//   };

//   useEffect(() => {
//     fetchFilteredData();
//   }, [oilsData]);

//   const filterSelctFun = async () => {
//   let selectedProducts = [];

//   if (selectedOil.length > 0) {
//     // Get the details of the selected products
//     selectedProducts = selectedOil.map(id => {
//       return oilsData.find(oil => oil.id === id);
//     });

//     const products = selectedOil.map(dat => {
//       return {id: dat, referance: 'Oils', quantity: 1};
//     });
//     const oldOptionalData = curentOrderProductData?.products?.filter(
//       dat => dat?.referance !== 'Oils',
//     );
//     await dispatch(
//       setCurentOrderProductData({
//         curentOrderProductData: {
//           ...curentOrderProductData,
//           products: curentOrderProductData?.products
//             ? [...oldOptionalData, ...products]
//             : [...products],
//         },
//       }),
//     );
//   } else {
//     const oldOptionalData = curentOrderProductData?.products?.filter(
//       dat => dat?.referance !== 'Oils',
//     );
//     await dispatch(
//       setCurentOrderProductData({
//         curentOrderProductData: {
//           ...curentOrderProductData,
//           products: [...oldOptionalData],
//         },
//       }),
//     );
//   }
//   console.log('Selected Products:', selectedProducts);
//   navigation.navigate('addOilRequestScreen', { selectedProducts });
// };

//   return (
//     <View style={styles.fillscreenbg}>
//       <LoadingModal visibleModal={isLoading} />
//       <CurvedHeaderComp
//         name={textStrings.optionalTxt}
//         iconName1={'left'}

//         firstbtnFun={() => navigation.goBack()}
//       />
//       <View style={styles.otherContent}>
//         <View style={styles.optionContainerMain}>
//           <FlatList
//             data={oilsData}
//             renderItem={({item, index}) => {
//               const check = selectedOil.find(dat => dat === item.id);
//               return (
//                 <LineedBtnMarkBill
//                   key={index}
//                   isShowBorder={oilsData?.length !== index + 1 ? true : false}
//                   title={
//                     isArabicLanguage
//                       ? item?.productNameArab
//                       : item?.productNameEng
//                   }
//                   price={
//                     item?.discountPrice ? (
//                       <View style={styles.priceWrapper}>
//                         <Text style={styles.originalPriceText}>
//                           {item?.originalPrice ? `${item?.originalPrice} SAR` : ''}
//                         </Text>
//                         <Text style={styles.discountPriceText}>
//                           {item?.discountPrice ? `${item?.discountPrice} SAR` : ''}
//                         </Text>
//                       </View>
//                     ) : (
//                       <Text style={styles.originalPriceOnlyText}>
//                         {item?.originalPrice ? `${item?.originalPrice} SAR` : ''}
//                       </Text>
//                     )
//                   }
//                   isSelectedItem={check ? true : false}
//                   selectionFunc={() => {
//                     if (selectedOil.length <= 0) {
//                       setselectedOil([item.id]);
//                     } else {
//                       if (check) {
//                         setselectedOil(
//                           selectedOil.filter(dat => dat !== item.id),
//                         );
//                       } else {
//                         setselectedOil([...selectedOil, item.id]);
//                       }
//                     }
//                   }}
//                 />
//               );
//             }}
//             ListFooterComponent={
//               <>
//                 <View style={{marginTop: h('18%')}} />
//                 <AppBtn title={textStrings.nextTxt} clickfun={filterSelctFun} />
//               </>
//             }
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MyCarBillScreen;

// const styles = StyleSheet.create({
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   otherContent: {
//     width: '90%',
//     flex: 1,
//     alignSelf: 'center',
//   },
//   priceWrapper: {
//     width: '45%',
//     justifyContent: 'flex-start',
//   },
//   originalPriceText: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//     fontSize: h('2.3%'),
//   },
//   discountPriceText: {
//     fontSize: h('2.3%'),
//     color: 'red',
//     marginTop: 2,
//   },
//   originalPriceOnlyText: {
//     fontSize: h('2.3%'),
//     color: 'black',
//   },
//   productName: {
//     width: '45%',
//     fontSize: h('2.3%'),
//     flexWrap: 'wrap',
//   },
// });

import {StyleSheet, View, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import AppBtn from '../Components/AppBtn';
import LineedBtnMarkBill from '../Components/LineedBtnMarkBill';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import LoadingModal from '../Components/LoadingModal';
import {Text} from 'react-native-paper';
import {setOilsData} from '../store/projectSlice';
import {getDataWholeCollection} from '../DataBase/databaseFunction';

const MyCarBillScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const dispatch = useDispatch();
  const {isArabicLanguage} = useSelector(state => state.auth);
  const {oilsData} = useSelector(state => state.project);
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const [selectedOil, setselectedOil] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const result = oilsData;
        return result;
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      }
    };
    const fetchOilsData = async () => {
      try {
        const Oils = await getDataWholeCollection('Oils');
        dispatch(setOilsData({oilsData: Oils}));
        await fetchFilteredData(); // Fetch filtered data after fetching oils
      } catch (error) {
        console.error('Error fetching oils data:', error);
        Alert.alert(textStrings.error, textStrings.fetchError);
      } finally {
        setisLoading(false);
      }
    };
    fetchOilsData();
  }, [oilsData, dispatch, textStrings.error, textStrings.fetchError]);

  const filterSelctFun = async () => {
    let selectedProducts = [];

    if (selectedOil.length > 0) {
      selectedProducts = selectedOil.map(id =>
        oilsData.find(oil => oil.id === id),
      );

      const products = selectedOil.map(dat => ({
        id: dat,
        referance: 'Oils',
        quantity: 1,
      }));

      const oldOptionalData = curentOrderProductData?.products?.filter(
        dat => dat?.referance !== 'Oils',
      );
      setisLoading(true);
      try {
        await dispatch(
          setCurentOrderProductData({
            curentOrderProductData: {
              ...curentOrderProductData,
              products: [...oldOptionalData, ...products],
            },
          }),
        );
      } catch (error) {
        console.error('Error updating current order product data:', error);
        Alert.alert(textStrings.error, textStrings.updateError); // Optional: Alert the user
      } finally {
        setisLoading(false);
      }
    } else {
      const oldOptionalData = curentOrderProductData?.products?.filter(
        dat => dat?.referance !== 'Oils',
      );
      setisLoading(true);
      try {
        await dispatch(
          setCurentOrderProductData({
            curentOrderProductData: {
              ...curentOrderProductData,
              products: [...oldOptionalData],
            },
          }),
        );
      } catch (error) {
        console.error('Error updating current order product data:', error);
        Alert.alert(textStrings.error, textStrings.updateError); // Optional: Alert the user
      } finally {
        setisLoading(false);
      }
    }
    console.log('Selected Products:', selectedProducts);
    navigation.navigate('addOilRequestScreen', {selectedProducts});
  };

  return (
    <View style={styles.fillscreenbg}>
      <LoadingModal visibleModal={isLoading} />
      <CurvedHeaderComp
        name={textStrings.optionalTxt}
        iconName1={'left'}
        firstbtnFun={() => navigation.goBack()}
      />
      <View style={styles.otherContent}>
        <View style={styles.optionContainerMain}>
          <FlatList
            data={oilsData}
            renderItem={({item, index}) => {
              const check = selectedOil.find(dat => dat === item.id);
              return (
                <LineedBtnMarkBill
                  key={index}
                  isShowBorder={oilsData?.length !== index + 1}
                  title={
                    isArabicLanguage
                      ? item?.productNameArab
                      : item?.productNameEng
                  }
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
                  isSelectedItem={check}
                  selectionFunc={() => {
                    if (check) {
                      setselectedOil(
                        selectedOil.filter(dat => dat !== item.id),
                      );
                    } else {
                      setselectedOil([...selectedOil, item.id]);
                    }
                  }}
                />
              );
            }}
            ListFooterComponent={
              <>
                <View style={{marginTop: h('18%')}} />
                <AppBtn title={textStrings.nextTxt} clickfun={filterSelctFun} />
              </>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default MyCarBillScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
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
  productName: {
    width: '45%',
    fontSize: h('2.3%'),
    flexWrap: 'wrap',
  },
});
