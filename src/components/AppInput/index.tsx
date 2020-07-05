import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type input = {
  style?: Object;
  placeholder?: string | undefined;
  onChangeText: any;
  value: string | undefined;
  secureTextEntry?: any;
  returnKeyType?: any;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  autoCapitalize?: any;
  editable?: any;
  multiline?: any;
  numberOfLines?: any;
  onContentSizeChange?: any;
  placeholderTextColor?: any;
  maxLength?:number | undefined;
};

const AppInput = (props: input) => {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholder={props.placeholder}
      placeholderTextColor={'grey'}
      autoCorrect={false}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      returnKeyType={props.returnKeyType}
      keyboardType={props.keyboardType}
      autoCapitalize={props.autoCapitalize}
      editable={props.editable}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
      onContentSizeChange={props.onContentSizeChange}
      maxLength={props.maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 40,
    textAlign: 'left',
    textAlignVertical: 'top'
    // paddingLeft: 15,
    // paddingRight: 15
  }
});

export default AppInput;
