import React from 'react';

import Project from '../screens/Project';

import { Styles } from '../common';

interface Props {
  navigation: any;
}

export default class ProjectScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    headerTitle: '',
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    headerStyle: Styles.AppHeaderStyle.headerStyle,
    headerTransparent: true,
  });

  render() {
    const { navigation } = this.props;
    return (
      <Project
        toProjectStatus={(
          projectId: number,
          projectStatus: string,
          projectTitle: string,
          apId: number
        ) =>
          navigation.navigate('ProjectStatus', {
            projectId: projectId,
            projectStatus: projectStatus,
            projectTitle: projectTitle,
            apId: apId,
          })
        }
        toPostProject={() => navigation.navigate('PostProject')}
      />
    );
  }
}
