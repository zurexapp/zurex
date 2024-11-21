// import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import {c0color, maincolor} from '../assets/Colors';
// import CurvedHeaderComp from '../Components/CurvedHeaderComp';
// import TextStyles from '../Text/TextStyles';
// import {useTranslation} from '../Text/TextStrings';
// import {useDispatch, useSelector} from 'react-redux';
// import {setMyOrdersData} from '../store/projectSlice';
// import {getMYOrders} from '../DataBase/databaseFunction';
// import {useIsFocused} from '@react-navigation/native';
// import MyOrderComponents from '../Components/MyOrderComponents';
// import LoadingModal from '../Components/LoadingModal';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MyOrderScreen = ({navigation}) => {
//   const {textStrings} = useTranslation();
//   const isFocused = useIsFocused();

//   const [btnSelectedValue, setbtnSelectedValue] = useState('Current');
//   const {myOrdersData} = useSelector(state => state.project);
//   const [isLoadingModal, setisLoadingModal] = useState(false);
//   const dispatch = useDispatch();
//   const [currentOrderActiveArray, setcurrentOrderActiveArray] = useState([]);

//   const getAllMyOrders = async () => {
//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       if (userId) {
//         const getMyOrdersResult = await getMYOrders(userId);
//         console.log(getMyOrdersResult, 'ooooooooooo');

//         if (getMyOrdersResult) {
//           const sortedByDate = getMyOrdersResult?.sort(
//             (a, b) => b?.createdAt - a?.createdAt,
//           );
//           dispatch(setMyOrdersData({myOrdersData: sortedByDate}));
//           console.log(myOrdersData, 'ppppppppppppppp');
//         }
//       } else {
//         navigation.replace('Login', {routeName: 'home4btn'});
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setisLoadingModal(false);
//     }
//   };
//   useEffect(() => {
//     setisLoadingModal(true);
//     getAllMyOrders();
//   }, []);

//   useEffect(() => {
//     const setOrdersWithButton = () => {
//       if (myOrdersData?.length > 0) {
//         if (btnSelectedValue === 'Current') {
//           setcurrentOrderActiveArray(
//             myOrdersData?.filter(
//               dat =>
//                 dat.orderStatus === 'pending' || dat.orderStatus === 'assigned',
//             ),
//           );
//         } else if (btnSelectedValue === 'Coming') {
//           setcurrentOrderActiveArray(
//             myOrdersData?.filter(dat => dat.orderStatus === 'approved'),
//           );
//         } else if (btnSelectedValue === 'Previous') {
//           setcurrentOrderActiveArray(
//             myOrdersData?.filter(
//               dat =>
//                 dat.orderStatus === 'completed' ||
//                 dat.orderStatus === 'canceled',
//             ),
//           );
//         } else {
//           setcurrentOrderActiveArray([]);
//         }
//       } else {
//         setcurrentOrderActiveArray([]);
//       }
//     };
//     setOrdersWithButton();
//   }, [btnSelectedValue, myOrdersData]);

//   return (
//     <View style={styles.fillscreenbg}>
//       <CurvedHeaderComp name={textStrings.myOrder} />
//       <LoadingModal
//         visibleModal={isLoadingModal && myOrdersData.length === 0}
//       />
//       <View style={styles.otherContent}>
//         <View style={styles.topBtncontainers}>
//           <TouchableOpacity
//             onPress={() => setbtnSelectedValue('Current')}
//             style={{
//               ...styles.btnTabComp,
//               backgroundColor:
//                 btnSelectedValue === 'Current' ? maincolor : 'transparent',
//             }}>
//             <Text
//               style={{
//                 ...TextStyles.Myorderbtntxt,
//                 color: btnSelectedValue === 'Current' ? 'white' : c0color,
//               }}>
//               {textStrings.currentBtnTxt}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setbtnSelectedValue('Coming')}
//             style={{
//               ...styles.btnTabComp,
//               marginVertical: w('2%'),
//               backgroundColor:
//                 btnSelectedValue === 'Coming' ? maincolor : 'transparent',
//             }}>
//             <Text
//               style={{
//                 ...TextStyles.Myorderbtntxt,
//                 color: btnSelectedValue === 'Coming' ? 'white' : c0color,
//               }}>
//               {textStrings.comingBtnTxt}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setbtnSelectedValue('Previous')}
//             style={{
//               ...styles.btnTabComp,
//               backgroundColor:
//                 btnSelectedValue === 'Previous' ? maincolor : 'transparent',
//             }}>
//             <Text
//               style={{
//                 ...TextStyles.Myorderbtntxt,
//                 color: btnSelectedValue === 'Previous' ? 'white' : c0color,
//               }}>
//               {textStrings.perviosBtnTxt}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{...styles.otherContent, marginTop: h('3%')}}>
//           <FlatList
//             refreshing={isLoadingModal}
//             onRefresh={() => getAllMyOrders()}
//             keyExtractor={item => item.id}
//             data={currentOrderActiveArray}
//             ListEmptyComponent={() => (
//               <View style={styles.emptyView}>
//                 <Text style={{...TextStyles.Myorderbtntxt, color: c0color}}>
//                   {textStrings.emptyListValue}
//                 </Text>
//               </View>
//             )}
//             ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
//             showsVerticalScrollIndicator={false}
//             ListFooterComponent={
//               <View
//                 style={{
//                   width: '95%',
//                   height: h('10%'),
//                   alignSelf: 'center',
//                   marginTop: h('1%'),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               />
//             }
//             renderItem={({item}) => (
//               <MyOrderComponents
//                 products={item.products} // Ensure this is structured correctly
//                 Date={new Date(item.createdAt).toDateString()}
//                 id={item.id}
//                 onPress={() =>
//                   navigation.navigate('orderDetailScreen', {data: item})
//                 }
//                 orderPrice={item.totalPrice}
//                 orderStatus={item.orderStatus}
//                 freeServicesCount={item.freeServicesCount}
//                 quantity={item.products[0]?.quantity} // Access quantity safely
//                 key={item.id}
//               />
//             )}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MyOrderScreen;

// const styles = StyleSheet.create({
//   emptyView: {
//     width: w('90%'),
//     height: h('58%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   orderIdTextCont: {
//     height: '100%',
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     marginRight: 5,
//   },
//   sideBtnstatys: {
//     height: '100%',
//     width: '37%',
//     borderWidth: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   quantityContainer: {
//     width: '23%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   priceConatiner: {
//     width: '28%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   dateContainer: {
//     width: '38%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   innerLowerCont: {
//     height: '100%',
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   secondContainer: {
//     width: '100%',
//     height: h('2.5%'),
//     marginVertical: h('1%'),
//   },
//   firstContainer: {
//     width: '100%',
//     height: h('4%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   infoContainerCont: {
//     width: '72%',
//     height: '85%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   imageContainer: {
//     height: h('10%'),
//     width: h('10%'),
//     borderRadius: h('1.5%'),
//     overflow: 'hidden',
//   },
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',
//   },
//   mainimage: {
//     width: w('90%'),
//     resizeMode: 'contain',
//     height: h('30%'),
//   },
//   otherContent: {
//     width: '100%',
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   maintxt: {
//     fontSize: h('2.7%'),
//     color: 'black',
//     marginVertical: h('3%'),
//   },
//   subtext: {
//     width: '70%',
//     textAlign: 'center',
//     fontSize: h('1.9%'),
//     marginBottom: h('14%'),
//   },
//   btnConatiners: {
//     width: w('90%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   btnContainer: {
//     width: '49%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topBtncontainers: {
//     width: w('90%'),
//     height: h('8%'),
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: c0color,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   btnTabComp: {
//     width: '32%',
//     height: '85%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   orderCradCont: {
//     width: w('90%'),
//     backgroundColor: '#FBFBFB',
//     height: h('16%'),
//     borderWidth: 0.8,
//     borderColor: '#BFD0E5',
//   },
//   UperConat: {
//     width: '100%',
//     height: h('16%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//   },
//   lowerConat: {
//     width: '100%',
//     height: h('4%'),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//   },
// });

import React, {useState, useEffect, useCallback} from 'react'; // Add useCallback here
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import {c0color, maincolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {useDispatch, useSelector} from 'react-redux';
import {setMyOrdersData} from '../store/projectSlice';
import {getMYOrders} from '../DataBase/databaseFunction';
import {useIsFocused} from '@react-navigation/native';
import MyOrderComponents from '../Components/MyOrderComponents';
import LoadingModal from '../Components/LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrderScreen = ({navigation}) => {
  const {textStrings} = useTranslation();
  const isFocused = useIsFocused();

  const [btnSelectedValue, setbtnSelectedValue] = useState('Current');
  const {myOrdersData} = useSelector(state => state.project);
  const [isLoadingModal, setisLoadingModal] = useState(false);
  const dispatch = useDispatch();
  const [currentOrderActiveArray, setcurrentOrderActiveArray] = useState([]);

  // Memoizing the getAllMyOrders function with useCallback
  const getAllMyOrders = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const getMyOrdersResult = await getMYOrders(userId);
        console.log(getMyOrdersResult, 'ooooooooooo');

        if (getMyOrdersResult) {
          const sortedByDate = getMyOrdersResult?.sort(
            (a, b) => b?.createdAt - a?.createdAt,
          );
          dispatch(setMyOrdersData({myOrdersData: sortedByDate}));
          console.log(sortedByDate, 'ppppppppppppppp'); // Log the sorted data
        }
      } else {
        navigation.replace('Login', {routeName: 'home4btn'});
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setisLoadingModal(false);
    }
  }, [dispatch, navigation]); // No need for myOrdersData here

  // Using useEffect with the memoized getAllMyOrders
  useEffect(() => {
    setisLoadingModal(true);
    getAllMyOrders(); // Call the memoized function
  }, [getAllMyOrders]); // Effect depends on getAllMyOrders

  // Update the currentOrderActiveArray when btnSelectedValue or myOrdersData changes
  useEffect(() => {
    const setOrdersWithButton = () => {
      if (myOrdersData?.length > 0) {
        if (btnSelectedValue === 'Current') {
          setcurrentOrderActiveArray(
            myOrdersData?.filter(
              dat =>
                dat.orderStatus === 'pending' || dat.orderStatus === 'assigned',
            ),
          );
        } else if (btnSelectedValue === 'Coming') {
          setcurrentOrderActiveArray(
            myOrdersData?.filter(dat => dat.orderStatus === 'approved'),
          );
        } else if (btnSelectedValue === 'Previous') {
          setcurrentOrderActiveArray(
            myOrdersData?.filter(
              dat =>
                dat.orderStatus === 'completed' ||
                dat.orderStatus === 'canceled',
            ),
          );
        } else {
          setcurrentOrderActiveArray([]);
        }
      } else {
        setcurrentOrderActiveArray([]);
      }
    };
    setOrdersWithButton();
  }, [btnSelectedValue, myOrdersData]); // Re-run when btnSelectedValue or myOrdersData change

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp name={textStrings.myOrder} />
      <LoadingModal
        visibleModal={isLoadingModal && myOrdersData.length === 0}
      />
      <View style={styles.otherContent}>
        <View style={styles.topBtncontainers}>
          <TouchableOpacity
            onPress={() => setbtnSelectedValue('Current')}
            style={{
              ...styles.btnTabComp,
              backgroundColor:
                btnSelectedValue === 'Current' ? maincolor : 'transparent',
            }}>
            <Text
              style={{
                ...TextStyles.Myorderbtntxt,
                color: btnSelectedValue === 'Current' ? 'white' : c0color,
              }}>
              {textStrings.currentBtnTxt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setbtnSelectedValue('Coming')}
            style={{
              ...styles.btnTabComp,
              marginVertical: w('2%'),
              backgroundColor:
                btnSelectedValue === 'Coming' ? maincolor : 'transparent',
            }}>
            <Text
              style={{
                ...TextStyles.Myorderbtntxt,
                color: btnSelectedValue === 'Coming' ? 'white' : c0color,
              }}>
              {textStrings.comingBtnTxt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setbtnSelectedValue('Previous')}
            style={{
              ...styles.btnTabComp,
              backgroundColor:
                btnSelectedValue === 'Previous' ? maincolor : 'transparent',
            }}>
            <Text
              style={{
                ...TextStyles.Myorderbtntxt,
                color: btnSelectedValue === 'Previous' ? 'white' : c0color,
              }}>
              {textStrings.perviosBtnTxt}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.otherContent, marginTop: h('3%')}}>
          <FlatList
            refreshing={isLoadingModal}
            onRefresh={() => getAllMyOrders()} // Use the memoized function for pull-to-refresh
            keyExtractor={item => item.id}
            data={currentOrderActiveArray}
            ListEmptyComponent={() => (
              <View style={styles.emptyView}>
                <Text style={{...TextStyles.Myorderbtntxt, color: c0color}}>
                  {textStrings.emptyListValue}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View
                style={{
                  width: '95%',
                  height: h('10%'),
                  alignSelf: 'center',
                  marginTop: h('1%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            }
            renderItem={({item}) => (
              <MyOrderComponents
                products={item.products}
                Date={new Date(item.createdAt).toDateString()}
                id={item.id}
                onPress={() =>
                  navigation.navigate('orderDetailScreen', {data: item})
                }
                orderPrice={item.totalPrice}
                orderStatus={item.orderStatus}
                freeServicesCount={item.freeServicesCount}
                quantity={item.products[0]?.quantity}
                key={item.id}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default MyOrderScreen;
const styles = StyleSheet.create({
  emptyView: {
    width: w('90%'),
    height: h('58%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  mainimage: {
    width: w('90%'),
    resizeMode: 'contain',
    height: h('30%'),
  },
  otherContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  maintxt: {
    fontSize: h('2.7%'),
    color: 'black',
    marginVertical: h('3%'),
  },
  subtext: {
    width: '70%',
    textAlign: 'center',
    fontSize: h('1.9%'),
    marginBottom: h('14%'),
  },
  btnConatiners: {
    width: w('90%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: '49%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBtncontainers: {
    width: w('90%'),
    height: h('8%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: c0color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnTabComp: {
    width: '32%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  orderCradCont: {
    width: w('90%'),
    backgroundColor: '#FBFBFB',
    height: h('16%'),
    borderWidth: 0.8,
    borderColor: '#BFD0E5',
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
});
