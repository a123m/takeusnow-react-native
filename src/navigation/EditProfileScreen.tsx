import React from 'react';
import {} from 'react-native';

import MyProfile from '../screens/EditProfile';
import { HeaderRight } from '../components';

import { Styles } from '../common';

export default class ProfileEditScreen extends React.PureComponent<any> {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: 'My Profile',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    headerRight: () => (
      <HeaderRight
        name={'settings'}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    ),
  });

  render() {
    const { navigation } = this.props;
    return (
      <MyProfile
        toReview={(userId: string) =>
          navigation.navigate('Review', { userId: userId })
        }
      />
    );
  }
}
