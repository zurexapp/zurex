import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {textcolor} from '../assets/Colors';
import {w, h} from 'react-native-responsiveness';
import TextStyles from '../Text/TextStyles';
const DateSelectorModelInput = ({
  placeHolder,
  giveCallBack,
  orderProcessName,
}) => {
  const [showModal, setshowModal] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minimumDate =
    orderProcessName === 'battery' || orderProcessName === 'support'
      ? new Date()
      : tomorrow;
  const [selectedDate, setselectedDate] = useState(minimumDate);

  return (
    <>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          setshowModal(!showModal);
        }}>
        <View
          style={{
            height: '100%',
            flex: 1,
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              ...TextStyles.Myorderbtntxt,
              lineHeight: h('6%'),
              textAlign: 'left',
              color: textcolor,
              marginHorizontal: w('1.5%'),
            }}>
            {new Date(selectedDate).toDateString()}
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: w('10%'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: w('0.3%'),
          }}>
          <Image
            source={require('../assets/coloredCalender.png')}
            style={{width: '100%', resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
      <DatePicker
        mode="date"
        modal
        open={showModal}
        minimumDate={minimumDate}
        date={selectedDate}
        onConfirm={date => {
          setshowModal(!showModal);
          setselectedDate(date);
          giveCallBack(date);
        }}
        onCancel={() => {
          setshowModal(!showModal);
        }}
      />
    </>
  );
};

export default DateSelectorModelInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: h('6%'),
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
