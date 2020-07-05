import React from 'react';
import { Modal, Alert, View, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  children: Element;
}

const _renderModal = (props: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default _renderModal;
