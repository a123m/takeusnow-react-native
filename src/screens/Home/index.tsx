import React from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Splash from 'react-native-splash-screen';
import firebase from 'react-native-firebase';

import { ExploreCard, AppCard } from '../../components';
import Socket from '../../utils/Socket';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

// eslint-disable-next-line no-unused-vars
import { UserEntity } from '../../models';

import { Styles } from '../../common';

const data = [
  {
    name: 'Photography',
    categoryId: 1,
    image: require('../../../assets/images/photography.jpg'),
  },
  {
    name: 'Videography',
    categoryId: 2,
    image: require('../../../assets/images/videography.jpg'),
  },
  {
    name: 'Wedding Planners',
    categoryId: 3,
    image: require('../../../assets/images/planner.jpg'),
  },
  {
    name: 'Makeup artist',
    categoryId: 4,
    image: require('../../../assets/images/makeup.jpg'),
  },
  {
    name: 'Choreography',
    categoryId: 6,
    image: require('../../../assets/images/art.jpg'),
  },
  {
    name: 'Astrology',
    categoryId: 7,
    image: require('../../../assets/images/astrology.jpg'),
  },
];

export default class Home extends React.PureComponent<any, any> {
  userId: string | null | undefined;
  accountType: any;
  state = {
    firstName: '',
    planInUse: '',

    profileCompletePercentage: 0,
    allowedBids: 0,
  };

  componentDidMount() {
    this.createChannel();
    this.notificationListener();
    this.setDefaultView();
    Socket.init();
  }

  // * Channel for notifications
  createChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'channelName',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Description');
    firebase.notifications().android.createChannel(channel);
  };

  // * Foreground Notifications
  notificationListener = () => {
    firebase.notifications().onNotification((notification) => {
      if (Platform.OS === 'android') {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId')
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch((err) => GlobalErr(err));
      }
    });
  };

  setDefaultView = async () => {
    try {
      this.userId = await AsyncStorage.getItem('userId');
      this.accountType = await AsyncStorage.getItem('accountType');

      const firebaseToken = await firebase.messaging().getToken();

      const payload = {
        userId: this.userId,
        firebaseToken: firebaseToken,
      };

      const response = await APIService.sendPostCall('/home', payload);

      firebase.messaging().subscribeToTopic(this.accountType);

      if (!response) {
        return;
      }

      let profileCompletePercentage = 0;
      for (let i in response) {
        if (response[i] == null) {
          profileCompletePercentage++;
        }
      }

      profileCompletePercentage = profileCompletePercentage / 15;
      profileCompletePercentage =
        1 - Math.round(profileCompletePercentage * 10) / 10;

      this.setState({
        firstName: response.fname,
        profileCompletePercentage: profileCompletePercentage,
        allowedBids: response.allowed_bids,
        planInUse: response.plan_in_use,
      });
      Splash.hide();
    } catch (err) {
      GlobalErr(err);
    }
  };

  _renderWelcomeBanner = () => {
    const { upgradePressHandler } = this.props;
    return (
      <View
        style={[
          styles.cardContainer,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 0.1,
          },
        ]}
      >
        <View>
          <Text>Welcome</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {this.state.firstName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {this.accountType === 'work' ? (
            <>
              <Icon name={'hourglass'} size={38} />
              <View>
                <Text style={{ fontSize: 10 }}>
                  {this.state.planInUse.toUpperCase()} Plan
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {this.state.allowedBids} Bids Left
                </Text>
                <TouchableOpacity onPress={upgradePressHandler}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: Styles.PrimaryColor2,
                    }}
                  >
                    Upgrade Now
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
    );
  };

  _renderGradientSection = () => {
    return (
      <>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            Styles.PrimaryColor2,
            Styles.PrimaryColor,
            Styles.PrimaryColor3,
          ]}
          style={{
            margin: 10,
            borderRadius: 10,
            height: 150,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>hello</Text>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['rgb(58,	186,	196	)', 'rgb(50,	108,	153	)', 'rgb(48,	28,	106	)']}
          style={{
            margin: 10,
            borderRadius: 10,
            height: 150,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>hello</Text>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Styles.PrimaryColor2, 'rgb(58,	186,	196	)', 'rgb(48,	28,	106	)']}
          style={{
            margin: 10,
            borderRadius: 10,
            height: 150,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>hello</Text>
        </LinearGradient>
      </>
    );
  };

  profileCompletedPercentage = () => {
    const profileCompletePercentage =
      this.state.profileCompletePercentage * 100;
    return profileCompletePercentage;
  };

  render() {
    return (
      <>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent
          />
          <View style={{ flex: 0.5 }}>
            <Image
              style={{ height: '100%', width: '100%' }}
              source={require('../../../assets/images/work.jpg')}
            />
          </View>
          {this._renderWelcomeBanner()}
          <AppCard style={{ flex: 0.1 }}>
            <Text style={styles.headingStyle}>Profile Completed</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Progress.Bar
                style={{ flex: 0.9 }}
                width={null}
                progress={this.state.profileCompletePercentage}
                color={Styles.PrimaryColor}
              />
              <View
                style={{
                  flex: 0.12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text>{this.profileCompletedPercentage()}%</Text>
              </View>
            </View>
          </AppCard>
          <AppCard style={{ flex: 0.5 }}>
            <Text style={styles.headingStyle}>Explore</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={data}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ExploreCard
                  name={item.name}
                  onPress={() =>
                    this.props.toCategory(item.categoryId, item.name)
                  }
                  image={item.image}
                />
              )}
            />
          </AppCard>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    elevation: 1,
  },
  headingStyle: { fontSize: 18, fontWeight: 'bold' },
});
