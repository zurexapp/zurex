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
const NewCurvedHeader = ({
  name,
  iconName1,
  iconName2,
  firstbtnFun,
  secbtnFun,
  reddot,
  imageLink,
}) => {
  return (
    <ImageBackground
      source={imageLink ? imageLink : require('../assets/newscreenheader.png')}
      style={styles.fillImageDiv}>
      <Image
        source={require('../assets/Header1.png')}
        style={styles.headerImage}
      />
      <View style={styles.headerDivCont}>
        <TouchableOpacity
          onPress={iconName1 ? firstbtnFun : null}
          style={styles.headerbtn}>
          {iconName1 && (
            <Icon2 name={`${iconName1}`} size={h('3.5%')} color={'white'} />
          )}
        </TouchableOpacity>
        <View style={styles.screenname}>
          <Text
            style={{
              ...TextStyles.newcurvedscreenname,
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
    </ImageBackground>
  );
};

export default NewCurvedHeader;

const styles = StyleSheet.create({
  fillImageDiv: {
    width: '100%',
    height: h('50%'),
    position: 'relative',
    resizeMode: 'cover',
  },
  headerImage: {
    width: '100%',
    height: h('25%'),
    resizeMode: 'contain',
    borderRadius: h('4%'),
    position: 'absolute',
    top: -h('9%'),
    opacity: 0.9,
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
});
