import {StyleSheet, View, FlatList, Modal} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from './CurvedHeaderComp';
import LineedBtnMarkBill from './LineedBtnMarkBill';
import {useSelector} from 'react-redux';

const SelectNewProductModal = ({show, hide, value, data, onChange}) => {
  const {isArabicLanguage} = useSelector(state => state.auth);

  const {oilsData} = useSelector(state => state.project);

  return (
    <Modal visible={show} onRequestClose={hide}>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp name={' '} iconName1={'left'} firstbtnFun={hide} />
        <View style={styles.otherContent}>
          <View style={styles.optionContainerMain}>
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                const check = value.id === item.id;
                return (
                  <LineedBtnMarkBill
                    key={index}
                    isShowBorder={oilsData?.length !== index + 1 ? true : false}
                    title={
                      isArabicLanguage
                        ? item?.productNameArab
                        : item?.productNameEng
                    }
                    price={item?.originalPrice}
                    isSelectedItem={check ? true : false}
                    selectionFunc={() => {
                      onChange(item);
                      hide();
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectNewProductModal;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  otherContent: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
});
