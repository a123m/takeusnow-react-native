import React from 'react';

import Profile from '../screens/Profile';

export default class ProfileScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerShown: false,
  });
  render() {
    const { navigation } = this.props;
    return (
      <Profile
        userId={navigation.getParam('userId')}
        toReview={(userId: number) => {
          navigation.navigate('Review', { userId: userId });
        }}
        toBack={() => navigation.goBack()}
      />
    );
  }
}
