import React from 'react';
import {
  Text,
  Alert,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { ProposalEntity, UserEntity, Notification } from '../../models';

import { Avatar, AppButton, Spinner } from '../../components';
import { GlobalErr, completeImageUrl } from '../../utils/utils';
import APIService from '../../utils/APIService';
import { NavigationEvents } from 'react-navigation';

interface Props {
  proposalId: number;
  toProfile: any;
  showAccept: boolean;
}

interface State {
  name: string | undefined;
  proposalText: string;
  userId: number;
  userImage: string;
  createdAt: string;
  proposedAmount: number;
  isLoading: boolean;
}

type ResponseType = ProposalEntity & UserEntity;

export default class Proposal extends React.PureComponent<Props, State> {
  showAccept = true;
  constructor(props: Props) {
    super(props);
    this.state = {
      userId: 0,
      proposedAmount: 0,

      name: '',
      proposalText: '',
      userImage: '',
      createdAt: '',

      isLoading: true,
    };
    this.showAccept = this.props.showAccept;
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    const { proposalId } = this.props;
    try {
      const response: ResponseType = await APIService.sendGetCall(
        '/browse/proposal/' + proposalId
      );

      const fullName = response.fname.concat(' ', response.lname);

      this.setState({
        name: fullName,
        proposalText: response.proposal_description,
        userId: response.user_id,
        userImage: completeImageUrl(response.user_image),
        createdAt: response.created_on,
        proposedAmount: response.proposed_amount,
        isLoading: false,
      });
    } catch (err) {
      GlobalErr(err);
    }
  };

  acceptHandler = () => {
    Alert.alert(
      'Alert',
      `Are you sure! This will accept ${this.state.name} proposal.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const notification: Notification = {
              userId: this.state.userId,
              title: `Congratulation!`,
              body: `Your Proposal is accepted`,
            };
            APIService.sendGetCall(
              `/browse/proposal/accept/` + this.props.proposalId
            );
            APIService.sendPostCall('/notifications/send', notification);
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { toProfile } = this.props;
    const {
      userId,
      userImage,
      name,
      createdAt,
      proposalText,
      proposedAmount,
    } = this.state;
    return (
      <>
        <NavigationEvents
          onWillFocus={() => {
            StatusBar.setBarStyle('dark-content');
          }}
        />
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <ScrollView style={{ backgroundColor: 'white', padding: 10 }}>
            <TouchableOpacity onPress={() => toProfile(userId)}>
              <View style={{ padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 0.15,
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar source={userImage} size={'small'} />
                  </View>
                  <View style={{ flex: 0.85, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{ flex: 0.8, overflow: 'hidden', height: 20 }}
                      >
                        <Text style={{ fontSize: 16 }}>{name}</Text>
                      </View>
                      <View style={{ flex: 0.2 }}>
                        <Text style={{ fontSize: 16, textAlign: 'right' }}>
                          ₹{proposedAmount}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={{ color: 'silver' }}>
                        At {moment(createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Description
              </Text>
              <Text style={{ fontSize: 16, marginTop: 5 }}>{proposalText}</Text>
            </View>
          </ScrollView>
          {this.showAccept ? (
            <AppButton onPress={this.acceptHandler}>Accept</AppButton>
          ) : null}
          {this.state.isLoading ? (
            <Spinner mode="overlay" size="large" color="white" />
          ) : null}
        </View>
      </>
    );
  }
}
