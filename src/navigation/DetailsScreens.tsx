import React from 'react';
import Details from '../screens/Details';

import { Styles } from '../common';

interface Props {
  navigation: any;
}

export default class DetailsScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'Details',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    // headerRight: () => (
    //   <HeaderRight
    //     name={'options'}
    //     onPress={() => {
    //       navigation.getParam('showOptions');
    //     }}
    //   />
    // ),
  });
  render() {
    const { navigation } = this.props;
    return (
      <Details
        projectId={navigation.getParam('projectId')}
        toProposal={(proposalId: number) =>
          navigation.navigate('Proposal', { proposalId: proposalId })
        }
        onSendProposal={(title: String) =>
          navigation.navigate('SendProposal', { title: title })
        }
      />
    );
  }
}
