import React from 'react';
import { Modal } from 'react-native';

interface Props {
  visible: boolean;
  children: Element;
  transparent?: boolean;
  animationType?: 'fade' | 'none' | 'slide';
  onRequestClose?(): void;
}

const _renderModal = (props: Props) => {
  return (
    <Modal
      animationType={props.animationType ? props.animationType : 'slide'}
      transparent={props.transparent ? props.transparent : false}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      {props.children}
    </Modal>
  );
};

export default _renderModal;
