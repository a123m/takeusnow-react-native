import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  StatusBar,
} from 'react-native';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Avatar, SkillBox } from '../../components';
import APIService from '../../utils/APIService';

import { Styles } from '../../common';

// let skillData = [
//   { value: 'Photography', rating: 3 },
// ];

interface Props {
  toBack: any;
  toReview: any;
}

interface State {
  userId: number;
  username: string;
  about: string;
  project_completed: number;
  repeated_hire: number;
  work_on_time: number;
  work_knowledge: number;
  skillData: Array<any>;
  showMore: boolean;
}

interface Response {
  profile: ProfileData;
}

interface ProfileData {
  userId: number;
  about: string;
  project_completed: string;
  repeated_hire: string;
  work_on_time: string;
  work_knowledge: string;
  my_skills: string;
  fname: string;
  lname: string;
}

export default class Profile extends React.PureComponent<Props, State> {
  scrollY = new Animated.Value(0);
  startHeight = 300;
  endHeight = 80;
  animatedHeaderHeight = this.scrollY.interpolate({
    inputRange: [0, 225],
    outputRange: [this.startHeight, this.endHeight],
    extrapolate: 'clamp',
  });
  animatedOpacityHide = this.scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  animatedOpacityShow = this.scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  name = '';
  about = '';
  constructor(props: any) {
    super(props);
    this.name = 'Aman Chhabra';

    this.state = {
      userId: 0,
      username: '',
      about: '',
      project_completed: 0,
      repeated_hire: 0,
      work_on_time: 0,
      work_knowledge: 0,
      skillData: [],
      showMore: false,
    };
  }

  componentDidMount() {
    // this.setDefaultView();
    this.setState({
      about: 'hello',
    });
  }

  setDefaultView = async () => {
    try {
      // let id = await AsyncStorage.getItem('userId');
      let id = 23;
      let params = { id: id };
      const response = await APIService.sendPostCall('/profile/main', params);

      if (response.status !== 200) {
        Alert.alert('Alert', response.data.message);
        // this.setState({
        //   isLoading: false
        // });
        return;
      }
      let result: Response = response.data;

      let firstName: string = result.profile.fname;
      let lastName: string = result.profile.lname;

      let username: string = firstName.concat(' ', lastName);

      let skillData = JSON.parse(result.profile.my_skills);

      parseFloat;
      this.setState({
        username: username,
        about: result.profile.about,
        project_completed: parseFloat(result.profile.project_completed),
        repeated_hire: parseFloat(result.profile.repeated_hire),
        work_on_time: parseFloat(result.profile.work_on_time),
        work_knowledge: parseFloat(result.profile.work_knowledge),
        skillData: skillData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  _renderHeaderSection = () => {
    const { toBack } = this.props;
    return (
      <>
        <TouchableOpacity
          style={{
            height: 37,
            width: 37,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 34,
            marginLeft: 13,
            position: 'absolute',
            zIndex: 2,
          }}
          onPress={toBack}
        >
          <Icon2 name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Animated.View
          style={{
            height: this.animatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              Styles.PrimaryColor2,
              Styles.PrimaryColor,
              Styles.PrimaryColor3,
            ]}
            style={{ flex: 1 }}
          >
            <Animated.Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'white',
                marginTop: 37,
                marginLeft: 73,
                opacity: this.animatedOpacityShow,
                position: 'absolute',
              }}
            >
              Aman Chhabra
            </Animated.Text>
            <Animated.View
              style={[
                styles.smallContainer,
                { opacity: this.animatedOpacityHide },
              ]}
            >
              <Avatar
                size={'large'}
                source={
                  'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
                }
              />
              <Text
                style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}
              >
                {/* {this.state.username} */}
                Aman Chhabra
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="location-pin" color="white" size={16} />
                <Text style={{ fontSize: 12, color: 'white' }}>Noida,UP</Text>
              </View>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </>
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
      <View style={styles.cardStyle}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>About</Text>
        <Text>{str}</Text>
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
                color: Styles.PrimaryColor,
                textAlign: 'right',
                fontWeight: 'bold',
              }}
            >
              {showMore}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  _renderReportSection = () => {
    return (
      <View
        style={[
          styles.cardStyle,
          { flexDirection: 'row', justifyContent: 'space-around' },
        ]}
      >
        <View style={{ alignItems: 'center' }}>
          <Progress.Circle
            size={60}
            progress={this.state.project_completed}
            showsText={true}
            color={Styles.PrimaryColor2}
            formatText={() => {
              let item = this.state.project_completed;
              item * 100;
              return <Text>{item}%</Text>;
            }}
          />
          <Text style={styles.textStyle}>Projects</Text>
          <Text style={styles.textStyle}>Completed</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Progress.Circle
            size={60}
            progress={this.state.repeated_hire}
            showsText={true}
            color={Styles.PrimaryColor2}
            formatText={() => {
              let item = this.state.repeated_hire;
              item * 100;
              return <Text>{item}%</Text>;
            }}
          />
          <Text style={styles.textStyle}>Repeat</Text>
          <Text style={styles.textStyle}>Hire</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Progress.Circle
            size={60}
            progress={this.state.work_on_time}
            showsText={true}
            color={Styles.PrimaryColor2}
            formatText={() => {
              let item = this.state.work_on_time;
              item * 100;
              return <Text>{item}%</Text>;
            }}
          />
          <Text style={styles.textStyle}>Work</Text>
          <Text style={styles.textStyle}>On Time</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Progress.Circle
            size={60}
            progress={this.state.work_knowledge}
            showsText={true}
            color={Styles.PrimaryColor2}
            formatText={() => {
              let item = this.state.work_knowledge;
              item * 100;
              return <Text>{item}%</Text>;
            }}
          />
          <Text style={styles.textStyle}>Work</Text>
          <Text style={styles.textStyle}>Knowledge</Text>
        </View>
      </View>
    );
  };

  _renderSkillSection = () => {
    return (
      <View style={styles.cardStyle}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>My Skills</Text>
        {this.state.skillData.map((item, index) => {
          return (
            <SkillBox key={index} value={item.value} level={item.rating} />
          );
        })}
      </View>
    );
  };

  _renderProfileSection = () => {
    return (
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.scrollY } } },
        ])}
        style={{ paddingTop: 305 }}
      >
        {this._renderProfileView()}
      </ScrollView>
    );
  };

  _renderProfileView = () => {
    return (
      <>
        {this._renderAboutSection()}
        {this._renderReportSection()}
        {this._renderSkillSection()}
        {this._renderCheckReviews()}
      </>
    );
  };

  _renderCheckReviews = () => {
    const { toReview } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          toReview(this.state.userId);
        }}
      >
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: Styles.PrimaryColor2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
              paddingLeft: 10,
            }}
          >
            Check Reviews
          </Text>
          <Icon
            style={{ paddingRight: 10 }}
            name="arrow-right-circle"
            color="white"
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // _tabNavigator = () => {
  //   const Tab = createMaterialTopTabNavigator();
  //   return (
  //     <NavigationContainer>
  //       <Tab.Navigator initialRouteName={'Profile'}>
  //         <Tab.Screen name="Profile" component={this._renderProfileView} />
  //         <Tab.Screen name="Reviews" component={this._renderProfileView} />
  //       </Tab.Navigator>
  //     </NavigationContainer>
  //   );
  // };

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        {this._renderHeaderSection()}
        {this._renderProfileSection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20
    // backgroundColor: 'black',
  },
  cardStyle: {
    padding: 8,
    margin: 5,
    backgroundColor: 'white',
    elevation: 1,
  },
  textStyle: {
    fontSize: 10,
  },
  rating: {
    backgroundColor: 'transparent',
  },
});
