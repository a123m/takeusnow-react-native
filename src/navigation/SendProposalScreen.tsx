import React from 'react';

import SendProposal from '../screens/SendProposal';

import { Styles } from '../common';

interface Props {
  navigation: any;
}

export default class SendProposalScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Send Proposal',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
  });
  render() {
    return (
      <SendProposal
        projectId={this.props.navigation.getParam('projectId')}
        title={this.props.navigation.getParam('title')}
      />
    );
  }
}
