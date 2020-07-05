import React from 'react';

import { Styles } from '../common';
import { HeaderRight } from '../components';

import Chat from '../screens/Chat';

export default class ChatScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: navigation.getParam('fname'),
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor
    // headerRight: () => (
    //   <HeaderRight
    //     name={'message-circle'}
    //     onPress={() => {
    //       navigation.navigate('Messenger');
    //     }}
    //   />
    // )
  });
  render() {
    return <Chat roomId={this.props.navigation.getParam('roomId')} />;
  }
}
