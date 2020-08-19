import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { AppCard, AppInput, AppButton, Spinner } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

// eslint-disable-next-line no-unused-vars
import { UserEntity } from '../../modals';

import { Styles } from '../../common';

interface Props {
  projectId: number;
  title: String;
}

interface State {
  input: string;
  allowedBids: number;
  totalBids: number;
  budget: string;
  isLoading: boolean;
}

export default class SendProposal extends React.PureComponent<Props, State> {
  userId: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      budget: '',

      allowedBids: 0,
      totalBids: 0,

      isLoading: false,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    try {
      this.userId = await AsyncStorage.getItem('userId');
      const response: UserEntity = await APIService.sendGetCall(
        '/home/' + this.userId
      );
      let totalBids = 0;
      switch (response.plan_in_use.toUpperCase()) {
        case 'FREE':
          totalBids = 20;
          break;
        case 'BASIC':
          totalBids = 60;
          break;
        case 'PRO':
          totalBids = 100;
          break;
      }

      this.setState({
        allowedBids: response.allowed_bids,
        totalBids: totalBids,
      });
    } catch (err) {
      GlobalErr(err);
    }
  };

  sendProposalHandler = async () => {
    const { input, budget, allowedBids } = this.state;
    if (allowedBids === 0) {
      Alert.alert('Alert', 'You have no proposals to send.');
      return;
    }
    if (input.length < 100) {
      Alert.alert('Alert', 'Please write at least 100 words in you proposal.');
      return;
    }

    if (parseInt(budget) < 500) {
      Alert.alert('Alert', 'Minimum 500 budget is required.');
      return;
    }

    this.setState({
      isLoading: true,
    });

    const payload = {
      userId: this.userId,
      projectId: this.props.projectId,
      proposalDescription: input,
      proposedAmount: parseInt(budget),
    };
    try {
      const response = await APIService.sendPostCall(
        'browse/proposal/send',
        payload
      );
      this.setState({
        isLoading: false,
      });
      if (response) {
        Alert.alert('Alert', 'Proposal is send!');
        this.setState({
          allowedBids: this.state.allowedBids - 1,
        });
      }
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    return (
      <AppCard>
        <Text style={styles.textHeaderStyle}>Send Proposal To</Text>
        <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
        <View
          style={{
            borderColor: Styles.PrimaryColor3,
            borderWidth: 1,
            borderRadius: 5,
            height: 150,
            margin: 10,
          }}
        >
          <AppInput
            multiline={true}
            placeholder={
              'Provide information about how awesomely you will complete this project'
            }
            onChangeText={(input: string) => {
              this.setState({ input });
            }}
            value={this.state.input}
            style={{ height: 150 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}
        >
          <View>
            <Text style={styles.textHeaderStyle}>Set a budget.</Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  padding: 8,
                  height: 52,
                  borderBottomColor: Styles.PrimaryColor2,
                  borderBottomWidth: 1,
                  width: 70,
                }}
              >
                <AppInput
                  onChangeText={(budget: string) => {
                    this.setState({ budget });
                  }}
                  placeholder={'10000'}
                  value={this.state.budget}
                  style={{ height: 120 }}
                  keyboardType={'numeric'}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                }}
              >
                <Text style={{ color: Styles.PrimaryColor2, fontSize: 16 }}>
                  INR
                </Text>
              </View>
            </View>
            <Text style={{ color: 'silver' }}>Minimum 500.</Text>
          </View>
          <View>
            <Text style={styles.textHeaderStyle}>Proposals Left</Text>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  height: 50,
                  backgroundColor: 'silver',
                  margin: 10,
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {this.state.allowedBids} / {this.state.totalBids}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <AppButton onPress={this.sendProposalHandler}>Send Proposal</AppButton>
        {this.state.isLoading ? (
          <Spinner mode="overlay" size="large" color="white" />
        ) : null}
      </AppCard>
    );
  }
}

const styles = StyleSheet.create({
  textHeaderStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
