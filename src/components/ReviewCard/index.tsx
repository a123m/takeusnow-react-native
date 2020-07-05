import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';

interface Props {
  fullName: string;
  value: string;
  rating: number;
}

const _renderReviewCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, { borderTopWidth: 0 }]}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {props.fullName}
        </Text>
      </View>
      <View style={[styles.innerContainer, { height: 120 }]}>
        <Text>{props.value}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Rating
          readonly
          type="star"
          ratingCount={5}
          imageSize={20}
          startingValue={props.rating}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 8,
    backgroundColor: 'white',
    elevation: 10
  },
  innerContainer: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderTopColor: 'silver',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default _renderReviewCard;
