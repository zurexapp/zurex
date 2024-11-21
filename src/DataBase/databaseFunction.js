import database from '@react-native-firebase/database';
import {TABLE_CLIENT_CARS} from '../ScreenView/CommonUtils';
const postDataWithRef = (collection, docRef, data) => {
  const value = database()
    .ref(`/${collection}/${docRef}`)
    .set({
      ...data,
    });
  return value;
};
const pushDataWithRef = (collection, docRef, data) => {
  const value = database()
    .ref(`/${collection}/${docRef}`)
    .push({
      ...data,
    });
  return value;
};

const checkIsUserExist = async (phone, email = '') => {
  let result = await database()
    .ref('/user/')
    .orderByChild('phoneNumber')
    .equalTo(`${phone}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return {userId, ...data};
      } else {
        return null;
      }
    });
  if (!result && email.length > 0) {
    result = await database()
      .ref('/user/')
      .orderByChild('userEmail')
      .equalTo(`${email}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const userId = Object.keys(snapshot.val())[0];
          const data = Object.values(snapshot.val())[0];
          return {userId, ...data};
        } else {
          return null;
        }
      });
  }

  return result;
};
const checkIsUserEmailExist = async email => {
  let result = await database()
    .ref('/user/')
    .orderByChild('userEmail')
    .equalTo(`${email}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return {userId, ...data};
      } else {
        return null;
      }
    });

  return result?.userEmail?.length > 0 ? true : false;
};
const checkIsUserPhoneNumberExist = async phone => {
  let result = await database()
    .ref('/user/')
    .orderByChild('phoneNumber')
    .equalTo(`${phone}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return {userId, ...data};
      } else {
        return null;
      }
    });

  return result?.phoneNumber?.length > 0 ? true : false;
};
const getChildNodeCount = async collection => {
  const snapshot = await database().ref(`/${collection}`).once('value');
  console.log(`child count: ${snapshot.numChildren()}`);
  return snapshot.numChildren();
};

const postData = (collection, data) => {
  const newReference = database().ref(`${collection}`).push();
  const value = newReference.set({
    ...data,
  });
  return value;
};
const getDataWithRef = async (collection, docRef) => {
  console.log(`get data for ${docRef} in ${collection}`);
  const snapShot = await database()
    .ref(`/${collection}/${docRef}`)
    .once('value');
  const data = snapShot.val();
  console.log('fetched data', data);
  return {...data, userId: docRef};
};
const getEmployDataWithJobrole = async role => {
  try {
    const ref = database().ref('/employ');
    const snapshot = await ref.orderByChild('role').equalTo(role).once('value');
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const postUserDataWithId = async (id, data) => {
  const value = database()
    .ref(`/user/${id}`)
    .update({...data});
  return value;
};
const UpdateOrderWithId = async (id, data) => {
  return await database()
    .ref(`/orders/${id}`)
    .update({...data});
};

const getDataWholeCollection = async collection => {
  console.log(`Start fetching for ${collection}`);

  const value = await database()
    .ref(`/${collection}`)
    .once('value', onSnapshot => {
      return onSnapshot.val();
    });
  let returnArr = [];
  console.log(`Befor loop`);
  value.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.id = childSnapshot.key;
    returnArr.push(item);
  });
  console.log(`After Loop`);
  return returnArr;
};

// const getDataWholeCollection = async (collection) => {
//   console.log(`Start fetching for ${collection}`);

//   try {
//     const snapshot = await database()
//       .ref(`/${collection}`)
//       .once('value');

//     if (!snapshot.exists()) {
//       console.log(`${collection} collection does not exist.`);
//       return [];
//     }

//     let returnArr = [];
//     console.log(`Before loop for ${collection}`);

//     snapshot.forEach(childSnapshot => {
//       let item = childSnapshot.val();

//       if (!item) {
//         console.warn(`Null or undefined data found for ${collection}`);
//         return; // Skip invalid data
//       }

//       if (!childSnapshot.key) {
//         console.warn(`Missing key for ${collection}`);
//         return; // Skip if key is missing
//       }

//       item.id = childSnapshot.key;
//       returnArr.push(item);
//     });

//     console.log(`After loop, fetched data for ${collection}:`, returnArr.length, "items");
//     return returnArr;
//   } catch (error) {
//     console.error(`Error fetching data for ${collection}:`, error);
//     return [];
//   }
// };

const getfilteredproducts = async (collection, selectedCar) => {
  await database()
    .collection(collection)
    .where('carCompany', '==', selectedCar.category)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(' => ', doc.data());
      });
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
};

// const getfilteredproducts = async (collection, selectedCarName) => {
//   const value = await database()
//     .ref(`/${collection}`)
//     .orderByChild(`suitableVehicles`)
//     .once('value', onSnapshot => {
//       return onSnapshot.val();
//     });

//   let returnArr = [];

//   value.forEach(childSnapshot => {
//     let item = childSnapshot.val();
//     item.id = childSnapshot.key;

//     // If selectedCarName is provided, filter the items
//     if (selectedCarName) {
//       const hasSuitableVehicle = item.suitableVehicles?.some(vehicle =>
//         `${vehicle?.carCompany} ${vehicle?.carName} ${vehicle?.carModel}`.toLowerCase() ===
//         selectedCarName.toLowerCase()
//       );

//       if (hasSuitableVehicle) {
//         returnArr.push(item);
//       }
//     } else {
//       returnArr.push(item);
//     }
//   });

//   return returnArr;
// };

const removeData = async (collection, docRef) => {
  return await database().ref(`/${collection}/${docRef}`).remove();
};

const getMYOrders = async userid => {
  let result = await database()
    .ref('orders')
    .orderByChild('OrderedByUserId')
    .equalTo(`${userid}`)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  if (result) {
    let returnArr = [];
    Object.entries(result).forEach(dat => {
      returnArr.push({id: dat[0], ...dat[1]});
    });
    return returnArr;
  } else {
    return [];
  }
};
const getBookedTimeSlotsByDate = async (date, orderProcessName) => {
  let result = await database()
    .ref('orders')
    .orderByChild('appointment/date')
    .equalTo(date) //Fri Jul 19 2024)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  if (result) {
    let returnArr = [];
    Object.entries(result).forEach(dat => {
      if (result[dat[0]].orderProcessName === orderProcessName) {
        returnArr.push(result[dat[0]].appointment.time);
      }
    });
    return returnArr;
  } else {
    return [];
  }
};

const getPaymentStatusByOrderId = async orderId => {
  let result = await database()
    .ref('orderPayments')
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  if (result) {
    let returnArr = [];
    Object.entries(result).forEach(dat => {
      if (dat[1].orderId === orderId) {
        returnArr.push({id: dat[0], ...dat[1]});
      }
    });
    return returnArr;
  } else {
    return null;
  }
};

const getMyCars = async userid => {
  console.log('Fetching cardata');
  let result = await database()
    .ref(TABLE_CLIENT_CARS)
    .orderByChild('userId')
    .equalTo(userid)
    .once('value');

  console.log('fetched car data');

  if (result.exists()) {
    const returnArr = Object.entries(result.val()).map(([id, data]) => ({
      id,
      ...data,
    }));
    return returnArr;
  } else {
    return [];
  }
};

const getMYServicesReq = async userid => {
  let result = await database()
    .ref('supportOrders')
    .orderByChild('OrderedByUserId')
    .equalTo(`${userid}`)
    .once('value')
    .then(onSnapshot => {
      return onSnapshot.val();
    });
  let returnArr = [];
  if (result !== null) {
    Object.entries(result).forEach(dat => {
      returnArr.push({id: dat[0], ...dat[1]});
    });
  }

  return returnArr;
};
// const filterProductWithCar = async (collection,data, carName) => {
//   const filterDataByCar = data.filter(
//     dat =>
//       dat?.suitableVehicles?.filter(
//         duc =>
//           `${duc?.carCompany} ${duc?.carName} ${duc?.carModal}`.toLowerCase() ===
//             `${carName}`?.toLowerCase() ||
//           `${duc?.carCompanyAr} ${duc?.carNameAr} ${duc?.carModal}` ===
//             `${carName}`,
//       )?.length > 0,
//   );
//   return {
//     status: filterDataByCar?.length > 0 ? 'filtred' : 'original',
//     data: filterDataByCar?.length > 0 ? filterDataByCar : [],
//   };
// };

const filterProductWithCar = async (collection, data, carName) => {
  // Check if the collection is valid
  const isCollectionValid = ['Engineoils', 'oils', 'filters'].includes(
    collection,
  );
  console.log(`selected car :${carName}`);

  // If the collection is valid, return the original data
  if (isCollectionValid) {
    return {
      status: 'original',
      data: data,
    };
  }

  // Proceed with filtering if the collection is not valid
  const filterDataByCar = data.filter(
    dat =>
      dat?.suitableVehicles?.filter(
        duc =>
          `${duc?.carCompany} ${duc?.carName} ${duc?.carModal}`.toLowerCase() ===
            `${carName}`?.toLowerCase() ||
          `${duc?.carCompanyAr} ${duc?.carNameAr} ${duc?.carModal}` ===
            `${carName}`,
      )?.length > 0,
  );

  return {
    status: filterDataByCar?.length > 0 ? 'filtered' : 'original',
    data: filterDataByCar?.length > 0 ? filterDataByCar : [],
  };
};

const cancelOrderStatus = async (id, status, resonTxt) => {
  return await database().ref(`/orders/${id}`).update({
    orderStatus: status,
    cancelReasonTxt: resonTxt,
    updatedAt: Date.now(),
  });
};
export {
  filterProductWithCar,
  postDataWithRef,
  pushDataWithRef,
  getDataWithRef,
  getDataWholeCollection,
  postData,
  removeData,
  checkIsUserExist,
  getChildNodeCount,
  postUserDataWithId,
  getMYOrders,
  UpdateOrderWithId,
  getMYServicesReq,
  checkIsUserEmailExist,
  checkIsUserPhoneNumberExist,
  cancelOrderStatus,
  getMyCars,
  getBookedTimeSlotsByDate,
  getPaymentStatusByOrderId,
  getEmployDataWithJobrole,
  getfilteredproducts,
};
