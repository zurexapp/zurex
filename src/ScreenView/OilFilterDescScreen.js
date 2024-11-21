// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Image,
//   View,
//   Modal,
//   FlatList,
//   Alert,
//   Dimensions,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import CustomTempTwo from '../Components/CustomTempTwo';
// import {w, h} from 'react-native-responsiveness';
// import AppBtn from '../Components/AppBtn';
// import CustomBtn from '../Components/CustomBtn';
// import Entypo from 'react-native-vector-icons/Entypo';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import {WhiteColor, maincolor, redcolor} from '../assets/Colors';
// import {useDispatch, useSelector} from 'react-redux';
// import OilInputRadio from '../Components/OilInputRadio';
// import {setCurentOrderProductData} from '../store/orderProcessSlice';
// import {webengage} from '../webengage';
// import LoadingModal from '../Components/LoadingModal';
// import {carfilteredProducts, filterProductWithCar, getDataWholeCollection} from '../DataBase/databaseFunction';
// import {setFiltersDta} from '../store/projectSlice';

// const OilFilterDescScreen = ({navigation}) => {
//   const {textStrings} = useTranslation();

//   const {filtersData, oilCompaniesData} = useSelector(state => state.project);
//   let ImagesArr = [
//     {
//       title: 'ac zurex',
//       img: require('../assets/logo-short.png'),
//     },
//     {
//       title: 'shell',
//       img: require('../assets/shellheliux.png'),
//     },
//     {
//       title: 'mobil',
//       img: require('../assets/mobil.png'),
//     },
//     {
//       title: 'castrol',
//       img: require('../assets/castrol.png'),
//     },
//   ];
//   const dispatch = useDispatch();
//   const [openCompanyModal, setopenCompanyModal] = useState(false);
//   const [selectedCompany, setselectedCompany] = useState([]);
//   const [selectedFilters, setselectedFilters] = useState([]);
//   const {curentOrderProductData} = useSelector(state => state.orderProcess);
//   const {isArabicLanguage} = useSelector(state => state.auth);
//   const [productsByCar, setproductsByCar] = useState([]);
//   const [isLoading, setisLoading] = useState(true);
//   const {selectedCar} = curentOrderProductData;
//   const [userSelectedFilterType, setuserSelectedFilterType] = useState('');

//   const fetchFilteredData = async () => {
//     setisLoading(true);
//     try {
//       const filters = await getDataWholeCollection('Filters');
//       dispatch(setFiltersDta({ filtersData: filters }));

//       console.log(JSON.stringify(filters));
//       if (selectedCar?.carName) {
//         const result = await filterProductWithCar("filtersdata",filters, selectedCar.carName);
//         console.log('Fetched Products By Car:', result?.data);
//         console.log(`FILTER LENGTH: ${result.data.length}`);

//         setproductsByCar(result?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching filters or data:", error);
//     } finally {
//       setisLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFilteredData()
//   }, []);

//   const filterSelctFun = async () => {
//     console.log('Selected Filters:', selectedFilters);
//     console.log('User Selected Filter Type:', userSelectedFilterType);

//     if (selectedFilters.length > 0) {
//       if (userSelectedFilterType?.length > 0) {
//         const products = selectedFilters.map(dat => {
//           return {
//             id: dat,
//             referance: 'Filters',
//             quantity: 1,
//             type: userSelectedFilterType,
//           };
//         });
//         const oldOptionalData = curentOrderProductData?.products?.filter(
//           dat => dat?.referance !== 'Filters',
//         );
//         await dispatch(
//           setCurentOrderProductData({
//             curentOrderProductData: {
//               ...curentOrderProductData,
//               products: [...oldOptionalData, ...products],
//             },
//           }),
//         );
//         console.log('Updated Order Product Data:', curentOrderProductData); // Log updated data
//         navigation.navigate('MyCarBillScreen');
//       } else {
//         Alert.alert(textStrings.productTitleEror, textStrings.selctFilterType);
//       }
//     } else {
//       const oldOptionalData = curentOrderProductData?.products?.filter(
//         dat => dat?.referance !== 'Filters',
//       );
//       await dispatch(
//         setCurentOrderProductData({
//           curentOrderProductData: {
//             ...curentOrderProductData,
//             products: [...oldOptionalData],
//           },
//         }),
//       );
//       console.log('Updated Order Product Data (No Filters):', curentOrderProductData); // Log updated data
//       navigation.navigate('MyCarBillScreen');
//     }
//   };

//   const oilSelctFun = async () => {
//     console.log('Selected Company:', selectedCompany);
//     if (selectedCompany.length > 0) {
//       const company = selectedCompany.map(dat => {
//         return {id: dat, referance: 'OilCompanies'};
//       });
//       await dispatch(
//         setCurentOrderProductData({
//           curentOrderProductData: {
//             ...curentOrderProductData,
//             preferdCompany: company,
//           },
//         }),
//       );
//       console.log('Updated Order Product Data with Preferred Company:', curentOrderProductData); // Log updated data
//       setopenCompanyModal(!openCompanyModal);
//     } else {
//       Alert.alert(textStrings.productTitleEror, textStrings.productDescEror);
//     }
//   };

//   return (
//     <>
//       <CustomTempTwo
//         firstbtnFun={() => navigation.goBack()}
//         imglink={require('../assets/oilHeader.png')}
//         child2={true}
//         name={textStrings.oilFilterTitleTxt}>
//         <View style={styles.fillcontent}>
//           <Text style={TextStyles.oilfilterrefiltxt}>
//             {textStrings.filtersfiltersNameTxtHead}
//           </Text>

//           <View style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }}>
//   {/* {productsByCar.length === 0 ? ( */}
//     {/* <Text style={stylesNew.noFiltersText}>
//       {textStrings.noFiltersFoundTxt}
//     </Text> */}
//   {/* ) : ( */}
//     <FlatList
//       data={productsByCar}
//       renderItem={({ item }) => {
//         const check = selectedFilters.find(dat => dat === item.id);
//         return (
//           <OilInputRadio
//             title={isArabicLanguage ? item?.productNameArab : item?.productNameEng}
//             commercialPrice={item?.commercialPrice}
//             orignalPrice={item?.originalPrice}
//             isSelectedItem={check}
//             type={userSelectedFilterType}
//             selectionFunc={() => {
//               if (selectedFilters.length <= 0) {
//                 setselectedFilters([item.id]);
//               } else {
//                 if (check) {
//                   setselectedFilters(selectedFilters.filter(dat => dat !== item.id));
//                 } else {
//                   setselectedFilters([...selectedFilters, item.id]);
//                 }
//               }
//             }}
//           />
//         );
//       }}
//       ListFooterComponent={selectedFilters?.length > 0 ? (
//         <View style={{ ...stylesNew.linComp, height: 'auto', alignSelf: 'center', width: Dimensions.get('screen').width - 40 }}>
//           <View style={{ width: '45%' }}>
//             <CustomBtn
//               title={textStrings.orignalTxt}
//               bgColor={userSelectedFilterType === 'original' ? maincolor : WhiteColor}
//               secColor={userSelectedFilterType === 'original' ? WhiteColor : maincolor}
//               clickfun={() => setuserSelectedFilterType('original')}
//             />
//           </View>
//           <View style={{ width: '45%' }}>
//             <CustomBtn
//               title={textStrings.commercialTxt}
//               bgColor={userSelectedFilterType !== 'original' && userSelectedFilterType !== '' ? maincolor : WhiteColor}
//               secColor={userSelectedFilterType !== 'original' && userSelectedFilterType !== '' ? WhiteColor : maincolor}
//               clickfun={() => setuserSelectedFilterType('commercial')}
//             />
//           </View>
//         </View>
//       ) : null}
//     />
//   {/* )} */}
// </View>

//         </View>
//         <View style={{marginVertical: 15}}>
//           <AppBtn title={textStrings.nextTxt} clickfun={filterSelctFun} />
//         </View>
//       </CustomTempTwo>

//       <Modal
//         visible={openCompanyModal}
//         onRequestClose={() => setopenCompanyModal(!openCompanyModal)}>
//         <View style={stylesNew.fillscreenbg}>
//           <CurvedHeaderComp
//             name={textStrings.oilFilterTitleTxt}
//             iconName1={'left'}
//             iconName2={''}
//             firstbtnFun={() => setopenCompanyModal(!openCompanyModal)}
//             secbtnFun={() => console.log('next')}
//             reddot={true}
//           />
//           <View style={styles.otherContent}>
//             <FlatList
//               keyExtractor={item => item.id}
//               data={oilCompaniesData}
//               ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
//               ListFooterComponent={
//                 <View
//                   style={{
//                     width: '95%',
//                     height: 200,
//                     alignSelf: 'center',
//                     marginTop: h('1%'),
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'flex-start',
//                     flexDirection: 'column',
//                     marginTop: h('2%'),
//                     marginBottom: h('10%'),
//                   }}>
//                   <AppBtn
//                     title={textStrings.completeOrder}
//                     clickfun={oilSelctFun}
//                   />
//                 </View>
//               }
//               renderItem={({item}) => {
//                 const fetched = ImagesArr.find(dat =>
//                   `${item?.productNameEng}`
//                     .toLowerCase()
//                     .includes(`${dat.title}`.toLowerCase()),
//                 );
//                 const imageLogo = fetched?.img;
//                 return (
//                   <TouchableOpacity
//                     onPress={() => {
//                       webengage.track('Product Viewed', {
//                         'Product Name': item?.productNameEng,
//                         Price: item?.originalPrice,
//                         Offer: item?.offerEnglish,
//                         Currency: 'SAR',
//                         Image:
//                           ImagesArr?.length > 0 &&
//                           ImagesArr[0]?.imglInk &&
//                           ImagesArr[0]?.imglInk?.includes('http')
//                             ? [ImagesArr[0].imglInk]
//                             : [''],
//                         'Brand Name': item?.productNameEng,
//                       });
//                       setselectedCompany([item.id]);
//                     }}
//                     style={stylesNew.mainConatinerCardOil}>
//                     <View style={stylesNew.imageContainer}>
//                       <Image
//                         source={imageLogo}
//                         style={{
//                           width: '100%',
//                           height: h('5%'),
//                           resizeMode: 'contain',
//                           marginTop: h('0.5%'),
//                         }}
//                       />
//                     </View>
//                     <View style={stylesNew.txtContainer}>
//                       <Image
//                         source={require('../assets/fillertick.png')}
//                         style={{
//                           width: h('3%'),
//                           height: h('4%'),
//                           resizeMode: 'contain',
//                           position: 'absolute',
//                           top: h('0.3%'),
//                           right: h('1.3%'),
//                           tintColor: selectedCompany.find(
//                             dat => dat === item.id,
//                           )
//                             ? 'green'
//                             : 'rgba(0,0,0,0.5)',
//                           opacity: selectedCompany.find(dat => dat === item.id)
//                             ? 1
//                             : 0.5,
//                         }}
//                       />
//                       <Text style={TextStyles.oilselectrmainheadingtxt}>
//                         {isArabicLanguage
//                           ? item?.productNameArab
//                           : item?.productNameEng}
//                       </Text>
//                       <View
//                         style={{
//                           ...stylesNew.linComp,
//                           marginVertical: h('0.8%'),
//                         }}>
//                         <Image
//                           style={{
//                             resizeMode: 'contain',
//                             height: '100%',
//                             width: h('3%'),
//                           }}
//                           source={require('../assets/riyal_logo.jpg')}
//                         />
//                         <Text
//                           style={{
//                             ...TextStyles.oilsectorfilltxtspae,
//                             color: redcolor,
//                             lineHeight: h('3.7%'),
//                           }}>
//                           {item?.originalPrice} $
//                         </Text>
//                       </View>
//                       <View style={stylesNew.linComp}>
//                         <Image
//                           style={{
//                             resizeMode: 'contain',
//                             height: '100%',
//                             width: h('3%'),
//                           }}
//                           source={require('../assets/offericon.png')}
//                         />
//                         <Text
//                           style={{
//                             ...TextStyles.oilsectorfilltxtspae,
//                             lineHeight: h('3.7%'),
//                           }}>
//                           {isArabicLanguage
//                             ? item?.offerArab
//                             : item?.offerEnglish}
//                         </Text>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//       <LoadingModal visibleModal={isLoading} />
//     </>
//   );
// };

// export default OilFilterDescScreen;
// const stylesNew = StyleSheet.create({
//   fillscreenbg: {
//     height: '100%',
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   noFiltersText: {
//     textAlign: 'center',
//     color: 'red', // or any color that fits your design
//     marginVertical: 20,
//     fontSize: 16,
//   },

//   otherContent: {
//     width: '100%',
//     flex: 1,
//     alignSelf: 'center',
//   },
//   mainConatinerCardOil: {
//     width: '90%',
//     alignSelf: 'center',
//     height: h('14%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     backgroundColor: '#FBFBFB',
//     borderWidth: 0.5,
//     borderColor: '#BFD0E5',
//   },

//   imageContainer: {
//     width: '30%',
//     height: '90%',
//   },
//   txtContainer: {
//     width: '68%',
//     height: '90%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     position: 'relative',
//   },
//   linComp: {
//     width: '100%',
//     height: h('3.7%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
// });

// const styles = StyleSheet.create({
//   fillcontent: {
//     width: '90%',
//     flex: 1,
//     alignSelf: 'center',
//     marginVertical: h('1%'),
//     marginTop: h('4%'),
//   },
//   descriptionContainer: {
//     width: '100%',
//     height: h('5%'),
//     marginBottom: h('2%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginBottom: h('4%'),
//   },

//   changebtn: {
//     width: '30%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   modalConatiner: {
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   optionContainer: {
//     width: '95%',
//     height: h('45%'),
//     backgroundColor: 'white',
//     borderRadius: h('1%'),
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   closebtnmodal: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: h('9%'),
//     height: h('9%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTempTwo from '../Components/CustomTempTwo';
import {w, h} from 'react-native-responsiveness';
import AppBtn from '../Components/AppBtn';
import CustomBtn from '../Components/CustomBtn';
import Entypo from 'react-native-vector-icons/Entypo';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {WhiteColor, maincolor, redcolor} from '../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import OilInputRadio from '../Components/OilInputRadio';
import {setCurentOrderProductData} from '../store/orderProcessSlice';
import {webengage} from '../webengage';
import LoadingModal from '../Components/LoadingModal';
import {
  carfilteredProducts,
  filterProductWithCar,
  getDataWholeCollection,
} from '../DataBase/databaseFunction';
import {setFiltersDta} from '../store/projectSlice';

const OilFilterDescScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const {filtersData, oilCompaniesData} = useSelector(state => state.project);
  let ImagesArr = [
    {
      title: 'ac zurex',
      img: require('../assets/logo-short.png'),
    },
    {
      title: 'shell',
      img: require('../assets/shellheliux.png'),
    },
    {
      title: 'mobil',
      img: require('../assets/mobil.png'),
    },
    {
      title: 'castrol',
      img: require('../assets/castrol.png'),
    },
  ];
  const dispatch = useDispatch();
  const [openCompanyModal, setopenCompanyModal] = useState(false);
  const [selectedCompany, setselectedCompany] = useState([]);
  const [selectedFilters, setselectedFilters] = useState([]);
  const {curentOrderProductData} = useSelector(state => state.orderProcess);
  const {isArabicLanguage} = useSelector(state => state.auth);
  const [productsByCar, setproductsByCar] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const {selectedCar} = curentOrderProductData;
  const [userSelectedFilterType, setuserSelectedFilterType] = useState('');

  useEffect(() => {
    const fetchFilteredData = async () => {
      setisLoading(true);
      try {
        const filters = await getDataWholeCollection('Filters');
        dispatch(setFiltersDta({filtersData: filters}));
        console.log(filters);
        if (selectedCar?.carName) {
          const result = await filterProductWithCar(
            'filtersdata',
            filters,
            selectedCar.carName,
          );
          console.log('Fetched Products By Car:', result?.data);
          console.log(`FILTER LENGTH: ${result.data.length}`);

          setproductsByCar(result?.data);
        }
      } catch (error) {
        console.error('Error fetching filters or data:', error);
      } finally {
        setisLoading(false);
      }
    };
    fetchFilteredData();
  }, [selectedCar?.carName, dispatch]);

  const filterSelctFun = async () => {
    console.log('Selected Filters:', selectedFilters);
    console.log('User Selected Filter Type:', userSelectedFilterType);

    if (selectedFilters.length > 0) {
      if (userSelectedFilterType?.length > 0) {
        const products = selectedFilters.map(dat => {
          return {
            id: dat,
            referance: 'Filters',
            quantity: 1,
            type: userSelectedFilterType,
          };
        });
        const oldOptionalData = curentOrderProductData?.products?.filter(
          dat => dat?.referance !== 'Filters',
        );
        await dispatch(
          setCurentOrderProductData({
            curentOrderProductData: {
              ...curentOrderProductData,
              products: [...oldOptionalData, ...products],
            },
          }),
        );
        console.log('Updated Order Product Data:', curentOrderProductData); // Log updated data
        navigation.navigate('MyCarBillScreen');
      } else {
        Alert.alert(textStrings.productTitleEror, textStrings.selctFilterType);
      }
    } else {
      const oldOptionalData = curentOrderProductData?.products?.filter(
        dat => dat?.referance !== 'Filters',
      );
      await dispatch(
        setCurentOrderProductData({
          curentOrderProductData: {
            ...curentOrderProductData,
            products: [...oldOptionalData],
          },
        }),
      );
      console.log(
        'Updated Order Product Data (No Filters):',
        curentOrderProductData,
      ); // Log updated data
      navigation.navigate('MyCarBillScreen');
    }
  };

  const oilSelctFun = async () => {
    console.log('Selected Company:', selectedCompany);
    if (selectedCompany.length > 0) {
      const company = selectedCompany.map(dat => {
        return {id: dat, referance: 'OilCompanies'};
      });
      await dispatch(
        setCurentOrderProductData({
          curentOrderProductData: {
            ...curentOrderProductData,
            preferdCompany: company,
          },
        }),
      );
      console.log(
        'Updated Order Product Data with Preferred Company:',
        curentOrderProductData,
      ); // Log updated data
      setopenCompanyModal(!openCompanyModal);
    } else {
      Alert.alert(textStrings.productTitleEror, textStrings.productDescEror);
    }
  };

  return (
    <>
      <CustomTempTwo
        firstbtnFun={() => navigation.goBack()}
        imglink={require('../assets/oilHeader.png')}
        child2={true}
        name={textStrings.oilFilterTitleTxt}>
        <View style={styles.fillcontent}>
          <Text style={TextStyles.oilfilterrefiltxt}>
            {textStrings.filtersfiltersNameTxtHead}
          </Text>
          <View
            style={{
              width: '100%',
              flex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}>
            {isLoading ? (
              <Text></Text>
            ) : productsByCar.length === 0 ? (
              <Text style={stylesNew.noFiltersText}>
                {textStrings.noFiltersFoundTxt}
              </Text>
            ) : (
              <FlatList
                data={productsByCar}
                renderItem={({item}) => {
                  const check = selectedFilters.find(dat => dat === item.id);
                  return (
                    <OilInputRadio
                      title={
                        isArabicLanguage
                          ? item?.productNameArab
                          : item?.productNameEng
                      }
                      commercialPrice={item?.commercialPrice}
                      orignalPrice={item?.originalPrice}
                      isSelectedItem={check}
                      type={userSelectedFilterType}
                      selectionFunc={() => {
                        if (selectedFilters.length <= 0) {
                          setselectedFilters([item.id]);
                        } else {
                          if (check) {
                            setselectedFilters(
                              selectedFilters.filter(dat => dat !== item.id),
                            );
                          } else {
                            setselectedFilters([...selectedFilters, item.id]);
                          }
                        }
                      }}
                    />
                  );
                }}
                ListFooterComponent={
                  selectedFilters?.length > 0 ? (
                    <View
                      style={{
                        ...stylesNew.linComp,
                        height: 'auto',
                        alignSelf: 'center',
                        width: Dimensions.get('screen').width - 40,
                      }}>
                      <View style={{width: '45%'}}>
                        <CustomBtn
                          title={textStrings.orignalTxt}
                          bgColor={
                            userSelectedFilterType === 'original'
                              ? maincolor
                              : WhiteColor
                          }
                          secColor={
                            userSelectedFilterType === 'original'
                              ? WhiteColor
                              : maincolor
                          }
                          clickfun={() => setuserSelectedFilterType('original')}
                        />
                      </View>
                      <View style={{width: '45%'}}>
                        <CustomBtn
                          title={textStrings.commercialTxt}
                          bgColor={
                            userSelectedFilterType !== 'original' &&
                            userSelectedFilterType !== ''
                              ? maincolor
                              : WhiteColor
                          }
                          secColor={
                            userSelectedFilterType !== 'original' &&
                            userSelectedFilterType !== ''
                              ? WhiteColor
                              : maincolor
                          }
                          clickfun={() =>
                            setuserSelectedFilterType('commercial')
                          }
                        />
                      </View>
                    </View>
                  ) : null
                }
              />
            )}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <AppBtn title={textStrings.nextTxt} clickfun={filterSelctFun} />
        </View>
      </CustomTempTwo>

      <Modal
        visible={openCompanyModal}
        onRequestClose={() => setopenCompanyModal(!openCompanyModal)}>
        <View style={stylesNew.fillscreenbg}>
          <CurvedHeaderComp
            name={textStrings.oilFilterTitleTxt}
            iconName1={'left'}
            iconName2={''}
            firstbtnFun={() => setopenCompanyModal(!openCompanyModal)}
            secbtnFun={() => console.log('next')}
            reddot={true}
          />
          <View style={styles.otherContent}>
            <FlatList
              keyExtractor={item => item.id}
              data={oilCompaniesData}
              ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
              ListFooterComponent={
                <View
                  style={{
                    width: '95%',
                    height: 200,
                    alignSelf: 'center',
                    marginTop: h('1%'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    // marginTop: h('2%'),
                    marginBottom: h('10%'),
                  }}>
                  <AppBtn
                    title={textStrings.completeOrder}
                    clickfun={oilSelctFun}
                  />
                </View>
              }
              renderItem={({item}) => {
                const fetched = ImagesArr.find(dat =>
                  `${item?.productNameEng}`
                    .toLowerCase()
                    .includes(`${dat.title}`.toLowerCase()),
                );
                const imageLogo = fetched?.img;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      webengage.track('Product Viewed', {
                        'Product Name': item?.productNameEng,
                        Price: item?.originalPrice,
                        Offer: item?.offerEnglish,
                        Currency: 'SAR',
                        Image:
                          ImagesArr?.length > 0 &&
                          ImagesArr[0]?.imglInk &&
                          ImagesArr[0]?.imglInk?.includes('http')
                            ? [ImagesArr[0].imglInk]
                            : [''],
                        'Brand Name': item?.productNameEng,
                      });
                      setselectedCompany([item.id]);
                    }}
                    style={stylesNew.mainConatinerCardOil}>
                    <View style={stylesNew.imageContainer}>
                      <Image
                        source={imageLogo}
                        style={{
                          width: '100%',
                          height: h('5%'),
                          resizeMode: 'contain',
                          marginTop: h('0.5%'),
                        }}
                      />
                    </View>
                    <View style={stylesNew.txtContainer}>
                      <Image
                        source={require('../assets/fillertick.png')}
                        style={{
                          width: h('3%'),
                          height: h('4%'),
                          resizeMode: 'contain',
                          position: 'absolute',
                          top: h('0.3%'),
                          right: h('1.3%'),
                          tintColor: selectedCompany.find(
                            dat => dat === item.id,
                          )
                            ? 'green'
                            : 'rgba(0,0,0,0.5)',
                          opacity: selectedCompany.find(dat => dat === item.id)
                            ? 1
                            : 0.5,
                        }}
                      />
                      <Text style={TextStyles.oilselectrmainheadingtxt}>
                        {isArabicLanguage
                          ? item?.productNameArab
                          : item?.productNameEng}
                      </Text>
                      <View
                        style={{
                          ...stylesNew.linComp,
                          marginVertical: h('0.8%'),
                        }}>
                        <Image
                          style={{
                            resizeMode: 'contain',
                            height: '100%',
                            width: h('3%'),
                          }}
                          source={require('../assets/riyal_logo.jpg')}
                        />
                        <Text
                          style={{
                            ...TextStyles.oilsectorfilltxtspae,
                            color: redcolor,
                            lineHeight: h('3.7%'),
                          }}>
                          {item?.originalPrice} $
                        </Text>
                      </View>
                      <View style={stylesNew.linComp}>
                        <Image
                          style={{
                            resizeMode: 'contain',
                            height: '100%',
                            width: h('3%'),
                          }}
                          source={require('../assets/offericon.png')}
                        />
                        <Text
                          style={{
                            ...TextStyles.oilsectorfilltxtspae,
                            lineHeight: h('3.7%'),
                          }}>
                          {isArabicLanguage
                            ? item?.offerArab
                            : item?.offerEnglish}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <LoadingModal visibleModal={isLoading} />
    </>
  );
};

export default OilFilterDescScreen;
const stylesNew = StyleSheet.create({
  fillscreenbg: {
    height: '100%',
    width: w('100%'),
    backgroundColor: 'white',
  },
  noFiltersText: {
    textAlign: 'center',
    color: 'red', // or any color that fits your design
    marginVertical: 20,
    fontSize: 16,
  },

  otherContent: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  mainConatinerCardOil: {
    width: '90%',
    alignSelf: 'center',
    height: h('14%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
  },

  imageContainer: {
    width: '30%',
    height: '90%',
  },
  txtContainer: {
    width: '68%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  linComp: {
    width: '100%',
    height: h('3.7%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const styles = StyleSheet.create({
  fillcontent: {
    width: '90%',
    flex: 0,
    alignSelf: 'center',
    marginVertical: h('12%'),
    marginTop: h('4%'),
  },
  descriptionContainer: {
    width: '100%',
    height: h('5%'),
    marginBottom: h('2%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // marginBottom: h('4%'),
  },

  changebtn: {
    width: '30%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
});
