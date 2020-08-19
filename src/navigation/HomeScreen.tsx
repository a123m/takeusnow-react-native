import React from 'react';

import Home from '../screens/Home';

import { Styles } from '../common';

export default class HomeScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Home',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    headerStyle: Styles.AppHeaderStyle.headerStyle,
    // headerRight: () => (
    //   <HeaderRight
    //     name={'bubbles'}
    //     onPress={() => {
    //       navigation.navigate('Messenger');
    //     }}
    //   />
    // ),
  });

  render() {
    return (
      <Home
        onViewSignOut={() => this.props.navigation.navigate('Auth')}
        upgradePressHandler={() => this.props.navigation.navigate('Plans')}
        toCategory={(categoryId: number, insideText: string) =>
          this.props.navigation.navigate('Category', {
            categoryId: categoryId,
            insideText: insideText,
          })
        }
      />
    );
  }
}
