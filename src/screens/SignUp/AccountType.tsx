import React from 'react';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import { AppButton } from '../../components';

import { Styles } from '../../common';

interface Props {
  toMobile: any;
}

interface State {
  accountType: string;
  accountTypeSub: string;
}

export default class AccountType extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accountType: '',
      accountTypeSub: '',
    };
  }
  render() {
    const { toMobile } = this.props;
    const { accountType, accountTypeSub } = this.state;
    let individual = false;
    let compony = false;
    if (accountTypeSub.toUpperCase() === 'INDIVIDUAL') {
      individual = true;
      compony = false;
    } else if (accountTypeSub.toUpperCase() === 'COMPONY') {
      individual = false;
      compony = true;
    }
    return (
      <ImageBackground
        source={require('../../../assets/background/loginBackground.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <StatusBar backgroundColor="rgb(60,	21,	98)" />
        <View style={styles.mainContainer}>
          <Text style={styles.textStyle}>I want to</Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                { backgroundColor: accountType === 'work' ? 'green' : 'white' },
              ]}
              onPress={() => {
                this.setState({ accountType: 'work' });
              }}
            >
              <Text
                style={{ color: accountType === 'work' ? 'white' : 'black' }}
              >
                WORK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                { backgroundColor: accountType === 'hire' ? 'green' : 'white' },
              ]}
              onPress={() => {
                this.setState({ accountType: 'hire' });
              }}
            >
              <Text
                style={{ color: accountType === 'hire' ? 'white' : 'black' }}
              >
                HIRE
              </Text>
            </TouchableOpacity>
          </View>
          {accountType !== '' ? (
            <>
              <Text style={styles.textStyle}>I am</Text>
              <View style={styles.container}>
                <CheckBox
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  textStyle={{ color: 'white' }}
                  onPress={() => {
                    this.setState({
                      accountTypeSub: 'individual',
                    });
                  }}
                  title={'Individual'}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={individual}
                />
                <CheckBox
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  textStyle={{ color: 'white' }}
                  onPress={() => {
                    this.setState({
                      accountTypeSub: 'compony',
                    });
                  }}
                  title={'Compony'}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={compony}
                />
              </View>
            </>
          ) : null}
          {accountTypeSub !== '' ? (
            <View style={{ width: '90%' }}>
              <AppButton
                //   disabled={accountTypeSub === '' ? true : false}
                onPress={() => {
                  toMobile(accountType, accountTypeSub);
                }}
                style={{ backgroundColor: Styles.PrimaryColor }}
              >
                Continue
              </AppButton>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: '20%',
    alignItems: 'center',
    // height: '100%',
    // width: '100%',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '30%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
