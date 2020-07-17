import React from 'react';
import { Text, Alert, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';
import { AppButton, AppCard, AppProposal, BoxText } from '../../components';

import { Styles } from '../../common';

interface Props {
  projectId: number;
  onSendProposal: Function;
  toProposal: any;
}

interface State {
  title: String;
  about: String;
  budget: Number;
  location: String;
  postedOn: string;
  reqOn: string;
  proposals: Array<object>;
  skills: Array<string>;
  showMore: Boolean;
}

export default class Details extends React.PureComponent<Props, State> {
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
      skills: [],

      showMore: false,
    };
  }

  componentDidMount() {
    // this.setDefaultView();
    this.setState({
      title: 'I need a professional photographer',
      about:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus quibusdam quaerat alias rerum dolore quam nulla eveniet. Temporibus id delectus, vel vitae minima dolores praesentium recusandae possimus nisi aperiam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolore impedit eligendi minima reprehenderit pariatur doloribus cumque dignissimos iste, natus accusamus deleniti eveniet aperiam. Itaque quae veritatis non odit suscipit.',
      budget: 80000,
      location: 'Agra',
      skills: ['photo Editing', 'professional photography'],
      postedOn: moment().toISOString(),
      reqOn: moment()
        .add(7, 'd')
        .toISOString(),
      proposals: [
        {
          proposalId: 1,
          sourceUri: '',
          fullName: 'Aman Chhabra',
          proposalOffer: 2000,
          proposalText:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit accusantium reiciendis commodi neque! Provident ipsum, hic tempore, vel similique ullam dignissimos quam laborum dolore error unde ut possimus facilis illo!',
          totalReviews: 10,
        },
        {
          proposalId: 2,
          sourceUri: '',
          fullName: 'Aman Chhabra',
          proposalOffer: 2000,
          proposalText:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit accusantium reiciendis commodi neque! Provident ipsum, hic tempore, vel similique ullam dignissimos quam laborum dolore error unde ut possimus facilis illo!',
          totalReviews: 10,
        },
      ],
    });
  }

  setDefaultView = async () => {
    const { projectId } = this.props;
    try {
      const response = await APIService.sendGetCall(
        'browse/category/' + projectId
      );
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong Please try again!!');
        return;
      }
      this.setState({});
    } catch (err) {
      GlobalErr(err);
    }
  };

  _renderDetailsView = () => {
    const { toProposal } = this.props;
    const {
      title,
      budget,
      location,
      skills,
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
            {skills.map((item, index) => {
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
                  key={item.proposalId.toString()}
                  fullName={item.fullName}
                  sourceUri={item.sourceUri}
                  proposalOffer={item.proposalOffer}
                  proposalText={item.proposalText}
                  totalReviews={item.totalReviews}
                  onPress={() => {
                    toProposal(item.proposalId);
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
      showMore = 'Show More';
    } else {
      showMore = 'Show Less';
    }

    return (
      <View style={{ margin: 10 }}>
        {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>About</Text> */}
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
                // fontSize: 'bold',
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
    return (
      <View style={{ flex: 1 }}>
        {this._renderDetailsView()}
        {this._renderStickyButton()}
      </View>
    );
  }
}
