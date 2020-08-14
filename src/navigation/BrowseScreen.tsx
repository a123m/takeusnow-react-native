import React from 'react';

import Browse from '../screens/Browse';
// import { HeaderRight } from '../components';

import { Styles } from '../common';

type Props = {
  navigation: any;
  _onTilePress: any;
};

export default class BrowseScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Browse Your Intrust',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
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
    return (
      <Browse
        _onTilePress={(categoryId: number, category: string) => {
          navigate('Category', { categoryId: categoryId, category: category });
        }}
      />
    );
  }
}
