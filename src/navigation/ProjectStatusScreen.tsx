import React from 'react';

import ProjectStatus from '../screens/ProjectStatus';

import { Styles } from '../common';
import { Alert } from 'react-native';

interface Props {
  toDetails(): void;
  toProfile(): void;
  navigation: any;
}

export default class ProjectStatusScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: navigation.getParam('projectTitle'),
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
  });
  render() {
    const { navigation } = this.props;
    return (
      <ProjectStatus
        projectStatus={navigation.getParam('projectStatus')}
        toDetails={() =>
          navigation.navigate('Details', {
            projectId: navigation.getParam('projectId'),
          })
        }
        toProposal={(): void => {
          const acceptedProposalId = navigation.getParam('acceptedProposalId');
          if (acceptedProposalId == null) {
            Alert.alert(
              'Alert',
              'No proposal is accepted. Please accept proposal for your project.'
            );
            return;
          }
          navigation.navigate('Proposal', {
            proposalId: navigation.getParam('proposalId'),
            showAccept: false,
          });
        }}
      />
    );
  }
}
