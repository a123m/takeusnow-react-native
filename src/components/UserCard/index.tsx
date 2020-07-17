import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { AppCard, Avatar } from '../';

interface Props {
  fname: string;
  lname: string;
  averageReviews: number;
  totalReviews: number;
  userImage: string;
  onPress?(): void;
}

const UserCard = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <AppCard style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 0.18,
            justifyContent: 'center',
          }}
        >
          <Avatar source={props.userImage} size={'small'} />
        </View>
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ overflow: 'hidden', height: 20 }}>
              <Text style={{ fontSize: 16 }}>
                {props.fname}{' '}
                <Text style={{ fontSize: 16 }}>{props.lname}</Text>
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
        <View
          style={{
            flex: 0.08,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name={'arrow-right'} />
        </View>
      </AppCard>
    </TouchableOpacity>
  );
};

export default UserCard;
