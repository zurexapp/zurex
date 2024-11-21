import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import FaqComp from '../Components/FaqComp';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
const FaqScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const termsdata = [
    {
      question: textStrings.faqQuestion1,
      answer: textStrings.faqAnswer1,
      id: 0,
    },
    {
      question: textStrings.faqQuestion2,
      answer: textStrings.faqAnswer2,
      id: 1,
    },
    {
      question: textStrings.faqQuestion3,
      answer: textStrings.faqAnswer3,
      id: 2,
    },
    {
      question: textStrings.faqQuestion4,
      answer: textStrings.faqAnswer4,
      id: 3,
    },
    {
      question: textStrings.faqQuestion5,
      answer: textStrings.faqAnswer5,
      id: 4,
    },
    {
      question: textStrings.faqQuestion6,
      answer: textStrings.faqAnswer6,
      id: 5,
    },
    {
      question: textStrings.faqQuestion7,
      answer: textStrings.faqAnswer7,
      id: 6,
    },
    {
      question: textStrings.faqQuestion8,
      answer: textStrings.faqAnswer8,
      id: 7,
    },
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.faqTitleTxt}
        isNormal={true}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <View style={styles.otherContent}>
        <FlatList
          keyExtractor={item => item.id}
          data={termsdata}
          ItemSeparatorComponent={<View style={{marginBottom: h('2%')}} />}
          ListFooterComponent={
            <View
              style={{
                width: '95%',
                height: h('5%'),
                alignSelf: 'center',
                marginTop: h('1%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          }
          renderItem={({item}) => (
            <FaqComp question={item.question} answer={item.answer} />
          )}
        />
      </View>
    </View>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: h('25%'),
    resizeMode: 'contain',
    borderRadius: h('4%'),
    position: 'absolute',
    top: -h('12%'),
  },
  headerDivCont: {
    width: '100%',
    height: h('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('6.5%'),
  },
  headerbtn: {
    width: w('15%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  reddot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
    top: h('2%'),
    right: w('3%'),
  },
  screenname: {
    width: w('70%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  otherContent: {
    width: '100%',
    flex: 1,
  },
  pointContainer: {
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: 20,
    alignSelf: 'center',
  },
  SrNumberCont: {
    width: '15%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  MainTextCont: {
    width: '83%',
    height: '100%',
  },
});
