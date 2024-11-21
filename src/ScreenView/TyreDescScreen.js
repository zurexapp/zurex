import {StyleSheet, Text, View, FlatList, Alert, Linking} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import {useSelector} from 'react-redux';
import {filterProductWithCar} from '../DataBase/databaseFunction';
import BigImageProductComp from '../Components/BigImageProductComp';
import LoadingModal from '../Components/LoadingModal';
import analytics from '@react-native-firebase/analytics'; // Import Firebase Analytics

const TyreDescScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {isArabicLanguage} = useSelector(state => state.auth);
  const {tireData} = useSelector(state => state.project);
  const [productsByCar, setproductsByCar] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {selectedCar} = curentOrderProductData;
  const [noProductsFound, setNoProductsFound] = useState(false);

  const ButtnClickFunct = async item => {
    const {id, productNameEng} = item;
    await analytics().logEvent('app_Product_Viewed', {
      tireName: productNameEng,
    });

    navigation.navigate('TyreDescScreenDetail', {selectedTireId: id});
  };

  const fetchFilteredData = useCallback(async () => {
    setisLoading(true);
    try {
      const result = await filterProductWithCar(
        'tires',
        tireData,
        selectedCar?.carName,
      );
      const productArray = result?.data || [];
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
                setNoProductsFound(false); // Reset state after the alert is dismissed
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error fetching tire data:', error);
      setNoProductsFound(true);
    } finally {
      setisLoading(false);
    }
  }, [tireData, selectedCar?.carName, navigation]);

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  return (
    <>
      <View style={[styles.fillscreenbg, noProductsFound && styles.greyBg]}>
        <CurvedHeaderComp
          name={textStrings.tiresTitleTxt}
          iconName1={'left'}
          iconName2={''}
          firstbtnFun={() => navigation.goBack()}
          secbtnFun={() => console.log('next')}
          reddot={true}
        />
        <View style={styles.otherContent}>
          <Text style={TextStyles.batterytypemainheading}>
            {textStrings.chooseTireTxt} :
          </Text>
          <FlatList
            data={productsByCar}
            renderItem={({item, index}) => {
              return (
                <BigImageProductComp
                  key={index}
                  image={item?.images[0]?.imgLink}
                  title={
                    isArabicLanguage
                      ? item.productNameArab
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
                  onClickFun={() => ButtnClickFunct(item)}
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
      {isLoading ? <LoadingModal visibleModal={isLoading} /> : null}
    </>
  );
};

export default TyreDescScreen;

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

// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Alert,
//   Linking,
//   ScrollView,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { w, h } from 'react-native-responsiveness';
// import TextStyles from '../Text/TextStyles';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import { useTranslation } from '../Text/TextStrings';
// import { useSelector } from 'react-redux';
// import { filterProductWithCar } from '../DataBase/databaseFunction';
// import BigImageProductComp from '../Components/BigImageProductComp';
// import LoadingModal from '../Components/LoadingModal';
// import analytics from '@react-native-firebase/analytics'; // Import Firebase Analytics
// import { Picker } from '@react-native-picker/picker'; // Corrected import

// const TyreDescScreen = ({ navigation }) => {
//   const { textStrings } = useTranslation();
//   const { curentOrderProductData } = useSelector(state => state.orderProcess);
//   const { isArabicLanguage } = useSelector(state => state.auth);
//   const { tireData } = useSelector(state => state.project);
//   const [productsByCar, setproductsByCar] = useState([]);
//   const [isLoading, setisLoading] = useState(false);
//   const { selectedCar } = curentOrderProductData;
//   const [noProductsFound, setNoProductsFound] = useState(false);

//   const ButtnClickFunct = async (item) => {
//     const { id, productNameEng } = item;
//     await analytics().logEvent('app_Product_Viewed', {
//       tireName: productNameEng,
//     });

//     navigation.navigate('TyreDescScreenDetail', { selectedTireId: id });
//   };

//   const fetchFilteredData = async () => {
//     setisLoading(true);
//     try {
//       const result = await filterProductWithCar("tires", tireData, selectedCar?.carName);
//       setproductsByCar(result?.data || []);

//       if (result?.data?.length === 0) {
//         setNoProductsFound(true);
//         Alert.alert(
//           'No Suitable Products Found',
//           'Please contact customer support or go back to the previous page.',
//           [
//             {
//               text: 'Back',
//               onPress: () => {
//                 setNoProductsFound(false);
//                 navigation.goBack();
//               },
//             },
//             {
//               text: 'Contact Support',
//               onPress: () => {
//                 Linking.openURL('https://api.whatsapp.com/send/?phone=966557488008');
//                 setNoProductsFound(false); // Reset state after the alert is dismissed
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (error) {
//       console.error('Error fetching tire data:', error);
//       setNoProductsFound(true);
//     } finally {
//       setisLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFilteredData();
//   }, [tireData]);

//   return (
//     <>
//       <View style={[styles.fillscreenbg, noProductsFound && styles.greyBg]}>
//         <CurvedHeaderComp
//           name={textStrings.tiresTitleTxt}
//           iconName1={'left'}
//           iconName2={''}
//           firstbtnFun={() => navigation.goBack()}
//           secbtnFun={() => console.log('next')}
//           reddot={true}
//         />

//         {/* ScrollView to make the content scrollable */}
//         <ScrollView
//           style={styles.scrollViewContainer}
//           contentContainerStyle={styles.scrollViewContent}
//           keyboardShouldPersistTaps="handled" // This ensures touch events are handled properly for dropdowns
//         >
//           <Text style={TextStyles.batterytypemainheading}>
//             {textStrings.chooseTireTxt} :
//           </Text>

//           {/* Dropdown Section */}
//           <View style={styles.dropdownSection}>
//             <Text style={styles.dropdownHeading}>Choose Tire Specifications</Text>

//             {/* Dropdowns for Width, Ratio, and Diameter */}
//             <View style={styles.dropdownContainer}>
//               {/* Width Picker */}
//               <View style={styles.pickerWrapper}>
//                 <Text style={styles.dropdownLabel}>Width:</Text>
//                 <Picker
//                   selectedValue={''}
//                   onValueChange={(itemValue) => console.log('Width selected:', itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Width" value="" />
//                   <Picker.Item label="205" value="205" />
//                   <Picker.Item label="215" value="215" />
//                   <Picker.Item label="225" value="225" />
//                 </Picker>
//               </View>

//               {/* Ratio Picker */}
//               <View style={styles.pickerWrapper}>
//                 <Text style={styles.dropdownLabel}>Ratio:</Text>
//                 <Picker
//                   selectedValue={''}
//                   onValueChange={(itemValue) => console.log('Ratio selected:', itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Ratio" value="" />
//                   <Picker.Item label="40" value="40" />
//                   <Picker.Item label="45" value="45" />
//                   <Picker.Item label="50" value="50" />
//                 </Picker>
//               </View>

//               {/* Diameter Picker */}
//               <View style={styles.pickerWrapper}>
//                 <Text style={styles.dropdownLabel}>Diameter:</Text>
//                 <Picker
//                   selectedValue={''}
//                   onValueChange={(itemValue) => console.log('Diameter selected:', itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Diameter" value="" />
//                   <Picker.Item label="16" value="16" />
//                   <Picker.Item label="17" value="17" />
//                   <Picker.Item label="18" value="18" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           {/* FlatList for displaying products */}
//           <FlatList
//             data={productsByCar}
//             renderItem={({ item, index }) => {
//               return (
//                 <BigImageProductComp
//                   key={index}
//                   image={item?.images[0]?.imgLink}
//                   title={isArabicLanguage ? item.productNameArab : item?.productNameEng}
//                   price={item?.discountPrice ? (
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
//                     )}
//                   onClickFun={() => ButtnClickFunct(item)}
//                 />
//               );
//             }}
//             ItemSeparatorComponent={() => (
//               <View style={{ marginBottom: h('1.5%') }} />
//             )}
//             ListFooterComponent={<View style={{ height: h('9%') }} />}
//           />
//         </ScrollView>
//       </View>
//       {isLoading ? <LoadingModal visibleModal={isLoading} /> : null}
//     </>
//   );
// };

// export default TyreDescScreen;

// const styles = StyleSheet.create({
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   greyBg: {
//     backgroundColor: '#d3d3d3',
//   },
//   scrollViewContainer: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingBottom: h('5%'),
//   },
//   dropdownSection: {
//     marginBottom: h('2%'),
//     paddingHorizontal: w('4%'),
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: w('4%'),
//     marginRight: 10,
//     marginLeft: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   dropdownHeading: {
//     fontSize: h('2.5%'),
//     fontWeight: 'bold',
//   },
//   dropdownContainer: {
//     flexDirection: 'column',
//   },
//   pickerWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   dropdownLabel: {
//     fontSize: h('2.3%'),
//     fontWeight: 'bold',
//     marginRight: w('3%'),
//     width: '30%',
//   },
//   picker: {
//     height: h('6%'),
//     width: '65%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
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
// });
