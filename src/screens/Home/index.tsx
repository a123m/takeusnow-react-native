import React from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';

// import Carousel from 'react-native-snap-carousel';

import { ExploreCard, AppCard } from '../../components';
import Socket from '../../utils/Socket';
import APIService from '../../utils/APIService';

import { Styles } from '../../common';
import { TouchableOpacity } from 'react-native-gesture-handler';

const data = [
  { name: 'Photographers', category: 'animation', image: 'hululu' },
  { name: 'Videographers', category: 'animation', image: 'hululu' },
  { name: 'Wedding Planners', category: 'animation', image: 'hululu' },
  // { name: 'Astrology', category: 'animation', image: 'hululu' },
  { name: 'Makeup artist', category: 'animation', image: 'hululu' },
  { name: 'Choreographer', category: 'animation', image: 'hululu' },
];

export default class Home extends React.PureComponent<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: '',
      profileCompletePercentage: 0.8,
    };
  }
  componentDidMount() {
    console.log('component did mount');
    this.setDefaultView();
    Socket.init();
  }

  setDefaultView = async () => {
    try {
      let userId: any = await AsyncStorage.getItem('userId');
      userId = JSON.parse(userId);
      const params = { id: userId };
      const response = await APIService.sendPostCall('/home/main', params);
      let firstName = response.fname;
      this.setState({ firstName: firstName });
    } catch (err) {
      console.log(err);
    }
  };

  // _signOutAsync = async () => {
  //   await AsyncStorage.clear();
  //   this.props.onViewSignOut();
  // };

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

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
    let profileCompletePercentage = this.state.profileCompletePercentage * 100;
    return profileCompletePercentage;
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{ flex: 0.5 }}>
          <Image
            style={{ height: '100%', width: '100%' }}
            source={require('../../Images/work.jpg')}
          />
        </View>
        {/* <Carousel
          layout={'default'}
          ref={(c) => { this._carousel = c; }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        /> */}
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
                onPress={() => toCategory(item.category)}
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
