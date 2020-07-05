import React from 'react';
import { View, TextInput, Animated } from 'react-native';
// eslint-disable-next-line no-unused-vars
import { AnimatedValue } from 'react-navigation';

interface State {
  isFocused: boolean;
}

export default class FloatingLabelInput extends React.PureComponent<
  any,
  State
> {
  _animatedIsFocused: Animated.Value | undefined | AnimatedValue;

  constructor(props: any) {
    super(props);
    this.state = {
      isFocused: false
    };
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1
    );
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200
    }).start();
  }

  render() {
    const {
      label,
      value,
      secureTextEntry,
      keyboardType,
      autoCapitalize,
      ...props
    } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0]
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12]
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', 'white']
      })
    };
    return (
      <View style={{ paddingTop: 8 }}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            paddingBottom: 1,
            paddingLeft: 5,
            paddingRight: 5,
            // height: 26,
            // fontSize: 20,
            color: 'white',
            borderBottomWidth: 1,
            borderBottomColor: this.state.isFocused || value ? 'white' : '#aaa'
          }}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoCapitalize={autoCapitalize}
          blurOnSubmit
        />
      </View>
    );
  }
}
