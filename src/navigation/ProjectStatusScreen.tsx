import React from 'react';

import ProjectStatus from '../screens/ProjectStatus';

import { Styles } from '../common';

interface Props {
  toDetails: any;
  toProfile: any;
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
        toDetails={() => navigation.navigate('Detail')}
        toProfile={() => {
          navigation.navigate('Profile');
        }}
      />
    );
  }
}
