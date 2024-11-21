// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useRef} from 'react';
// import {w, h} from 'react-native-responsiveness';
// import {WhiteColor, maincolor} from '../assets/Colors';
// import {useSelector} from 'react-redux';

// const CustomWaitScreenTemp = ({isSwitch, children}) => {
//   const {mobileClientsBanner} = useSelector(state => state.project);
//   const c = useRef(null);
//   return (
//     <View style={styles.fillscreenbg}>
//       {isSwitch ? (
//         mobileClientsBanner?.length > 0 ? (
//           <FlatList
//             snapToInterval={w('100%')}
//             decelerationRate="fast"
//             horizontal
//             snapToAlignment="center"
//             data={
//               mobileClientsBanner?.length > 0
//                 ? mobileClientsBanner
//                 : [{imgLink: require('../assets/ZurexHomeBanner.jpg')}]
//             }
//             renderItem={({item, index}) => {
//               return (
//                 <Image
//                   key={index}
//                   style={styles.imagContainer}
//                   resizeMode="cover"
//                   source={{uri: `${item.imgLink}`}}
//                 />
//               );
//             }}
//           />
//         ) : (
//           <Image
//             style={styles.imagContainer}
//             resizeMode="contain"
//             source={require('../assets/ZurexHomeBanner.jpg')}
//           />
//         )
//       ) : (
//         <ImageBackground
//           style={styles.imagContainer}
//           resizeMode="cover"
//           source={require('../assets/ZurexHomeBanner.jpg')}
//         />
//       )}

//       <View style={styles.contentContainer}>{children}</View>
//     </View>
//   );
// };

// export default CustomWaitScreenTemp;

// const styles = StyleSheet.create({
//   fillscreenbg: {
//     height: h('100%'),
//     width: w('100%'),
//     backgroundColor: 'white',

//     // position: 'relative',
//   },
//   imagContainer: {
//     width: w('100%'),
//     height: '47%',
//   },
//   contentContainer: {
//     position: 'absolute',
//     bottom: 0,
//     height: h('57%'),
//     width: '100%',
//     backgroundColor: 'white',
//     borderTopLeftRadius: h('6%'),
//     borderTopRightRadius: h('6%'),
//   },
// });

import {FlatList, Image, ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {useSelector} from 'react-redux';

const CustomWaitScreenTemp = ({isSwitch, children}) => {
  const {mobileClientsBanner} = useSelector(state => state.project);

  const renderBanner = () => {
    if (mobileClientsBanner?.length > 0) {
      return (
        <FlatList
          snapToInterval={w('100%')}
          decelerationRate="fast"
          horizontal
          snapToAlignment="center"
          data={mobileClientsBanner}
          renderItem={({item, index}) => (
            <Image
              key={index}
              style={styles.imagContainer}
              resizeMode="cover"
              source={{uri: item.imgLink}}
            />
          )}
        />
      );
    }

    return (
      <Image
        style={styles.imagContainer}
        resizeMode="contain"
        source={require('../assets/ZurexHomeBanner.jpg')}
      />
    );
  };

  return (
    <View style={styles.fillscreenbg}>
      {isSwitch ? (
        renderBanner()
      ) : (
        <ImageBackground
          style={styles.imagContainer}
          resizeMode="cover"
          source={require('../assets/ZurexHomeBanner.jpg')}
        />
      )}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

export default CustomWaitScreenTemp;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  imagContainer: {
    width: w('100%'),
    height: '47%',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    height: h('57%'),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: h('6%'),
    borderTopRightRadius: h('6%'),
  },
});
