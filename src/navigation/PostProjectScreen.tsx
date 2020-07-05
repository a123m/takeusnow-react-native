import React from 'react';

import PostProject from '../screens/PostProject';
import PostProject2 from '../screens/PostProject/PostProject2';
import PostProject3 from '../screens/PostProject/PostProject3';
import PostProject4 from '../screens/PostProject/PostProject4';

// import { HeaderRight } from '../components';

import { Styles } from '../common';

interface Props {
  navigation: any;
}

export class PostProjectScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Post Project',
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
    const { navigation } = this.props;
    return (
      <PostProject toPostProject2={() => navigation.navigate('PostProject2')} />
    );
  }
}

export class PostProjectScreen2 extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Post Project',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor
  });
  render() {
    const { navigation } = this.props;
    return (
      <PostProject2
        toPostProject3={() => navigation.navigate('PostProject3')}
      />
    );
  }
}

export class PostProjectScreen3 extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Post Project',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor
  });
  render() {
    const { navigation } = this.props;
    return (
      <PostProject3
        toPostProject4={() => navigation.navigate('PostProject4')}
      />
    );
  }
}

export class PostProjectScreen4 extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Post Project',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor
  });
  render() {
    const { navigation } = this.props;
    return <PostProject4 toProject={() => navigation.navigate('Project')} />;
  }
}
