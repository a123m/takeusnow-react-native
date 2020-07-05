import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconFeather from 'react-native-vector-icons/Feather';

type Props = {
  onPress: any;
  name: string;
  color?: string;
  iconType?: string;
};

const headerRight = (props: Props) => {
  let Icon;

  switch (props.iconType) {
    case 'SimpleLineIcons':
      Icon = IconSimpleLineIcons;
      break;
    case 'Feather':
      Icon = IconFeather;
      break;
    default:
      Icon = IconSimpleLineIcons;
      break;
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          height: '100%',
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name={props.name} size={22} color={props.color} />
      </View>
    </TouchableOpacity>
  );
};

export default headerRight;
