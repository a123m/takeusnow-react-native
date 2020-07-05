import React from 'react';
import Payment from '../screens/Payment';
import { NavigationActions } from 'react-navigation';

// import { HeaderRight } from '../components';

import { Styles } from '../common';

export default class PlansScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Payment',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,

    // for admin

    // headerRight: () => (
    //   <HeaderRight
    //     name={'pencil'}
    //     onPress={() => {
    //       navigation.navigate('EditProfile');
    //     }}
    //   />
    // )
  });
  render() {
    const { navigation } = this.props;
    return (
      <Payment
        userId={navigation.getParam('userId')}
        amount={navigation.getParam('amount')}
        toMainMenu={() =>
          navigation.reset(
            [NavigationActions.navigate({ routeName: 'Home' })],
            0
          )
        }
      />
    );
  }
}
