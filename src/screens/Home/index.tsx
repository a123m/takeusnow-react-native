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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Splash from 'react-native-splash-screen';

import { ExploreCard, AppCard } from '../../components';
import Socket from '../../utils/Socket';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

// eslint-disable-next-line no-unused-vars
import { UserEntity } from '../../modals';

import { Styles } from '../../common';

const data = [
  {
    name: 'Photographers',
    category: 'animation',
    image: require('../../../assets/images/photography.jpg'),
  },
  {
    name: 'Videographers',
    category: 'animation',
    image: require('../../../assets/images/videography.jpg'),
  },
  {
    name: 'Wedding Planners',
    category: 'animation',
    image: require('../../../assets/images/planner.jpg'),
  },
  {
    name: 'Astrology',
    category: 'animation',
    image: require('../../../assets/images/astrology.jpg'),
  },
  {
    name: 'Makeup artist',
    category: 'animation',
    image: require('../../../assets/images/makeup.jpg'),
  },
  {
    name: 'Choreographer',
    category: 'animation',
    image: require('../../../assets/images/art.jpg'),
  },
];

export default class Home extends React.PureComponent<any, any> {
  userId: string | null | undefined;
  state = {
    firstName: '',
    profileCompletePercentage: 0,
  };

  componentDidMount() {
    this.setDefaultView();
    Socket.init();
  }

  setDefaultView = async () => {
    try {
      this.userId = await AsyncStorage.getItem('userId');
      const response = await APIService.sendGetCall('/home/' + this.userId);

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
          <Text>Snapper</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {this.state.firstName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name={'hourglass'} size={38} />
          <View>
            <Text style={{ fontSize: 10 }}>Basic Plan</Text>
            <Text style={{ fontSize: 10 }}>20 Bids Left</Text>
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
        </View>
      </View>
    );
  };

  _renderProjectSection = () => {
    return (
      <View style={styles.cardContainer}>
        <Text>My Projects</Text>
        {/* <ProjectCard /> */}
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
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
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
            <View style={{ flex: 0.1 }}>
              <Text> {this.profileCompletedPercentage()}%</Text>
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
                onPress={() => this.props.toCategory(item.category)}
                image={item.image}
              />
            )}
          />
        </AppCard>
      </ScrollView>
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
