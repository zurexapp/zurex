import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';

const TermsScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [showMore, setshowMore] = useState(false);

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.termConditionTxt}
        iconName2={''}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
        secbtnFun={() => console.log('sec')}
        reddot={true}
      />
      <View style={styles.otherContent}>
        <FlatList
          keyExtractor={item => item.id}
          data={
            showMore
              ? textStrings.termsdataTxt
              : textStrings.termsdataTxt.slice(0, 6)
          }
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
                <Text style={TextStyles.termscreenbtntxt}>
                  {showMore ? textStrings.btnLess : textStrings.btnMore}
                </Text>
              </Text>
            </TouchableOpacity>
          }
          renderItem={({item}) => (
            <View style={styles.pointContainer}>
              <View style={styles.SrNumberCont}>
                <Text style={TextStyles.termscreenlistid}>{item?.id + 1}.</Text>
              </View>
              <View style={styles.MainTextCont}>
                <Text style={TextStyles.completepaytitle}>{item?.answer}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default TermsScreen;

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
