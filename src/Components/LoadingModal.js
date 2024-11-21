import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {WhiteColor, maincolor} from '../assets/Colors';
import {h} from 'react-native-responsiveness';
import {useTranslation} from '../Text/TextStrings';

const LoadingModal = ({visibleModal}) => {
  const {textStrings} = useTranslation();

  return (
    <>
      {visibleModal ? (
        <View style={styles.modalDataCont}>
          <ActivityIndicator size={'large'} color={WhiteColor} />
          <Text style={styles.modalTxt}>{textStrings.loadingTxt}</Text>
        </View>
      ) : null}
    </>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  modalDataCont: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9000,
  },
  modalTxt: {
    fontSize: h('2.3%'),
    fontWeight: 'bold',
    color: WhiteColor,
    marginTop: h('3%'),
  },
});
