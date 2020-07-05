import React from 'react';
import { StyleSheet, View } from 'react-native';

const AppCard = (props: any) => {
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
