import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Rating } from 'react-native-elements';

import { Avatar } from '../';

interface Props {
  sourceUri: string;
  fullName: string;
  proposalOffer: number;
  proposalText: string;
  onPress(): void;
  totalReviews: number;
  averageReviews: number | undefined;
}

const AppProposal = (props: Props) => {
  let str = '';
  if (props.proposalText.length > 55) {
    str = props.proposalText.substr(0, 55);
  } else {
    str = props.proposalText;
  }
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={{ padding: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 0.18,
              justifyContent: 'center',
            }}
          >
            <Avatar source={props.sourceUri} size={'small'} />
          </View>
          <View style={{ flex: 0.8, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.8, overflow: 'hidden', height: 20 }}>
                <Text style={{ fontSize: 16 }}>{props.fullName}</Text>
              </View>
              <View style={{ flex: 0.2 }}>
                <Text style={{ fontSize: 16, textAlign: 'right' }}>
                  ₹{props.proposalOffer}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 14,
                  width: 25,
                  borderRadius: 5,
                  backgroundColor: 'rgb(241,196,15)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 10 }}>
                  {props.averageReviews}
                </Text>
              </View>
              <Rating
                readonly
                type="star"
                ratingCount={5}
                startingValue={props.averageReviews}
                imageSize={12}
                style={{ margin: 5 }}
              />
              <Text>{props.totalReviews} Reviews</Text>
            </View>
          </View>
        </View>
        <Text>{str}...</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppProposal;
