import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface Props {
  onPress: any;
  name: string;
  category?: string;
}

const ExploreCard = (props: Props) => {
  return (
    <TouchableOpacity style={{ margin: 5 }} onPress={props.onPress}>
      <View
        style={{
          height: '100%',
          width: 140,
          alignItems: 'center',
          elevation: 1,
          borderColor: '#D3D3D3',
          borderRadius: 1,
        }}
      >
        <Image
          style={{ height: '80%', width: '98%' }}
          source={require('../../Images/work.jpg')}
        />
        <View
          style={{
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreCard;
