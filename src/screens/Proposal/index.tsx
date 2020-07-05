import React from 'react';
import { Text, Alert, View, TouchableOpacity, StatusBar } from 'react-native';

import { Avatar, AppButton } from '../../components';
import { GlobalErr } from '../../utils/utils';
import APIService from '../../utils/APIService';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  proposalId: number;
  toProfile: any;
}

interface State {
  name: string;
  proposalText: string;
  userId: number;
}

export default class Proposal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      proposalText: '',
      userId: 0,
    };
  }

  componentDidMount() {
    // this.setDefaultView();
  }

  setDefaultView = async () => {
    const { proposalId } = this.props;
    try {
      const response = await APIService.sendGetCall(
        '/browse/category/proposal/' + proposalId
      );
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again');
        return;
      }

      const resData = response.data;

      this.setState({
        name: resData.name,
        proposalText: resData.proposalText,
        userId: resData.userId,
      });
    } catch (err) {
      GlobalErr(err);
    }
  };

  acceptHandler = () => {};

  render() {
    const { toProfile } = this.props;
    const { userId } = this.state;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
        <TouchableOpacity onPress={() => toProfile(userId)}>
          <View style={{ padding: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                }}
              >
                <Avatar source={{ uri: '' }} size={'small'} />
              </View>
              <View style={{ flex: 0.85, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 0.8, overflow: 'hidden', height: 20 }}>
                    <Text style={{ fontSize: 16 }}>hulu</Text>
                  </View>
                  <View style={{ flex: 0.2 }}>
                    <Text style={{ fontSize: 16, textAlign: 'right' }}>
                      ₹2000
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Rating
                    readonly
                    type="star"
                    ratingCount={5}
                    startingValue={4}
                    imageSize={12}
                  /> */}
                  <Text style={{ color: 'silver' }}>
                    At {new Date().toDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Description</Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            repudiandae unde nostrum voluptate obcaecati fuga, dolorum
            doloremque exercitationem beatae, omnis perferendis ad soluta, vel
            deserunt delectus pariatur aut itaque iste. Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Cum, veniam ab dignissimos unde
            ipsa blanditiis excepturi quia quisquam. Nobis fugiat earum dolor,
            nisi vel eveniet corrupti ullam nihil quibusdam? Facere....
          </Text>
        </View>
        <AppButton style={{ marginTop: 20 }} onPress={this.acceptHandler}>
          Accept
        </AppButton>
      </ScrollView>
    );
  }
}
