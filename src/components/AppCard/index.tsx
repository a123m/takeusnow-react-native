import React from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
  children?: any;
};

const AppCard = (props: Props) => {
  return <View style={[styles.cardStyle, props.style]}>{props.children}</View>;
};

export default AppCard;

const styles = StyleSheet.create({
  cardStyle: {
    padding: 8,
    margin: 5,
    backgroundColor: 'white',
    elevation: 1,
  },
});
