import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Styles } from '../../common';

interface Props {
  toDetails(): void;
  toProposal(): void;
  projectStatus: string;
}

export default class ProjectStatus extends React.PureComponent<Props> {
  projectStatus = '';
  detailTick = false;
  proposalTick = false;
  completionTick = false;
  reviewTick = false;
  constructor(props: Props) {
    super(props);

    switch (this.props.projectStatus) {
      case 'ACTIVE':
        this.detailTick = true;
        break;
      case 'IN PROGRESS':
        this.detailTick = true;
        this.proposalTick = true;
        break;
      case 'CLOSE REQUEST':
        this.detailTick = true;
        this.proposalTick = true;
        this.completionTick = true;
        break;
      case 'CLOSE':
        this.detailTick = true;
        this.proposalTick = true;
        this.completionTick = true;
        this.reviewTick = true;
        break;
      default:
        console.log(`Sorry, we are out of.`);
    }
  }

  _renderProjectDetail = () => {
    return (
      <TouchableOpacity onPress={this.props.toDetails}>
        <View style={[styles.container]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={this.detailTick} checkedColor="green" />
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
    return (
      <TouchableOpacity onPress={this.props.toProposal}>
        <View style={[styles.container]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={this.proposalTick} checkedColor="green" />
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
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'silver' }}>
        <View style={[styles.container, { borderBottomWidth: 0 }]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={this.completionTick} checkedColor="green" />
          </View>
          <View style={styles.bigContainer}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Project Management
            </Text>
            <Text>Manage your project status.</Text>
          </View>
        </View>
        {this.proposalTick ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // alignItems: 'center',
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Alert',
                  'Are you sure you want to cancel the project!'
                );
              }}
              style={{
                height: 35,
                width: '20%',
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Alert', 'Make sure your project is completed');
              }}
              style={{
                height: 35,
                width: '20%',
                backgroundColor: Styles.PrimaryColor2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>DONE</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  _renderReview = () => {
    return (
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={styles.smallContainer}>
            <CheckBox checked={this.reviewTick} checkedColor="green" />
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
