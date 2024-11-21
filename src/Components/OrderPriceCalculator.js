import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import {maincolor, textcolor, redcolor, greencolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const OrderPriceCalculator = ({taxesdat, total, isReverse}) => {
  const {textStrings} = useTranslation();

  const discount = taxesdat.find(item => item.name === textStrings.discountTxt);

  return (
    <>
      <View style={styles.calculatordiv}>
        {taxesdat.map((item, index) => {
          if (item.name === textStrings.discountTxt) {
            return null;
          }
          return (
            <View style={styles.calculatoritem} key={index}>
              <Text style={styles.itemTextLeft}>{item.name}</Text>
              <Text style={styles.itemTextRight}>{item.price} SAR</Text>
            </View>
          );
        })}
        {discount && (
          <View style={styles.calculatoritem}>
            <Text style={styles.itemTextLeft}>{discount.name}</Text>
            <Text style={styles.discountPriceText}>- {discount.price} SAR</Text>
          </View>
        )}
        <View style={styles.totaldiv}>
          <Text style={styles.itemTextLeft}>{textStrings.totalTxt}</Text>
          <Text style={styles.totalPriceText}>{total} SAR</Text>
        </View>
      </View>
    </>
  );
};

export default OrderPriceCalculator;

const styles = StyleSheet.create({
  calculatordiv: {
    paddingHorizontal: w('5%'),
    paddingVertical: h('2%'),
    backgroundColor: 'white',
  },
  calculatoritem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: h('1%'),
  },
  totaldiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: h('2%'),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: h('2%'),
  },
  itemTextLeft: {
    ...TextStyles.addoilreqmainbtndivseltxt,
    flex: 0.4,
    textAlign: 'left',
    color: 'black',
  },
  itemTextRight: {
    ...TextStyles.addoilreqmainbtndivseltxt,
    flex: 0.6,
    textAlign: 'right',
  },
  discountPriceText: {
    ...TextStyles.addoilreqmainbtndivseltxt,
    flex: 0.6,
    textAlign: 'right',
    color: redcolor,
  },
  totalPriceText: {
    ...TextStyles.addoilreqmainbtndivseltxt,
    flex: 0.6,
    textAlign: 'right',
    color: greencolor,
  },
});
