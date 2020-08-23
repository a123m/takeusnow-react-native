import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

// eslint-disable-next-line no-unused-vars
import { ProjectEntity } from '../../modals';

import { FAB, MyProjectCard, Spinner } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

import { Styles } from '../../common';

interface Props {
  toPostProject: any;
  toProjectStatus(
    projectId: number,
    projectStatus: string,
    projectTitle: string,
    apId: number | null | undefined
  ): void;
}

interface State {
  myProjects: Array<ProjectEntity>;
  isLoading: boolean;
}

export default class Project extends React.PureComponent<Props, State> {
  userId: string | null | undefined;
  accountType: string | null | undefined;
  constructor(props: Props) {
    super(props);
    this.state = {
      myProjects: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    this.accountType = await AsyncStorage.getItem('accountType');
    this.userId = await AsyncStorage.getItem('userId');

    console.log('type', this.accountType);

    try {
      let response: ProjectEntity[] = await APIService.sendGetCall(
        'project/' + this.userId
      );
      if (!response) {
        response = [];
      }

      this.setState({
        myProjects: response,
        isLoading: false,
      });
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    const { myProjects, isLoading } = this.state;
    const { toPostProject, toProjectStatus } = this.props;
    if (myProjects.length === 0 && !isLoading) {
      return (
        <View style={styles.viewStyle}>
          <Text>No Projects!</Text>
          {this.accountType === 'hire' ? <FAB onPress={toPostProject} /> : null}
        </View>
      );
    }
    return (
      <>
        <NavigationEvents onDidFocus={this.setDefaultView} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={myProjects}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              {isLoading ? (
                <Spinner
                  mode="normal"
                  size="large"
                  color={Styles.PrimaryColor2}
                  style={{ margin: 40 }}
                />
              ) : null}
            </View>
          )}
          renderItem={({ item }) => (
            <MyProjectCard
              key={item.project_id}
              status={item.project_status}
              title={item.project_title}
              postedOn={item.created_on}
              onPress={() =>
                toProjectStatus(
                  item.project_id,
                  item.project_status,
                  item.project_title,
                  item.ap_id //accepted_proposal_id
                )
              }
            />
          )}
        />
        {this.accountType === 'hire' ? <FAB onPress={toPostProject} /> : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
