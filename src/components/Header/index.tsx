import React from 'react';
import { View, Text } from 'react-native';

const header = (props: {
  title: React.ReactNode;
  headerRight?: React.ReactNode;
}) => {
  return (
    <View
      style={{
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 5,
        backgroundColor: 'white',
        marginTop: 24,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.title}</Text>
      {props.headerRight ? props.headerRight : <View />}
    </View>
  );
};

export default header;
