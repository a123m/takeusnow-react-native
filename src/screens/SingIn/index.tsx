import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from 'react-native-splash-screen';

import { AppButton, Spinner, FloatingLabelInput } from '../../components';
import { ValidateEmail, GlobalErr } from '../../utils/utils';

import APIService from '../../utils/APIService';

type Props = {
  onViewSignUp: Function;
  onViewSignIn: Function;
  onViewForgetPassword: any;
};

type State = {
  email: string;
  password: string;
  isLoading: Boolean;
};

export default class SignIn extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    Splash.hide();
  }
  _onSignUp = () => {
    const { onViewSignUp } = this.props;
    onViewSignUp();
  };

  _onSignInAsync = async () => {
    if (!ValidateEmail(this.state.email)) {
      Alert.alert('Alert', 'Please Enter Valid E-Mail');
      return;
    }
    if (this.state.password.length < 6) {
      Alert.alert('Alert', 'Password is too Short');
      return;
    }

    this.setState({
      isLoading: true,
    });

    let params = { email: this.state.email, password: this.state.password };

    try {
      const response = await APIService.sendPostCall('/auth/login', params);
      this.setState({
        isLoading: false,
      });
      if (!response) {
        return;
      }
      /**
       * storing important information which will be used in other parts of the application
       */
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userId', JSON.stringify(response.userId));
      await AsyncStorage.setItem('accountType', response.accountType);
      this.props.onViewSignIn();
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      GlobalErr(err);
    }
  };

  render() {
    const { onViewForgetPassword } = this.props;
    const { email, password, isLoading } = this.state;
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
          <Text style={styles.textStyle}>Welcome to SnapLancing</Text>
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
            <View style={{ marginTop: 25 }}>
              <FloatingLabelInput
                label="Password"
                value={password}
                onChangeText={(password: string) => {
                  this.setState({
                    password,
                  });
                }}
                secureTextEntry={true}
                keyboardType={'default'}
              />
            </View>
            <View style={{ alignItems: 'flex-end', padding: 5 }}>
              <TouchableOpacity onPress={onViewForgetPassword}>
                <Text style={{ color: 'white' }}>Forget Your Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <AppButton onPress={this._onSignInAsync} style={styles.buttonStyle}>
              SIGN IN
            </AppButton>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 5,
              }}
            >
              <Text style={styles.textStyle}>Do not have an Account?</Text>
              <TouchableOpacity onPress={() => this._onSignUp()}>
                <Text style={{ color: 'rgb(153,	47,	172	)' }}> Sign Up</Text>
              </TouchableOpacity>
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
    height: 180,
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
