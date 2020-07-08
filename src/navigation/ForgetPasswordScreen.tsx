/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import ForgetPassword from '../screens/ForgetPassword';

import { Styles } from '../common';

type Props = {
  navigation: any;
  onViewSignIn: Function;
};

export default class ForgetPasswordScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Forget Password',
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
      <ForgetPassword
        onViewSignIn={() => {
          navigate('App');
        }}
      />
    );
  }
}
