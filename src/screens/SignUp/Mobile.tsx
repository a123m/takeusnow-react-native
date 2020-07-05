import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-input';

import { AppButton } from '../../components';

import { Styles } from '../../common';

export default class Mobile extends Component<any, any> {
  phone: any;
  constructor(props: any) {
    super(props);

    this.state = {
      valid: '',
      type: '',
      value: '',
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  async updateInfo() {
    await this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue(),
    });
    if (!this.state.valid) {
      Alert.alert('Alert', 'Please enter valid number!');
      return;
    }
    this.props.toSignUp(this.state.value);
  }

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: 'bold' }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{' '}
            <Text style={{ fontWeight: 'bold' }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/background/loginBackground.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.textStyle}>Enter Mobile Number</Text>
          <View
            style={{
              width: '90%',
              padding: 5,
              height: 100,
              justifyContent: 'center',
            }}
          >
            <PhoneInput
              initialCountry={'in'}
              ref={(ref: any) => {
                this.phone = ref;
              }}
              textStyle={{
                color: 'white',
              }}
              flagStyle={{ height: 25, width: 35 }}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'white',
              }}
              textProps={{
                placeholder: 'Telephone number',
                placeholderTextColor: 'grey',
              }}
              offset={20}
            />
          </View>

          <View style={{ width: '90%' }}>
            <AppButton
              //   disabled={accountTypeSub === '' ? true : false}
              onPress={() => {
                this.updateInfo();
              }}
              style={{ backgroundColor: Styles.PrimaryColor }}
            >
              Continue
            </AppButton>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

let styles = StyleSheet.create({
  mainContainer: {
    paddingTop: '20%',
    alignItems: 'center',
    // height: '100%',
    // width: '100%',
    flex: 1,
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
