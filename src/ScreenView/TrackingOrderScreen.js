import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {w, h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';
const TrackingOrderScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.trackingOrderTxt}
        iconName1={'left'}
        iconName2={''}
        firstbtnFun={() => navigation.goBack()}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <Image
          style={{
            width: '100%',
            height: h('86%'),

            resizeMode: 'cover',
          }}
          source={require('../assets/largemaps.jpg')}
        />
      </View>
    </View>
  );
};

export default TrackingOrderScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
});
