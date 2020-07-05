import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Styles } from '../../common';

interface Props {
  onPress: any;
}

const FAB = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.TouchableOpacityStyle}
    >
      <View style={styles.FloatingButtonStyle}>
        <Icon name={'addfolder'} color={'white'} size={22} />
      </View>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  // MainContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5F5F5',
  // },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    // backgroundColor: 'black',
  },

  FloatingButtonStyle: {
    backgroundColor: Styles.PrimaryColor2,
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
