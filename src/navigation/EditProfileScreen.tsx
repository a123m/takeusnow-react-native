import React from 'react';
import {} from 'react-native';

import MyProfile from '../screens/EditProfile';

import { Styles } from '../common';

export default class ProfileEditScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: '',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    headerStyle: Styles.AppHeaderStyle.headerStyle,
    headerTransparent: true,
  });

  render() {
    const { navigation } = this.props;
    return (
      <MyProfile
        toReview={(userId: string) =>
          navigation.navigate('Review', { userId: userId })
        }
        toSettings={() => navigation.navigate('Settings')}
      />
    );
  }
}
