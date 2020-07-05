import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import APIService from '../../utils/APIService';

import { Styles } from '../../common';

interface Props {
  projectId: number;
  toDetail: any;
}

interface State {
  projectStatus: string;
  detailTick: boolean;
  proposalTick: boolean;
  completionTick: boolean;
  reviewTick: boolean;
}

export default class ProjectStatus extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      projectStatus: '',
      detailTick: false,
      proposalTick: false,
      completionTick: false,
      reviewTick: false,
    };
  }

  componentDidMount() {
    // this.setDefaultView()
  }

  setDefaultView = () => {
    let projectId = this.props.projectId;
    let params = {
      projectId: projectId,
    };
    const response = APIService.sendPostCall('/main', params);
    if (response.status !== 200) {
      Alert.alert('Alert', 'Something went wrong please try again');
    }
    switch (response.data.projectStatus) {
      case 'ACTIVE':
        this.setState({
          detailTick: true,
        });
        break;
      case 'IN PROGRESS':
        this.setState({
          detailTick: true,
          proposalTick: true,
        });
        break;
      case 'CLOSE REQUEST':
        this.setState({
          detailTick: true,
          proposalTick: true,
          completionTick: true,
        });
        break;
      case 'CLOSE':
        this.setState({
          detailTick: true,
          proposalTick: true,
          completionTick: true,
          reviewTick: true,
        });
        break;
    }
  };

  _renderProjectDetail = () => {
    const { detailTick } = this.state;
    return (
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={detailTick} checkedColor="green" />
          </View>
          <View style={styles.bigContainer}>
            <Text style={styles.headingTextStyle}>Project Details</Text>
            <Text>You can find Details about your project</Text>
          </View>
          <View style={styles.smallContainer}>
            <Icon name="arrow-right" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderProposal = () => {
    const { proposalTick } = this.state;
    return (
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={proposalTick} checkedColor="green" />
          </View>
          <View style={styles.bigContainer}>
            <Text style={styles.headingTextStyle}>Selected Proposal</Text>
            <Text>Check the proposal selected for this project</Text>
          </View>
          <View style={styles.smallContainer}>
            <Icon name="arrow-right" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderManagement = () => {
    const { completionTick } = this.state;
    return (
      <View style={[styles.container]}>
        <View style={styles.smallContainer}>
          <CheckBox checked={completionTick} checkedColor="green" />
        </View>
        <View style={styles.bigContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Project Completion
          </Text>
          <Text>
            You can tell the project owner that you have completed your work
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Alert', 'Make sure your project is completed');
          }}
          style={[
            styles.smallContainer,
            { backgroundColor: Styles.PrimaryColor2 },
          ]}
        >
          <Text style={{ fontWeight: 'bold', color: 'white' }}>DONE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderReview = () => {
    const { reviewTick } = this.state;
    return (
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={reviewTick} checkedColor="green" />
          </View>
          <View style={styles.bigContainer}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Leave Review
            </Text>
            <Text>Let everyone know how working with this employer was</Text>
          </View>
          <View style={styles.smallContainer}>
            <Icon name="arrow-right" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this._renderProjectDetail()}
        {this._renderProposal()}
        {this._renderManagement()}
        {this._renderReview()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  mainContainer: { flex: 1, backgroundColor: 'white' },
  smallContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigContainer: { flex: 0.8, justifyContent: 'center' },
  headingTextStyle: { fontSize: 18, fontWeight: 'bold' },
});
