import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

// import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';
import {
  AppButton,
  AppCard,
  AppProposal,
  BoxText,
  Loader,
} from '../../components';

import { Styles } from '../../common';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  projectId: number;
  onSendProposal: Function;
  toProposal(id: number | string, showAccept: boolean): void;
}

interface State {
  title: String;
  about: String;
  budget: Number;
  location: String;
  postedOn: string;
  reqOn: string;
  proposals: ProposalType[];
  req_skills: Array<string>;
  showMore: boolean;
  isLoading: boolean;
}

const dummyResponse: ProjectResponseType = {
  title: 'I need a professional photographer',
  about:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus quibusdam quaerat alias rerum dolore quam nulla eveniet. Temporibus id delectus, vel vitae minima dolores praesentium recusandae possimus nisi aperiam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolore impedit eligendi minima reprehenderit pariatur doloribus cumque dignissimos iste, natus accusamus deleniti eveniet aperiam. Itaque quae veritatis non odit suscipit.',
  budget: 80000,
  location: 'Agra',
  req_skills: ['Still Photography'],
  postedOn: moment().toISOString(),
  reqOn: moment()
    .add(7, 'd')
    .toISOString(),
  userId: 1,
  status: 'IN',
  proposals: [
    {
      id: 1,
      sourceUri: '',
      fullName: 'Aman Chhabra',
      proposalOffer: 2000,
      proposalText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit accusantium reiciendis commodi neque! Provident ipsum, hic tempore, vel similique ullam dignissimos quam laborum dolore error unde ut possimus facilis illo!',
      totalReviews: 10,
      averageReviews: 3.5,
    },
    {
      id: 2,
      sourceUri: '',
      fullName: 'Aman Chhabra',
      proposalOffer: 2000,
      proposalText:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit accusantium reiciendis commodi neque! Provident ipsum, hic tempore, vel similique ullam dignissimos quam laborum dolore error unde ut possimus facilis illo!',
      totalReviews: 10,
      averageReviews: 5,
    },
  ],
};

type ProjectResponseType = {
  title: string;
  about: string;
  budget: number;
  location: string;
  req_skills: string[];
  postedOn: string;
  reqOn: string;
  proposals: ProposalType[];
  userId: number;
  status: string;
};

type ProposalType = {
  id: number;
  sourceUri: string;
  fullName: string;
  proposalOffer: number;
  proposalText: string;
  totalReviews: number;
  averageReviews: number;
};

export default class Details extends React.PureComponent<Props, State> {
  userId: string | Promise<string | null> | undefined;
  projectUserId: string | undefined | number;
  showAcceptOnProposal: boolean = false;
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      about: '',
      location: '',
      postedOn: '',
      reqOn: '',

      budget: 0,

      proposals: [],
      req_skills: [],

      showMore: false,
      isLoading: true,
    };
    this.userId = AsyncStorage.getItem('userId');
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    // const { projectId } = this.props;
    try {
      // const response = await APIService.sendGetCall(
      //   'browse/category/' + projectId
      // );
      const response = dummyResponse;
      this.projectUserId = response.userId;
      if (response.status === 'ACTIVE') {
        this.showAcceptOnProposal = true;
      } else {
        this.showAcceptOnProposal = false;
      }

      setTimeout(() => {
        this.setState({
          title: response.title,
          about: response.about,
          budget: response.budget,
          location: response.location,
          req_skills: response.req_skills,
          postedOn: response.postedOn,
          reqOn: response.reqOn,
          proposals: response.proposals,
          isLoading: false,
        });
      }, 10000);
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
        {proposals.length !== 0 ? (
          <AppCard>
            <View style={{ margin: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Proposals
              </Text>
            </View>
            {proposals.map((item) => {
              return (
                <AppProposal
                  key={item.id.toString()}
                  fullName={item.fullName}
                  sourceUri={item.sourceUri}
                  proposalOffer={item.proposalOffer}
                  proposalText={item.proposalText}
                  totalReviews={item.totalReviews}
                  averageReviews={item.averageReviews}
                  onPress={(): void => {
                    // if (this.userId !== this.projectUserId) {
                    //   return;
                    // }
                    toProposal(item.id, this.showAcceptOnProposal);
                  }}
                />
              );
            })}
          </AppCard>
        ) : null}
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
    const { onSendProposal } = this.props;
    const { title } = this.state;
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
            <Text> 20</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <AppButton onPress={() => onSendProposal(title)}>
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
    const { isLoading } = this.state;
    return (
      <>
        {this._renderDetailsView()}
        {this._renderStickyButton()}
        <Loader visible={isLoading} />
      </>
    );
  }
}
