import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import { AppButton, Spinner, FloatingLabelInput } from '../../components';
import APIService from '../../utils/APIService';
import { ValidateEmail, GlobalErr } from '../../utils/utils';

// import { Styles } from '../../common';

type Props = {
  onViewSignIn: Function;
  accountType: string;
  accountTypeSub: string;
  mobileNum: string;
};

type State = {
  fname: string;
  lname: string;
  username?: string;
  email: string;
  password: string;
  isLoading: Boolean;
  gender: string;
};

export default class SignUp extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      isLoading: false,
      gender: '',
    };
  }

  _onSignIn = () => {
    const { onViewSignIn } = this.props;
    onViewSignIn();
  };

  _onSignUp = async () => {
    const { accountType, accountTypeSub, mobileNum, onViewSignIn } = this.props;
    const { fname, lname, email, password, gender } = this.state;
    if (fname === '') {
      Alert.alert('Alert', 'Please Enter First Name');
      return;
    }
    if (lname === '') {
      Alert.alert('Alert', 'Please Enter Last Name');
      return;
    }
    if (!ValidateEmail(email)) {
      Alert.alert('Alert', 'Please Enter Valid E-Mail');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Alert', 'Password is too Short');
      return;
    }
    if (gender === '') {
      Alert.alert('Alert', 'Please Select Gender');
      return;
    }

    this.setState({
      isLoading: true,
    });
    const payload = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      gender: gender,
      accountType: accountType,
      accountTypeSub: accountTypeSub,
      mobileNum: mobileNum,
    };

    try {
      const response = await APIService.sendPostCall('/auth/signup', payload);

      this.setState({
        isLoading: false,
      });

      if (!response) {
        return;
      }

      Alert.alert('Congrats', response.message, [
        {
          text: 'Ok',
          onPress: () => onViewSignIn(),
        },
      ]);
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    const { fname, lname, email, password, isLoading } = this.state;
    let male = false;
    let female = false;
    const { gender } = this.state;
    if (gender.toUpperCase() === 'MALE') {
      male = true;
      female = false;
    } else if (gender.toUpperCase() === 'FEMALE') {
      male = false;
      female = true;
    }
    return (
      <ImageBackground
        source={require('../../../assets/background/loginBackground.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <StatusBar backgroundColor="rgb(60,	21,	98)" />
        <View
          style={{
            paddingTop: '20%',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Text style={styles.textStyle}>Create Your Account</Text>
          <ScrollView style={{ width: '90%' }}>
            <View style={styles.container}>
              <View style={{ marginTop: 25 }}>
                <FloatingLabelInput
                  label="First Name"
                  value={fname}
                  onChangeText={(fname: string) => {
                    this.setState({
                      fname,
                    });
                  }}
                  secureTextEntry={false}
                  keyboardType={'default'}
                />
              </View>
              <View style={{ marginTop: 25 }}>
                <FloatingLabelInput
                  label="Last Name"
                  value={lname}
                  onChangeText={(lname: string) => {
                    this.setState({
                      lname,
                    });
                  }}
                  secureTextEntry={false}
                  keyboardType={'default'}
                />
              </View>
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
                  autoCapitalize={'none'}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <CheckBox
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                textStyle={{ color: 'white' }}
                onPress={() => {
                  this.setState({
                    gender: 'male',
                  });
                }}
                title={'Male'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={male}
              />
              <CheckBox
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                textStyle={{ color: 'white' }}
                onPress={() => {
                  this.setState({
                    gender: 'female',
                  });
                }}
                title={'Female'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={female}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 5,
              }}
            >
              <Text style={styles.textStyle}>
                By signing up, you agree to our
              </Text>
              <TouchableOpacity onPress={this._onSignIn}>
                <Text style={{ color: 'rgb(153,	47,	172	)' }}>
                  {' '}
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 80,
                width: '100%',
                marginTop: 8,
              }}
            >
              <AppButton onPress={this._onSignUp} style={styles.buttonStyle}>
                SIGN UP
              </AppButton>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 8,
                }}
              >
                <Text style={styles.textStyle}>Already Have an account?</Text>
                <TouchableOpacity onPress={() => this._onSignIn()}>
                  <Text style={{ color: 'rgb(153,	47,	172	)' }}> Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
    height: 300,
    width: '100%',
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
