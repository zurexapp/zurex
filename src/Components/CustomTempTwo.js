import {StyleSheet, View} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor} from '../assets/Colors';
import NewCurvedHeader from './NewCurvedHeader';
import NewHeaderImageChild from './NewHeaderImageChild';
const CustomTempTwo = ({children, child2, name, imglink, firstbtnFun}) => {
  return (
    <View style={styles.fillscreenbg}>
      {child2 ? (
        <NewHeaderImageChild
          iconName1={'left'}
          firstbtnFun={firstbtnFun}
          name={name}
          imaglink={imglink}
        />
      ) : (
        <NewCurvedHeader
          iconName1={'left'}
          firstbtnFun={firstbtnFun}
          name={name}
          imageLink={imglink}
        />
      )}

      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

export default CustomTempTwo;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: maincolor,
    position: 'relative',
  },
  imagContainer: {
    width: w('100%'),
    height: h('25%'),
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    height: h('75%'),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: h('6%'),
    borderTopRightRadius: h('6%'),
  },
});
