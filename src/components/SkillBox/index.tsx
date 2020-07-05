import React from 'react';
import { View, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { AppButton } from '../';

import { Styles } from '../../common';

interface Props {
  value: string;
  level: number;
  showCross?: boolean;
  onCrossPress?: Function;
}

const SkillBox = (props: Props) => {
  return (
    <View
      style={{
        padding: 3,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 15 }}>{props.value}</Text>
      {props.showCross ? null : (
        <Rating
          readonly
          type="star"
          ratingCount={5}
          imageSize={20}
          startingValue={props.level}
        />
      )}
      {props.showCross === true ? (
        <AppButton
          style={{ backgroundColor: 'white' }}
          onPress={props.onCrossPress}
        >
          <Icon name={'close'} size={20} color={Styles.PrimaryColor} />
        </AppButton>
      ) : null}
    </View>
  );
};

export default SkillBox;
