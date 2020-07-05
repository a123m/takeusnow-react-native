import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { convertTime } from '../../utils/utils';

import { Styles } from '../../common';

type Props = {
  text: string;
  chatId?: number;
  userId: number;
  localUserId: number;
  createdAt: string;
};

const _renderBubble = (props: Props) => {
  let dynamicMain;
  let dynamicBubble;
  let dynamicColors: Array<string>;
  if (props.localUserId === props.userId) {
    dynamicMain = styles.userMainContainer;
    dynamicBubble = styles.userBubble;
    dynamicColors = [
      Styles.PrimaryColor2,
      Styles.PrimaryColor,
      Styles.PrimaryColor3
    ];
  } else {
    dynamicMain = styles.mainContainer;
    dynamicBubble = styles.bubble;
    dynamicColors = ['#696969', '#808080', '#A9A9A9'];
  }
  return (
    <View style={dynamicMain}>
      <View style={styles.time}>
        <Text style={{ fontSize: 10 }}>{convertTime(props.createdAt)}</Text>
      </View>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={dynamicColors}
        style={dynamicBubble}
      >
        <Text style={{ color: 'white' }}>{props.text}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    margin: 5
  },
  userMainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5
  },
  bubble: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 10,
    maxWidth: '80%'
  },
  userBubble: {
    backgroundColor: Styles.PrimaryColor,
    borderRadius: 5,
    padding: 10,
    maxWidth: '80%'
  },
  time: { justifyContent: 'center', padding: 5 }
});

export default _renderBubble;
