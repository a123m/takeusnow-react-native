import React from 'react';

import Proposal from '../screens/Proposal';

import { Styles } from '../common';

interface Props {
  navigation: any;
}

export default class ProposalScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Proposal',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
  });
  render() {
    const { navigation } = this.props;
    return (
      <Proposal
        proposalId={navigation.getParam('proposalId')}
        toProfile={(userId: number) =>
          navigation.navigate('Profile', { userId: userId })
        }
      />
    );
  }
}
