import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {w, h} from 'react-native-responsiveness';
import Icon2 from 'react-native-vector-icons/AntDesign';
import TextStyles from '../Text/TextStyles';
const FaqComp = ({question, answer}) => {
  const [showAnswer, setshowAnswer] = useState(false);
  return (
    <TouchableOpacity
      style={{
        width: '95%',
        minHeight: 20,
        alignSelf: 'center',
        marginBottom: h('1%'),
      }}
      onPress={() => setshowAnswer(!showAnswer)}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{width: w('89%')}}>
          <Text style={TextStyles.faqcompquesttxt}>{question}</Text>
        </View>
        <View
          style={{
            width: w('6%'),
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: h('6%'),
          }}>
          {showAnswer ? (
            <Icon2 name="up" size={h('2.7%')} color={'black'} />
          ) : (
            <Icon2 name="down" size={h('2.7%')} color={'black'} />
          )}
        </View>
      </View>
      {showAnswer && (
        <View
          style={{
            width: '100%',
            marginVertical: h('2%'),
          }}>
          <Text style={TextStyles.faqcompanstxt}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FaqComp;

const styles = StyleSheet.create({});
