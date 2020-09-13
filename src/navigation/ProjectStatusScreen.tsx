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
        projectId={navigation.getParam('projectId')}
        projectStatus={navigation.getParam('projectStatus')}
        toDetails={() =>
          navigation.navigate('Details', {
            projectId: navigation.getParam('projectId'),
          })
        }
        toProposal={(): void => {
          const apId = navigation.getParam('apId');
          if (!apId) {
            Alert.alert(
              'Alert',
              'No proposal is accepted. Please accept proposal for your project.'
            );
            return;
          }
          navigation.navigate('Proposal', {
            proposalId: apId,
            showAccept: false,
          });
        }}
      />
    );
  }
}
