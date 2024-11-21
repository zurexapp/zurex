import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {w, h} from 'react-native-responsiveness';
import {textcolor, redcolor} from '../assets/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextStyles from '../Text/TextStyles';
const OrderCompleteSteps = ({
  isSeprator,
  time,
  text,
  isCompleted,
  iconName,
}) => {
  return (
    <>
      <View style={styles.stepContainer}>
        <View
          style={{
            ...styles.stepiconcont,
            backgroundColor: isCompleted
              ? 'rgba(159, 39, 52, 0.13)'
              : 'rgba(0,0,0,0.1)',
          }}>
          {isCompleted ? (
            iconName === 'delivery-dining' ? (
              <Icon name={`${iconName}`} size={h('3.5%')} color={redcolor} />
            ) : (
              <Icon2 name={`${iconName}`} size={h('3.5%')} color={redcolor} />
            )
          ) : (
            <View style={styles.blackdot} />
          )}
        </View>
        <View style={styles.stepinfo}>
          <Text style={TextStyles.orderstepstimetxt}>{time}</Text>
          <Text style={TextStyles.orderstepsdesctxt}>{text}</Text>
        </View>
      </View>
      {isSeprator && (
        <View style={styles.seprtcont}>
          <View style={styles.seprator} />
        </View>
      )}
    </>
  );
};

export default OrderCompleteSteps;

const styles = StyleSheet.create({
  stepContainer: {
    width: w('90%'),
    height: h('10%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  stepiconcont: {
    width: w('11%'),
    height: w('11%'),
    borderRadius: w('15%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepinfo: {
    width: w('73%'),
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingLeft: w('2%'),
  },

  blackdot: {
    width: w('4%'),
    height: w('4%'),
    borderRadius: w('3%'),
    backgroundColor: textcolor,
  },
  seprtcont: {
    width: w('95%'),
    height: h('4.5%'),
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: w('9.5%'),
    marginBottom: h('2%'),
  },
  seprator: {
    width: w('0.2%'),
    height: '100%',
    backgroundColor: textcolor,
  },
});
