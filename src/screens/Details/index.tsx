import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import APIService from '../../utils/APIService';
import { GlobalErr, completeImageUrl } from '../../utils/utils';
import {
  AppButton,
  AppCard,
  AppProposal,
  BoxText,
  Loader,
} from '../../components';

// eslint-disable-next-line no-unused-vars
import { ProjectEntity, ProposalEntity, UserEntity } from '../../modals';

import { Styles } from '../../common';

interface Props {
  projectId: number;
  onSendProposal(projectId: number, title: string): void;
  toProposal(id: number | string, showAccept: boolean): void;
}

interface State {
  title: string;
  about: String;
  budget: Number;
  location: String;
  postedOn: string;
  reqOn: string;
  proposals: Array<UserEntity & ProposalEntity>;
  req_skills: Array<string>;
  showMore: boolean;
  isLoading: boolean;
  projectStatus: string;
}

type Combine = UserEntity & ProposalEntity;

type Proposal = {
  proposals: Combine[];
};

type ResponseType = ProjectEntity & Proposal;

export default class Details extends React.PureComponent<Props, State> {
  userId: string | number | null | undefined;
  projectOwnerId: string | undefined | number;
  showAcceptOnProposal: boolean = false;
  accountType: string | null | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      about: '',
      location: '',
      postedOn: '',
      reqOn: '',
      projectStatus: '',

      budget: 0,

      proposals: [],
      req_skills: [],

      showMore: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    const { projectId } = this.props;
    this.userId = await AsyncStorage.getItem('userId');
    this.accountType = await AsyncStorage.getItem('accountType');
    try {
      const response: ResponseType = await APIService.sendGetCall(
        'browse/project/' + projectId
      );

      this.projectOwnerId = response.project_owner_id;
      if (response.project_status.toUpperCase() === 'ACTIVE') {
        this.showAcceptOnProposal = true;
      } else {
        this.showAcceptOnProposal = false;
      }

      this.setState({
        title: response.project_title,
        about: response.project_description,
        budget: response.budget,
        location: response.city,
        req_skills: JSON.parse(response.req_skills),
        postedOn: response.created_on,
        reqOn: response.req_on,
        proposals: response.proposals,
        projectStatus: response.project_status,
        isLoading: false,
      });
    } catch (err) {
      GlobalErr(err);
      this.setState({
        isLoading: false,
      })!;
    }
  };

  _renderDetailsView = () => {
    const { toProposal } = this.props;
    const {
      title,
      budget,
      location,
      req_skills,
      postedOn,
      proposals,
      reqOn,
    } = this.state;
    return (
      <ScrollView style={{ flex: 0.9 }} showsVerticalScrollIndicator={false}>
        <AppCard>
          <View style={{ margin: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
          </View>
          {this._renderAboutSection()}
        </AppCard>
        <AppCard
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Budget (INR)
              </Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 18 }}>₹{budget}</Text>
            </View>
          </View>
          <View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Location</Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 18 }}>{location}</Text>
            </View>
          </View>
        </AppCard>
        <AppCard>
          <View style={{ margin: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Skills Required
            </Text>
          </View>
          <View style={{ margin: 5, flexDirection: 'row' }}>
            {req_skills.map((item, index) => {
              return (
                <BoxText
                  color={Styles.PrimaryColor2}
                  size={12}
                  key={index}
                  text={item}
                />
              );
            })}
          </View>
        </AppCard>
        <AppCard
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Posted On
              </Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 18 }}>{moment(postedOn).fromNow()}</Text>
            </View>
          </View>
          <View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Req On</Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 18 }}>
                {moment(reqOn).format('Do MMMM YYYY')}
              </Text>
            </View>
          </View>
        </AppCard>

        <AppCard>
          <View style={{ margin: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Proposals</Text>
          </View>
          {proposals.length !== 0 ? (
            <View>
              {proposals.map((item) => {
                return (
                  <AppProposal
                    key={item.proposal_id.toString()}
                    fname={item.fname}
                    lname={item.lname}
                    sourceUri={completeImageUrl(item.user_image)}
                    proposalOffer={item.proposed_amount}
                    proposalText={item.proposal_description}
                    totalReviews={item.total_reviews}
                    averageReviews={item.average_reviews}
                    onPress={(): void => {
                      if (this.userId === this.projectOwnerId) {
                        toProposal(item.user_id, this.showAcceptOnProposal);
                      }
                    }}
                  />
                );
              })}
            </View>
          ) : (
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>No Proposals</Text>
            </View>
          )}
        </AppCard>
      </ScrollView>
    );
  };

  _renderAboutSection = () => {
    let str = this.state.about;
    let showMore = '';
    if (str.length > 250 && !this.state.showMore) {
      str = this.state.about.slice(0, 250);
      showMore = 'show more';
    } else {
      showMore = 'show less';
    }

    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 18 }}>{str}</Text>
        {this.state.about.length > 250 ? (
          <TouchableOpacity
            onPress={() => {
              str = this.state.about;
              this.setState({
                showMore: !this.state.showMore,
              });
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: Styles.PrimaryColor,
                textAlign: 'right',
              }}
            >
              {showMore}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  _renderStickyButton = () => {
    const { onSendProposal, projectId } = this.props;
    const { title, proposals } = this.state;
    return (
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            margin: 10,
          }}
        >
          <Text>Proposals Send</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'user'} />
            <Text> {proposals.length}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <AppButton onPress={() => onSendProposal(projectId, title)}>
            Send Proposal
          </AppButton>
        </View>
      </View>
    );
  };

  /**
   * Main Render
   */
  render() {
    const { isLoading, projectStatus } = this.state;
    return (
      <>
        {this._renderDetailsView()}
        {this.accountType === 'work' && projectStatus.toUpperCase() === 'ACTIVE'
          ? this._renderStickyButton()
          : null}
        <Loader visible={isLoading} />
      </>
    );
  }
}
