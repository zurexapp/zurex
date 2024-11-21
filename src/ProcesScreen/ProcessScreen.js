import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
const ProcessScreen = () => {
  const {orderProcessName} = useSelector(state => state.orderProcess);
  return <></>;
};

export default ProcessScreen;

const styles = StyleSheet.create({});
