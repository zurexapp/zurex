import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React from 'react';
import CustomTempTwo from '../Components/CustomTempTwo';
import {w, h} from 'react-native-responsiveness';
import AppBtn from '../Components/AppBtn';
import {textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
const BatteriesScreenDescT = ({navigation}) => {
  const {textStrings} = useTranslation();

  const termsData = [
    {name: `${textStrings.itemNoTxt}` + ' /', value: 'N100L', id: 0},
    {name: `${textStrings.ampereTxt}` + ' /', value: '08', id: 1},
    {name: `${textStrings.lengthTxt}` + ' /', value: '400', id: 2},
    {name: `${textStrings.widthTxt}` + ' /', value: '170', id: 3},
    {name: `${textStrings.heightTxt}` + ' /', value: '210', id: 4},
    {name: `${textStrings.totalHeightTxt}` + ' /', value: '234', id: 5},
    {name: `${textStrings.coolEngyTxt}` + ' /', value: '610', id: 6},
  ];
  return (
    <>
      <CustomTempTwo
        name={textStrings.batteryTxt}
        firstbtnFun={() => navigation.goBack()}>
        <View style={styles.containerView}>
          <ScrollView>
            <View
              style={{
                width: w('90%'),
                height: h('76%'),
                alignSelf: 'center',
              }}>
              <Text style={TextStyles.batteriesdescbatterytitle}>
                Camel - {textStrings.singleBatteryTxt}
              </Text>
              <Text style={TextStyles.batteriesdescbatterydesched}>
                {textStrings.descriptionTxt}:
              </Text>
              <Text style={TextStyles.batteriesdescbatterydes}>
                {textStrings.camelBatteryDescTxt}
              </Text>
              <View style={styles.priceInfoContainer}>
                {termsData?.map((item, index) => (
                  <View key={item?.id}>
                    <View style={styles.linecomp}>
                      <Text style={TextStyles.batteriesdesctaxname}>
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          ...TextStyles.batteriesdesctaxname,
                          color: textcolor,
                          width: '25%',
                          textAlign: 'center',
                        }}>
                        {item?.value ? item?.value : ''}
                      </Text>
                    </View>
                    {index + 1 !== termsData?.length && (
                      <View
                        style={{
                          width: '100%',
                          marginVertical: h('1%'),
                          borderWidth: 0.25,
                          borderColor: '#BFD0E5',
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
              <AppBtn
                title={textStrings.completeOrder}
                clickfun={() => navigation.navigate('addOilRequestScreen')}
              />
            </View>
          </ScrollView>
        </View>
      </CustomTempTwo>
    </>
  );
};

export default BatteriesScreenDescT;

const styles = StyleSheet.create({
  linecomp: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: h('3.6%'),
  },
  taxname: {
    color: 'black',
    fontSize: h('2.3%'),
  },
  containerView: {
    width: '100%',
    flex: 1,
    marginTop: h('4%'),
  },
  priceInfoContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    paddingVertical: h('2%'),
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginTop: h('2%'),
  },
});
