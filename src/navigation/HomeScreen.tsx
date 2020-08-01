import React from 'react';

import Home from '../screens/Home';

import { Styles } from '../common';

export default class HomeScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Home',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    // headerRight: () => (
    //   <HeaderRight
    //     name={'bubbles'}
    //     onPress={() => {
    //       navigation.navigate('Messenger');
    //     }}
    //   />
    // )
  });

  render() {
    return (
      <Home
        onViewSignOut={() => this.props.navigation.navigate('Auth')}
        upgradePressHandler={() => this.props.navigation.navigate('Plans')}
        toCategory={() => this.props.navigation.navigate('Category')}
      />
    );
  }
}
