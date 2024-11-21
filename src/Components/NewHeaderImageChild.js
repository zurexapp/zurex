import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';
const NewHeaderImageChild = ({
  name,
  iconName1,
  iconName2,
  firstbtnFun,
  secbtnFun,
  reddot,
  imaglink,
}) => {
  return (
    <ImageBackground source={imaglink} style={styles.fillImageDiv}>
      <View style={styles.headerDivCont}>
        <TouchableOpacity
          onPress={iconName1 ? firstbtnFun : null}
          style={[styles.headerbtn, imaglink ? styles.circledBackBtn : {}]}>
          {iconName1 && (
            <Icon2
              name={`${iconName1}`}
              size={imaglink ? h('3%') : h('3.5%')}
              color={'white'}
            />
          )}
        </TouchableOpacity>
        <View style={styles.screenname}>
          <Text
            style={{
              ...TextStyles.newheaderimfscreenname,
              textTransform: 'capitalize',
            }}>
            {name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={iconName2 ? secbtnFun : null}
          style={styles.headerbtn}>
          {iconName2 && (
            <Icon2 name={`${iconName2}`} size={h('3.5%')} color={'white'} />
          )}
          {reddot && <View style={styles.reddot} />}
        </TouchableOpacity>
      </View>
      {/* <Image source={imaglink} style={styles.headerImage} /> */}
    </ImageBackground>
  );
};

export default NewHeaderImageChild;

const styles = StyleSheet.create({
  fillImageDiv: {
    width: '100%',
    height: h('30%'),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    resizeMode: 'contain',
  },
  headerImage: {
    width: '100%',
    height: h('23%'),
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -h('6.2%'),
  },
  headerDivCont: {
    width: '95%',
    height: h('8%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
  },
  circledBackBtn: {
    borderRadius: w('10%'),
  },
  headerbtn: {
    width: w('15%'),
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'red',
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
    width: w('65%'),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
