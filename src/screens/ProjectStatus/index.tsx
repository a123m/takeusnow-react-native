import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckBox, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { AppModal, AppButton, AppInput } from '../../components';
import APIService from '../../utils/APIService';

import { Styles } from '../../common';

interface Props {
  toDetails(): void;
  toProposal(): void;
  projectStatus: string;
  projectId: number;
}

interface State {
  showReviewModal: boolean;
  reviewText: string;
  selectedRating: number;
}

export default class ProjectStatus extends React.PureComponent<Props, State> {
  projectStatus = '';
  detailTick = false;
  proposalTick = false;
  completionTick = false;
  reviewTick = false;
  constructor(props: Props) {
    super(props);

    this.state = {
      showReviewModal: false,

      selectedRating: 0,

      reviewText: '',
    };

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
      <TouchableOpacity
        onPress={() => {
          if (this.reviewTick || !this.completionTick) {
            return;
          }
          this.setState({ showReviewModal: true });
        }}
      >
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

  _renderReviewModal = () => {
    return (
      <AppModal
        onRequestClose={() => this.setState({ showReviewModal: false })}
        transparent={true}
        visible={this.state.showReviewModal}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <View
            style={{
              height: '50%',
              width: '70%',
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: 'silver',
            }}
          >
            <View style={{ flex: 0.2, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Give Rating!!
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
              }}
            >
              <Rating
                startingValue={0}
                onFinishRating={(selectedRating: number) => {
                  this.setState({ selectedRating });
                }}
                showRating
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <AppInput
                placeholder={'Add a written review.'}
                value={this.state.reviewText}
                onChangeText={(reviewText: string) =>
                  this.setState({ reviewText })
                }
              />
            </View>
            <AppButton
              style={{ flex: 1 }}
              onPress={() => {
                const payload = {
                  reviewText: this.state.reviewText,
                  selectedRating: this.state.selectedRating,
                };
                this.reviewTick = true;
                APIService.sendPostCall(
                  `/project/${this.props.projectId}/review`,
                  payload
                );
                this.setState({ showReviewModal: false });
              }}
            >
              SUBMIT
            </AppButton>
          </View>
        </View>
      </AppModal>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this._renderReviewModal()}
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
