import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomBtn from './CustomBtn';
import {useTranslation} from '../Text/TextStrings';
import {maincolor} from '../assets/Colors';
import TextStyles from '../Text/TextStyles';
import {w, h} from 'react-native-responsiveness';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

const WarentyCarsComp = ({
  ProductName,
  carImg,
  carCategory,
  carName,
  plateNumber,
  orderIdTxt,
  implementDate,
  serviceDateTxt,
  warenty,
  freeServicesCount,
  onClickFunction,
  onClickBookService,
}) => {
  const {textStrings} = useTranslation();

  const [isExpand, setisExpand] = useState(false);
  const switchModalFunWarnty = () => {
    setisExpand(!isExpand);
    onClickFunction ? onClickFunction(warenty) : console.log('done');
  };
  return (
    <TouchableOpacity
      onPress={switchModalFunWarnty}
      style={{
        ...styles.cardContainerMain,
        height: isExpand ? h('47%') : h('16%'),
      }}>
      <View
        style={{
          ...styles.mainConatibnerBtn,
          height: isExpand ? h('25%') : '90%',
        }}>
        <View style={styles.cardimgContainer}>
          <Icon3 name="car-alt" color={maincolor} size={h('5%')} />
        </View>
        <View style={styles.cardtxtContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={TextStyles.confirmcardatatitletxtcard}>
            {ProductName}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={TextStyles.confirmcardatadesctxtcard}>
            {textStrings.carNameTxt} :
            <Text numberOfLines={1} style={{color: 'black'}}>
              {carName}
            </Text>
          </Text>
          <Text style={TextStyles.confirmcardatadesctxtcard}>
            {textStrings.carPlateTxt} :
            <Text style={{color: 'black'}}>{plateNumber}</Text>
          </Text>
          {isExpand ? (
            <>
              <Text style={TextStyles.confirmcardatadesctxtcard}>
                {textStrings.orderIDTxt} :
                <Text style={{color: 'black'}}>{orderIdTxt}</Text>
              </Text>
              <Text style={TextStyles.confirmcardatadesctxtcard}>
                {textStrings.serviceDateImpltTxt} :
                <Text style={{color: 'black'}}>{implementDate}</Text>
              </Text>
              <Text style={TextStyles.confirmcardatadesctxtcard}>
                {textStrings.serviceDateTxt} :
                <Text style={{color: 'black'}}>{serviceDateTxt}</Text>
              </Text>
              <Text style={TextStyles.confirmcardatadesctxtcard}>
                {textStrings.free_services_count} :
                <Text style={{color: 'black'}}>{freeServicesCount || '0'}</Text>
              </Text>
            </>
          ) : null}
        </View>
      </View>
      {isExpand ? (
        <Text style={{color: warenty ? 'green' : 'red'}}>
          {warenty
            ? textStrings.validWarntyBtnTxt
            : textStrings.inValidWarntyBtnTxt}
        </Text>
      ) : null}
      {isExpand ? (
        <CustomBtn
          title={
            warenty && freeServicesCount > 0
              ? textStrings.book_free_service
              : textStrings.book_paid_service
          }
          secColor={maincolor}
          borderColor={maincolor}
          clickfun={() => onClickBookService()}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default WarentyCarsComp;

const styles = StyleSheet.create({
  cardimgContainer: {
    width: w('10%'),
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  cardtxtContainer: {
    width: w('70%'),
    height: '90%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  mainConatibnerBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: h('25%'),
  },
  cardContainerMain: {
    width: '90%',
    height: h('47%'),
    paddingVertical: h('1%'),
    backgroundColor: '#FBFBFB',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: '#BFD0E5',
    borderRadius: 5,
  },
});
