import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Styles } from '../../common';

interface Props {
  text: string;
  showCross?: boolean | undefined;
  size?: number;
  onPress?: any;
}

const boxText = (props: Props) => {
  if (props.showCross) {
    return (
      <View style={styles.container}>
        <Text style={props.size ? { fontSize: props.size } : styles.textStyle}>
          {props.text}
        </Text>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <Icon
            name="close"
            size={props.size ? props.size : 12}
            color={Styles.PrimaryColor2}
            style={{ marginHorizontal: 6, marginVertical: 7 }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
  return (
    <View style={styles.container2}>
      <Text
        style={
          props.size
            ? { color: 'grey', fontSize: props.size }
            : styles.textStyle
        }
      >
        {props.text}
      </Text>
    </View>
  );
};

export default boxText;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    margin: 3,
    paddingTop: 0,
    paddingBottom: 0,
  },
  container2: {
    overflow: 'hidden',
    justifyContent: 'center',
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 3,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textStyle: { color: 'grey', fontSize: 10 },
});
