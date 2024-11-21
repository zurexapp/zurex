import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {h} from 'react-native-responsiveness';
import {maincolor, redcolor, textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
const AppBtn = ({clickfun, title, isDisabled, height}) => {
  return (
    <View
      style={{
        width: '100%',
        height: height ? height : h('15%'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
      }}>
      {isDisabled ? (
        <View
          onPress={clickfun}
          style={{
            width: '75%',
            height: h('7.5'),
            backgroundColor: textcolor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}>
          <Text style={TextStyles.appbtntxt}>{title}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={clickfun}
          style={{
            width: '75%',
            height: h('7.5'),
            backgroundColor: maincolor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}>
          <Text style={TextStyles.appbtntxt}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppBtn;
