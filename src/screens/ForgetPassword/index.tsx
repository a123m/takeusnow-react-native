import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';

import { AppButton, Spinner, FloatingLabelInput } from '../../components';
import { ValidateEmail, GlobalErr } from '../../utils/utils';

import APIService from '../../utils/APIService';

type Props = {
  onViewSignIn: any;
};

type State = {
  email: string;
  password: string;
  isLoading: Boolean;
};

export default class ForgetPassword extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  _onSubmitAsync = async () => {
    if (!ValidateEmail(this.state.email)) {
      Alert.alert('Alert', 'Please Enter Valid E-Mail');
      return;
    }

    this.setState({
      isLoading: true,
    });

    const params = { email: this.state.email };

    try {
      const response = await APIService.sendPostCall(
        '/auth/forgetpassword',
        params
      );
      this.setState({
        isLoading: false,
      });
      if (!response) {
        return;
      }
      Alert.alert('Alert', 'Please check your mail');
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    const { email, isLoading } = this.state;
    return (
      <ImageBackground
        source={require('../../../assets/background/loginBackground.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <StatusBar backgroundColor="rgb(60,	21,	98)" barStyle="light-content" />
        <View
          style={{
            flex: 1,
            marginTop: '20%',
            alignItems: 'center',
          }}
        >
          <Text style={styles.textStyle}>Enter your email.</Text>
          <View style={styles.container}>
            <View style={{ marginTop: 25 }}>
              <FloatingLabelInput
                label="Email"
                value={email}
                onChangeText={(email: string) => {
                  this.setState({
                    email,
                  });
                }}
                secureTextEntry={false}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />
            </View>
          </View>
          <View style={styles.container}>
            <AppButton onPress={this._onSubmitAsync} style={styles.buttonStyle}>
              SUBMIT
            </AppButton>
            <View style={{ alignItems: 'center', padding: 5 }}>
              <Text style={{ color: 'white' }}>
                You will receive a password reset link on your email.
              </Text>
            </View>
          </View>
        </View>
        {isLoading ? (
          <Spinner mode="overlay" size="large" color="white" />
        ) : null}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
  },
  container: {
    height: 120,
    width: '90%',
    marginTop: 5,
  },
  inputStyle: {
    color: 'white',
    position: 'relative',
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: 'rgb(153,	47,	172	)',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
