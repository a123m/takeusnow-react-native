import React from 'react';
import { Modal, View } from 'react-native';

import { Spinner } from '../';

type Props = {
  visible: boolean;
};

const loader = (props: Props) => {
  return (
    <Modal visible={props.visible} animationType="fade" transparent={true}>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', flex: 1 }}>
        <Spinner mode="full" size="large" color="white" />
      </View>
    </Modal>
  );
};

export default loader;
