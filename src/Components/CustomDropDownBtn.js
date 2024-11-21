import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  textcolor,
  redcolor,
  c0color,
  maincolor,
  WhiteColor,
} from '../assets/Colors';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';
import {useTranslation} from '../Text/TextStrings';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

const CustomDropDownBtn = ({
  mainHeading,
  title,
  value,
  onCangeValue,
  listData,
  isDropDown,
  isDisabled,
}) => {
  const {textStrings} = useTranslation();
  const [openDropModel, setopenDropModel] = useState(false);
  const findtitle = () => {
    const result = listData?.filter(dat => dat.value === value);
    return result[0]?.title
      ? result[0]?.title
      : textStrings.productHasBeenDeleted;
  };
  const [searchInputTxt, setsearchInputTxt] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    // Cleanup
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <>
      <View
        style={{
          width: '100%',
          height: h('9%'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}>
        <TouchableOpacity
          onPress={() => setopenDropModel(!openDropModel)}
          disabled={isDisabled}
          style={{
            width: '90%',
            height: h('7.5%'),
            backgroundColor: '#FAFCFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#BFD0E5',
            paddingHorizontal: w('4%'),
          }}>
          <Text
            style={{
              ...TextStyles.customDropdowntitletxt,
              textTransform: 'capitalize',
              color: value?.length <= 0 && value === '' ? c0color : textcolor,
            }}>
            {value ? findtitle() : title}
          </Text>
          <View
            style={{
              width: w('10%'),
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Icon2
              name={isDropDown ? 'down' : `right`}
              size={h('3%')}
              color={value?.length <= 0 && value === '' ? c0color : textcolor}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={openDropModel}
        transparent
        onRequestClose={() => setopenDropModel(!openDropModel)}>
        <StatusBar backgroundColor={WhiteColor} barStyle={'dark-content'} />
        <View style={styles.blacktransparentdiv}>
          <TouchableOpacity
            onPress={() => setopenDropModel(!openDropModel)}
            style={{flex: 1, width: '100%'}}
          />
          <View
            style={{
              ...styles.optionContainer,
              height: isKeyboardOpen ? h('55%') : h('70%'),
            }}>
            <View
              style={{
                width: '90%',
                height: h('7%'),
                alignSelf: 'center',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
                marginVertical: h('2%'),
              }}>
              <Text
                style={{...TextStyles.dropdownlistoiltxt, textAlign: 'right'}}>
                {mainHeading}
              </Text>
            </View>

            <View
              style={{
                width: '90%',
                height: h('7%'),
                alignSelf: 'center',
                backgroundColor: '#FBFBFB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#BFD0E5',
                borderRadius: 6,
                paddingHorizontal: 10,
                marginBottom: h('2%'),
              }}>
              <Icon2 name="search1" size={h('3.5%')} color={'#707070'} />
              <TextInput
                value={searchInputTxt}
                onChangeText={text => setsearchInputTxt(text)}
                returnKeyType="done"
                style={{
                  ...TextStyles.textinputfamilyclassAll,
                  flex: 1,
                  height: '100%',
                  fontSize: h('2.6%'),
                  marginLeft: 10,
                }}
              />
            </View>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                flex: 1,
              }}>
              <FlatList
                keyExtractor={item => item.id}
                data={listData?.filter(dat =>
                  `${dat?.title}`
                    ?.toLowerCase()
                    ?.includes(searchInputTxt?.toLowerCase()),
                )}
                ItemSeparatorComponent={
                  <View style={{marginBottom: h('2%')}} />
                }
                ListEmptyComponent={
                  <View
                    style={{
                      width: '95%',
                      height: h('35%'),
                      alignSelf: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon3 name="car-alt" color={c0color} size={h('9%')} />
                  </View>
                }
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
                  <TouchableOpacity
                    onPress={() => {
                      onCangeValue(item?.value);
                      setopenDropModel(!openDropModel);
                    }}
                    style={styles.pointContainer}>
                    <View
                      style={{
                        ...styles.circleCont,
                        borderColor:
                          value !== item?.value ? '#BFD0E5' : redcolor,
                      }}>
                      {value === item?.value && (
                        <View style={styles.smallcont} />
                      )}
                    </View>
                    <View style={styles.firstTxtCont}>
                      <Text style={TextStyles.customdropdownvaluetxt}>
                        {item?.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomDropDownBtn;

const styles = StyleSheet.create({
  blacktransparentdiv: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingTop: StatusBar.currentHeight,
  },
  optionContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: h('70%'),
    borderTopLeftRadius: h('5%'),
    borderTopRightRadius: h('5%'),
  },
  pointContainer: {
    width: '100%',
    height: h('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  circleCont: {
    width: h('5%'),
    height: h('5%'),
    borderRadius: h('10%'),
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTxtCont: {
    width: '87%',
  },
  smallcont: {
    width: h('2.5%'),
    height: h('2.5%'),
    borderRadius: h('10%'),
    backgroundColor: redcolor,
  },
});
