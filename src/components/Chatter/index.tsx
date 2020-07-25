import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Avatar } from '../index';
import { convertTime } from '../../utils/utils';

type Props = {
  name: string;
  text?: string;
  time?: any;
  onPress: any;
  onLongPress?: any;
  imageUri?: string;
};

const _renderChatter = (props: Props) => {
  let time = convertTime(props.time);
  return (
    <TouchableOpacity onLongPress={props.onLongPress} onPress={props.onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.smallContainer}>
          <Avatar size={'small'} source={''} />
        </View>
        <View style={styles.bigContainer}>
          <View style={styles.internalContainer}>
            <Text style={{ fontSize: 16 }}>{props.name}</Text>
          </View>
          <View style={styles.internalContainer}>
            <Text style={{ fontSize: 15, color: 'silver' }}>{props.text}</Text>
          </View>
        </View>
        <View style={styles.smallContainer}>
          <Text style={{ color: 'grey', fontSize: 12 }}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  smallContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigContainer: {
    flex: 4,
    justifyContent: 'space-around',
  },
  internalContainer: { height: 20, width: '100%', overflow: 'hidden' },
});

export default _renderChatter;
