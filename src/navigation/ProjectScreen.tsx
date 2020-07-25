import React from 'react';

import Project from '../screens/Project';

import { Styles } from '../common';

interface Props {
  navigation: any;
}

export default class ProjectScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: 'My Projects',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
  });

  render() {
    const { navigation } = this.props;
    return (
      <Project
        toProjectStatus={(
          projectId: number,
          projectStatus: string,
          projectTitle: string,
          acceptedProposalId: number
        ) =>
          navigation.navigate('ProjectStatus', {
            projectId: projectId,
            projectStatus: projectStatus,
            projectTitle: projectTitle,
            acceptedProposalId: acceptedProposalId,
          })
        }
        toPostProject={() => navigation.navigate('PostProject')}
      />
    );
  }
}
