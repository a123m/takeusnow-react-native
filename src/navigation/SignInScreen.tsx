/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import SignIn from '../screens/SingIn';
import { Styles } from '../common';

type Props = {
  navigation: any;
  onViewSignUp: Function;
  onViewSignIn: Function;
  onViewForgetPassword: Function;
};

export default class LoginScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Sign In',
    // headerLeft: Menu(),
    // headerRight: HeaderHomeRight(navigation),

    headerTintColor: 'white',
    // headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.SignInHeaderStyle,

    // use to fix the border bottom
    headerTransparent: true,
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <SignIn
        onViewSignIn={() => {
          navigate('App');
        }}
        onViewSignUp={() => {
          navigate('AccountType');
        }}
        onViewForgetPassword={() => {
          navigate('ForgetPassword');
        }}
      />
    );
  }
}
