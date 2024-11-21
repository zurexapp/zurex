import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {textcolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import Entypo from 'react-native-vector-icons/Entypo';

const CurvedHeaderComp = ({
  name,
  iconName1,
  iconName2,
  firstbtnFun,
  secbtnFun,
  reddot,
  isNormal,
}) => {
  return (
    <>
      <ImageBackground
        source={require('../assets/Header.png')}
        style={styles.headerImage}></ImageBackground>
      <View style={styles.headerDivCont}>
        <TouchableOpacity
          onPress={iconName1 ? firstbtnFun : null}
          style={styles.headerbtn}>
          {iconName1 ? (
            iconName1 !== 'list' ? (
              <Icon2 name={`${iconName1}`} size={h('3%')} color={textcolor} />
            ) : (
              <Entypo name={`${iconName1}`} size={h('3%')} color={textcolor} />
            )
          ) : null}
        </TouchableOpacity>
        <View style={styles.screenname}>
          <Text
            style={{
              ...TextStyles.curvedHeaderscreenname,
              textTransform: isNormal ? 'none' : 'capitalize',
            }}>
            {name}
          </Text>
        </View>
        {iconName2 ? (
          <TouchableOpacity
            onPress={iconName2 ? secbtnFun : null}
            style={styles.headerbtn}>
            {iconName2 && (
              <Icon2 name={`${iconName2}`} size={h('3%')} color={textcolor} />
            )}
            {reddot && <View style={styles.reddot} />}
          </TouchableOpacity>
        ) : (
          <View style={styles.headerbtn} />
        )}
      </View>
    </>
  );
};

export default CurvedHeaderComp;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: h('25%'),
    resizeMode: 'contain',
    borderRadius: h('4%'),
    position: 'absolute',
    top: -h('12%'),
    zIndex: 2000,
  },
  headerDivCont: {
    width: '100%',
    height: h('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: h('6.5%'),
    zIndex: 2001,
  },
  headerbtn: {
    width: w('13%'),
    height: '80%',
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
});
