import React from 'react';
import Plans from '../screens/Plans';

// import { HeaderRight } from '../components';

import { Styles } from '../common';

export default class PlansScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Plans',
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
      <Plans
        toPayment={(userId: number, amount: number) => {
          navigation.navigate('Payment', { userId: userId, amount: amount });
        }}
      />
    );
  }
}
