import React from 'react';

import Profile from '../screens/Profile';

// import { Styles } from '../common';

export default class ProfileScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    // header: () => (
    //   <>
    //     <Text>Hello</Text>
    //   </>
    // ),
    headerShown: false,
    // headerTransparent: true,
    // headerTitle: 'Profile',
    // headerTitleStyle: [Styles.AppHeaderStyle.textStyle],
    // headerTintColor: Styles.AppHeaderStyle.headerTintColor,
  });
  render() {
    const { navigation } = this.props;
    return (
      <Profile
        toReview={(userId: number) => {
          navigation.navigate('Review', { userId: userId });
        }}
        toBack={() => navigation.goBack()}
      />
    );
  }
}
