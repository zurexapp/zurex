import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {maincolor, textcolor} from '../assets/Colors';
import CurvedHeaderComp from '../Components/CurvedHeaderComp';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import {scale} from 'react-native-size-matters';

const TipsScreen = ({navigation}) => {
  const {textStrings} = useTranslation();

  const [showMore, setshowMore] = useState(false);
  const [firstShow, setfirstShow] = useState(false);
  const [secShow, setsecShow] = useState(false);
  const [thirdShow, setthirdShow] = useState(false);
  const [forthShow, setforthShow] = useState(false);

  return (
    <View style={styles.fillscreenbg}>
      <CurvedHeaderComp
        name={textStrings.tipsAndArticleTxt}
        iconName1={'list'}
        firstbtnFun={() => navigation.toggleDrawer()}
      />
      <View style={styles.otherContent}>
        {!secShow && !thirdShow && !forthShow && (
          <TouchableOpacity
            style={styles.questionMain}
            onPress={() => setfirstShow(!firstShow)}>
            <Text style={TextStyles.tipscreenmainQuestionText}>
              <Image
                style={{
                  height: h('3.2%'),
                  width: h('4%'),
                  resizeMode: 'contain',
                  marginBottom: 10,
                }}
                source={require('../assets/tips.png')}
              />
              {textStrings.resons9TxtHead}{' '}
            </Text>
          </TouchableOpacity>
        )}
        {firstShow && (
          <FlatList
            keyExtractor={item => item.id}
            data={
              showMore
                ? textStrings.firstartcle
                : textStrings.firstartcle.slice(0, 6)
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
                  {showMore ? textStrings.btnLess : textStrings.btnMore}
                </Text>
              </TouchableOpacity>
            }
            renderItem={({item}) => (
              <View style={styles.pointContainer}>
                <View style={styles.SrNumberCont}>
                  <Text style={TextStyles.termscreenlistid}>
                    {item?.id + 1}.
                  </Text>
                </View>
                <View style={styles.MainTextCont}>
                  <Text style={TextStyles.rattinHeadintxt}>
                    {item?.question}
                  </Text>
                  <Text style={TextStyles.aboutanswertxt}>{item?.answer}</Text>
                </View>
              </View>
            )}
          />
        )}
        {!firstShow && !thirdShow && !forthShow && (
          <TouchableOpacity
            style={styles.questionMain}
            onPress={() => setsecShow(!secShow)}>
            <Text style={TextStyles.tipscreenmainQuestionText}>
              <Image
                style={{
                  height: h('3.2%'),
                  width: h('4%'),
                  resizeMode: 'contain',
                  marginBottom: 10,
                }}
                source={require('../assets/tips.png')}
              />
              {textStrings.secret10TxtHead}{' '}
            </Text>
          </TouchableOpacity>
        )}
        {secShow && (
          <FlatList
            keyExtractor={item => item.id}
            data={textStrings.secondarticle}
            ItemSeparatorComponent={<View style={{marginBottom: 5}} />}
            renderItem={({item}) => (
              <View style={styles.pointContainer}>
                <View style={styles.SrNumberCont}>
                  <Text
                    style={{
                      ...TextStyles.aboutquestiontxt,
                      fontSize: scale(16),
                    }}>
                    {item?.id + 1}.
                  </Text>
                </View>
                <View style={styles.MainTextCont}>
                  <Text
                    style={{...TextStyles.lineedbtnbtntxt, color: maincolor}}>
                    {item?.answer}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
        {!secShow && !firstShow && !forthShow && (
          <TouchableOpacity
            style={styles.questionMain}
            onPress={() => setthirdShow(!thirdShow)}>
            <Text style={TextStyles.tipscreenmainQuestionText}>
              <Image
                style={{
                  height: h('3.2%'),
                  width: h('4%'),
                  resizeMode: 'contain',
                  marginBottom: 10,
                }}
                source={require('../assets/tips.png')}
              />
              {textStrings.tip7HotHeadTxt}{' '}
            </Text>
          </TouchableOpacity>
        )}
        {thirdShow && (
          <FlatList
            keyExtractor={item => item.id}
            data={textStrings.thirdarticle}
            ItemSeparatorComponent={<View style={{marginBottom: 5}} />}
            renderItem={({item}) => (
              <View style={styles.pointContainer}>
                <View style={styles.SrNumberCont}>
                  <Text
                    style={{
                      ...TextStyles.termscreenlistid,
                      color: maincolor,
                    }}>
                    {item?.id + 1}.
                  </Text>
                </View>
                <View style={styles.MainTextCont}>
                  <Text
                    style={{
                      ...TextStyles.lineedbtnbtntxt,
                      color: maincolor,
                    }}>
                    {item?.answer}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
        {!secShow && !thirdShow && !firstShow && (
          <TouchableOpacity
            style={styles.questionMain}
            onPress={() => setforthShow(!forthShow)}>
            <Text style={TextStyles.tipscreenmainQuestionText}>
              <Image
                style={{
                  height: h('3.2%'),
                  width: h('4%'),
                  resizeMode: 'contain',
                  marginBottom: 10,
                }}
                source={require('../assets/tips.png')}
              />
              {textStrings.replaceTimeTopHeadTxt}{' '}
            </Text>
          </TouchableOpacity>
        )}
        {forthShow && (
          <FlatList
            keyExtractor={item => item.id}
            data={textStrings.fortharticle}
            ItemSeparatorComponent={<View style={{marginBottom: 5}} />}
            renderItem={({item}) => (
              <View style={styles.pointContainer}>
                <View style={styles.SrNumberCont}>
                  <Text
                    style={{
                      ...TextStyles.termscreenlistid,
                      color: maincolor,
                    }}>
                    {item?.id + 1}.
                  </Text>
                </View>
                <View style={styles.MainTextCont}>
                  <Text
                    style={{
                      ...TextStyles.lineedbtnbtntxt,
                      color: maincolor,
                    }}>
                    {item?.answer}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  questionMain: {
    width: '90%',
    marginBottom: h('3%'),
    alignSelf: 'center',
  },

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
