import React from 'react';
import { WebView } from 'react-native-webview';

export default class Payment extends React.PureComponent<any> {
  render() {
    const { userId, amount, toMainMenu } = this.props;
    return (
      <WebView
        onNavigationStateChange={(result) => {
          if (result.title === 'Done') {
            toMainMenu();
          }
        }}
        source={{
          uri: '/payment/paytm',
          method: 'POST',
          body: 'userId=' + userId + '&TXN_AMOUNT=' + amount,
        }}
      />
    );
  }
}
