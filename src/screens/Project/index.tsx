import React from 'react';
import { ScrollView, Alert, View, StyleSheet, Text } from 'react-native';

import { FAB, MyProjectCard } from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

interface Props {
  toPostProject: any;
  toProjectStatus: any;
}

interface State {
  data: Array<Data>;
}

interface Data {
  projectId: number;
  status: string;
  title: string;
  postedOn: Date | string;
  proposals: number;
}

const data: Array<Data> = [
  {
    projectId: 23,
    status: 'IN PROGRESS',
    title: 'Marrige Photograpy',
    postedOn: new Date().toDateString(),
    proposals: 0,
  },
];

export default class Project extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // this.setDefaultView();
    this.setState({
      data: data,
    });
  }

  setDefaultView = async () => {
    const userId = AsyncStorage.getItem('userId');

    let params = {
      userId: userId,
    };

    try {
      const response = await APIService.sendPostCall('project/main', params);
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again');
      }

      this.setState({
        data: response.data,
      });
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    const { data } = this.state;
    const { toPostProject, toProjectStatus } = this.props;
    return (
      <>
        {data.length !== 0 ? (
          <ScrollView>
            {data.map((item) => {
              return (
                <MyProjectCard
                  key={item.projectId}
                  status={item.status}
                  title={item.title}
                  postedOn={item.postedOn}
                  onPress={() => toProjectStatus(item.projectId, item.title)}
                />
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.viewStyle}>
            <Text>No Projects!</Text>
          </View>
        )}
        <FAB onPress={toPostProject} />
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
