import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Styles } from '../../common';

type button = {
  style?: object;
  children: string | Element | undefined | object;
  onPress: any;
  type?: 'solid' | 'clear' | 'outline' | undefined;
  loading?: boolean;
  disabled?: boolean;
  iconName?: string | undefined;
  buttonType?: 'solid' | 'clear' | undefined;
};

const AppButton = (props: button) => {
  if (props.iconName == undefined) {
    props.iconName = '';
  }
  if (props.buttonType === 'clear') {
    return (
      <Button
        title={props.children}
        type={props.type}
        loading={props.loading}
        onPress={props.onPress}
        disabled={props.disabled}
        buttonStyle={[styles.buttonStyleClear, props.style]}
        titleStyle={{ color: Styles.PrimaryColor2 }}
      />
    );
  }
  if (props.iconName) {
    return (
      <Button
        icon={
          <Icon
            name={props.iconName}
            size={15}
            color="white"
            style={{ paddingRight: 5 }}
          />
        }
        title={props.children}
        type={props.type}
        loading={props.loading}
        onPress={props.onPress}
        disabled={props.disabled}
        buttonStyle={[styles.buttonStyle, props.style]}
      />
    );
  }
  return (
    <Button
      title={props.children}
      type={props.type}
      loading={props.loading}
      onPress={props.onPress}
      disabled={props.disabled}
      buttonStyle={[styles.buttonStyle, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Styles.PrimaryColor2,
    // elevation:10
  },
  buttonStyleClear: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    // elevation:10
  },
});

export default AppButton;
