import React from 'react';

import Settings from '../screens/Settings';
// import { HeaderRight } from '../components';

import { Styles } from '../common';

type Props = {
  navigation: any;
  _onTilePress: any;
};

export default class SettingsScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Settings',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor
    // headerRight: () => (
    //   <HeaderRight
    //     name={''}
    //     onPress={() => {
    //       navigation.navigate('Chat');
    //     }}
    //   />
    // )
  });
  render() {
    const { navigate } = this.props.navigation;
    return <Settings onViewSignOut={() => navigate('Auth')} />;
  }
}
