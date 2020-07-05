/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import SignUp from '../screens/SignUp';
import AccountType from '../screens/SignUp/AccountType';
import Mobile from '../screens/SignUp/Mobile';

import { Styles } from '../common';

type Props = {
  navigation: any;
  onViewSignIn: any;
};

export class SignUpScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Sign Up',
    //   // headerLeft: Menu(),
    //   // headerRight: HeaderHomeRight(navigation),

    headerTintColor: 'white',
    //   // headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.SignInHeaderStyle,

    //   // use to fix the border bottom
    headerTransparent: true,
  });
  render() {
    const { navigate } = this.props.navigation;
    console.log(
      'my props',
      this.props.navigation.getParam('accountType'),
      this.props.navigation.getParam('accountTypeSub'),
      this.props.navigation.getParam('mobileNum')
    );
    return (
      <SignUp
        onViewSignIn={() => {
          navigate('SignIn');
        }}
        accountType={this.props.navigation.getParam('accountType')}
        accountTypeSub={this.props.navigation.getParam('accountTypeSub')}
        mobileNum={this.props.navigation.getParam('mobileNum')}
      />
    );
  }
}

export class AccountTypeScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Sign Up',
    //   // headerLeft: Menu(),
    //   // headerRight: HeaderHomeRight(navigation),

    headerTintColor: 'white',
    //   // headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.SignInHeaderStyle,

    //   // use to fix the border bottom
    headerTransparent: true,
  });
  render() {
    const { navigation } = this.props;
    return (
      <AccountType
        toMobile={(accountType: string, accountTypeSub: string) => {
          navigation.navigate('Mobile', {
            accountType: accountType,
            accountTypeSub: accountTypeSub,
          });
        }}
      />
    );
  }
}
export class MobileScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Sign Up',
    //   // headerLeft: Menu(),
    //   // headerRight: HeaderHomeRight(navigation),

    headerTintColor: 'white',
    //   // headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.SignInHeaderStyle,

    //   // use to fix the border bottom
    headerTransparent: true,
  });
  render() {
    const { navigation } = this.props;
    console.log(
      'my props',
      this.props.navigation.getParam('accountType'),
      this.props.navigation.getParam('accountTypeSub')
    );
    return (
      <Mobile
        toSignUp={(mobileNum: any) => {
          navigation.navigate('SignUp', {
            accountType: navigation.getParam('accountType'),
            accountTypeSub: navigation.getParam('accountTypeSub'),
            mobileNum: mobileNum,
          });
        }}
      />
    );
  }
}
