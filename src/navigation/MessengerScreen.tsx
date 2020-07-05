import React from 'react';

import Messenger from '../screens/Messenger';
import { HeaderRight } from '../components';

import { Styles } from '../common';

export default class MessengerScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: 'Messages',
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
    return (
      <Messenger
        onViewPress={(roomId: number, fname: string) => {
          this.props.navigation.navigate('Chat', {
            roomId: roomId,
            fname: fname
          });
        }}
      />
    );
  }
}
