import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import moment from 'moment';

import { AppCard, Avatar } from '../';

interface Props {
  name: string;
  value: string;
  rating: number;
  createdAt: Date | string;
}

const _renderReviewCard = (props: Props) => {
  return (
    <AppCard>
      <Text>{props.value}</Text>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar size="small" source="" />
          <View style={{ justifyContent: 'space-evenly', margin: 5 }}>
            <Rating
              readonly
              type="star"
              ratingCount={5}
              imageSize={12}
              startingValue={props.rating}
              ratingBackgroundColor="black"
            />
            <Text style={{ color: 'grey' }}>
              by: <Text style={{ color: 'black' }}>{props.name}</Text>
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: 'grey' }}>
            {moment(props.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between' },
  innerContainer: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderTopColor: 'silver',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default _renderReviewCard;
