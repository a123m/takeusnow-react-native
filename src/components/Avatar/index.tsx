import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type Props = {
  size: string;
  source: string | object;
};

const _renderAvatar = (props: Props) => {
  const { size, source } = props;
  let containerStyle;
  let imageStyle;
  switch (size) {
    case 'small':
      containerStyle = styles.containerSmall;
      imageStyle = styles.imageSmall;
      break;
    case 'medium':
      containerStyle = styles.containerMedium;
      imageStyle = styles.imageMedium;
      break;
    case 'large':
      containerStyle = styles.containerLarge;
      imageStyle = styles.imageLarge;
      break;
  }
  let mySource;
  if (!source || source !== '' || source === undefined) {
    mySource = require('../../Images/avatar.png');
  } else {
    mySource = source;
  }
  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={mySource} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerSmall: {
    height: 52,
    width: 52,
    borderWidth: 1,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  imageSmall: {
    height: 48,
    width: 48,
    borderRadius: 100,
  },
  containerMedium: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  imageMedium: {
    height: 75,
    width: 75,
    borderRadius: 100,
  },
  containerLarge: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  imageLarge: {
    height: 145,
    width: 145,
    borderRadius: 100,
  },
});

export default _renderAvatar;
