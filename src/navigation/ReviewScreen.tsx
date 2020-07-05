import React from 'react';
import Review from '../screens/Review';

// import { HeaderRight } from '../components';

import { Styles } from '../common';

export default class ReviewScreen extends React.PureComponent<any> {
  static navigationOptions = () => ({
    headerTitle: 'Reviews',
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
    return <Review userId={navigation.getParam('userId')} />;
  }
}
