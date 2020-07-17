/** @format */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import Device from '../../utils/Device'

const SIZES = { SMALL: 'small', LARGE: 'large' };

export const Mode = { normal: 'normal', full: 'full', overlay: 'overlay' };

type Props = {
  mode: string;
  size: any;
  color: string;
};

class Spinner extends React.PureComponent<Props> {
  render() {
    const { size, color, mode } = this.props;

    let containerStyle = styles.container;
    switch (mode) {
      case Mode.full:
        containerStyle = styles.container_full_stretch;
        break;
      case Mode.overlay:
        containerStyle = styles.container_overlay;
        break;
    }
    return (
      <View style={containerStyle}>
        <ActivityIndicator
          size={size}
          color={color}
          style={[
            styles.wrapper,
            { borderRadius: size == SIZES.SMALL ? 10 : 20 }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    elevation: 3
  },
  container_full_stretch: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  container_overlay: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    height: Device.ScreenHeight - 130,
    width: Device.ScreenWidth
  },
  wrapper: {
    backgroundColor: 'transparent',
    zIndex: 100
  }
});

export default Spinner;
