import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
const AboutScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [showMore, setshowMore] = useState(false);
  const termsdata = [
    {
      question: textStrings.aboutUsQuestion1,
      answer: textStrings.aboutUsAnswer1,
      id: 0,
    },
    {
      question: textStrings.aboutUsQuestion2,
      answer: textStrings.aboutUsAnswer2,
      id: 1,
    },
    {
      question: textStrings.aboutUsQuestion3,
      answer: textStrings.aboutUsAnswer3,
      id: 2,
    },
    {
      question: textStrings.aboutUsQuestion4,
      answer: textStrings.aboutUsAnswer4,
      id: 3,
    },
    {
      question: textStrings.aboutUsQuestion5,
      answer: textStrings.aboutUsAnswer5,
      id: 4,
    },
  ];
  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.aboutUsQuestion1}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
        iconName2={''}
        secbtnFun={() => console.log('next')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <FlatList
          keyExtractor={item => item.id}
          data={showMore ? termsdata : termsdata.slice(0, 3)}
          ItemSeparatorComponent={<View style={{marginBottom: 5}} />}
          ListFooterComponent={
            <TouchableOpacity
              onPress={() => setshowMore(!showMore)}
              style={{
                width: '95%',
                height: h('5%'),
                alignSelf: 'center',
                marginVertical: h('3%'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={TextStyles.termscreenbtntxt}>
                {showMore ? textStrings.btnLess : textStrings.btnMore}
              </Text>
            </TouchableOpacity>
          }
          renderItem={({item}) => (
            <View style={styles.pointContainer}>
              <View style={styles.SrNumberCont}>
                <Text style={TextStyles.aboutquestiontxt}>
                  {item?.question}
                </Text>
              </View>
              <View style={styles.MainTextCont}>
                <Text style={TextStyles.aboutanswertxt}>{item?.answer}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  fillscreenbg: {
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
    paddingBottom: 50,
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
    paddingBottom: h('10%'),
  },
  pointContainer: {
    width: w('90%'),
    minHeight: 20,
    alignSelf: 'center',
  },
  SrNumberCont: {
    width: '100%',
    marginBottom: h('1.2%'),
  },
  MainTextCont: {
    width: '100%',
  },
});
