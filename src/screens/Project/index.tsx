import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// eslint-disable-next-line no-unused-vars
import { ProjectEntity } from '../../modals';

import { FAB, MyProjectCard } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

interface Props {
  toPostProject: any;
  toProjectStatus(
    projectId: number,
    projectStatus: string,
    projectTitle: string,
    acceptedProposalId: number | null | undefined
  ): void;
}

interface State {
  myProjects: Array<ProjectEntity>;
}

const responseDummy: ProjectEntity[] = [
  {
    id: 23,
    status: 'IN PROGRESS',
    title: 'Marriage Photograph',
    posted_on: '2020-07-23T16:28:54.976Z',
    accepted_proposal_id: 0,
  },
  {
    id: 2,
    status: 'ACTIVE',
    title: 'Marriage Photograph',
    posted_on: '2020-07-23T16:28:54.976Z',
    accepted_proposal_id: null,
  },
  {
    id: 3,
    status: 'CLOSE',
    title: 'Marriage Photograph',
    posted_on: '2020-07-23T16:28:54.976Z',
    accepted_proposal_id: 3,
  },
];

export default class Project extends React.PureComponent<Props, State> {
  userId: Promise<string | null>;
  role: Promise<string | null> | string;
  constructor(props: any) {
    super(props);
    this.state = {
      myProjects: [],
    };
    this.role = AsyncStorage.getItem('role');
    this.userId = AsyncStorage.getItem('userId');
  }

  componentDidMount() {
    // this.setDefaultView();
    this.setState({
      myProjects: responseDummy,
    });
  }

  setDefaultView = async () => {
    let params = {
      userId: this.userId,
    };

    try {
      const response = await APIService.sendPostCall('project/main', params);

      this.setState({
        myProjects: response,
      });
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    const { myProjects } = this.state;
    const { toPostProject, toProjectStatus } = this.props;
    return (
      <>
        {myProjects.length !== 0 ? (
          <ScrollView>
            {myProjects.map((item) => {
              return (
                <MyProjectCard
                  key={item.id}
                  status={item.status}
                  title={item.title}
                  postedOn={item.posted_on}
                  onPress={() =>
                    toProjectStatus(
                      item.id,
                      item.status,
                      item.title,
                      item.accepted_proposal_id
                    )
                  }
                />
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.viewStyle}>
            <Text>No Projects!</Text>
          </View>
        )}
        {this.role === 'work' ? <FAB onPress={toPostProject} /> : null}
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
});
