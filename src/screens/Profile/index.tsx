import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ImageView from 'react-native-image-view';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Avatar, SkillBox, AppCard, BoxText } from '../../components';
// import APIService from '../../utils/APIService';

import { Styles } from '../../common';

interface Props {
  toBack: any;
  toReview: any;
  userId: number;
}

interface State {
  fullName: string;
  about: string;
  skillData: Array<any>;
  equipmentsData: Array<object | string>;
  height: any;
  gender: string;
  state: string;
  city: string;
  selectedSkill: string;
  selectedRating: number;
  user_image: any;
  imageIndex: number;
  portfolio: Array<any>;
  languagesData: Array<object>;
  ableToTravel: string;
  enteredLanguage: string;
  workExperience: string;
  dateOfBirth: string;
  enteredEquipment: string;
  selectedSubCat: Array<any>;
  selectedItems: Array<any>;
  showMore: boolean;
  isImageViewVisible: boolean;
}

const getResponseData = {
  id: 1,
  fname: 'aman',
  lname: 'chhabra',
  about: 'Hey I am a snapper',
  state: 'Uttar Pradesh (UP)',
  city: 'Agra',
  DOB: 'Nov 3, 1996',
  gender: 'Male',
  work_experience: '1 year',
  able_to_travel: 'yes',
  sub_cat: '[]',
  user_image:
    'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
  portfolio: [
    {
      source: {
        uri:
          'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
      },
      title: 'Switzerland',
    },

    {
      source: {
        uri:
          'https://i.pinimg.com/564x/a5/1b/63/a51b63c13c7c41fa333b302fc7938f06.jpg',
      },
      title: 'USA',
    },
    {
      source: {
        uri:
          'https://guidetoiceland.imgix.net/4935/x/0/top-10-beautiful-waterfalls-of-iceland-8?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-2.1.1&w=883&s=1fb8e5e1906e1d18fc6b08108a9dde8d',
      },
      title: 'Iceland',
    },
  ],
  catData: [
    { cat_id: 0, name: 'Select Category', status: 0 },
    { cat_id: 1, name: 'Photography', status: 0 },
    { cat_id: 2, name: 'Videography', status: 0 },
    { cat_id: 3, name: 'Wedding Planning', status: 0 },
    { cat_id: 4, name: 'Makeup Artist', status: 0 },
    { cat_id: 5, name: 'Decoration', status: 0 },
    { cat_id: 6, name: 'Choreography', status: 0 },
    { cat_id: 7, name: 'Astrology', status: 0 },
    { cat_id: 8, name: 'Entertainment', status: 0 },
  ],
  subCatData: [
    { sub_cat_id: 1, cat_id: 1, name: 'Still', status: 0 },
    { sub_cat_id: 2, cat_id: 1, name: 'Videograph', status: 0 },
    { sub_cat_id: 3, cat_id: 1, name: 'Wedding Planners', status: 0 },
    { sub_cat_id: 4, cat_id: 1, name: 'Makeup Artist', status: 0 },
    { sub_cat_id: 5, cat_id: 2, name: 'Decorators', status: 0 },
    { sub_cat_id: 6, cat_id: 2, name: 'Choreographers', status: 0 },
    { sub_cat_id: 7, cat_id: 2, name: 'Astrologers', status: 0 },
    { sub_cat_id: 8, cat_id: 3, name: 'Entertainers', status: 0 },
  ],
  my_equipments:
    '[{ "value": "Canon 350", "rating": 5 },{ "value": "Nikon 560", "rating": 5 }]',
  languages_known:
    '[{"value":"English","rating":5},{"value":"Hindi","rating":5}]',
};

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
  private combinedCatData: any = [];
  private catData: any = [];
  private subCatData: any = [];
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
      fullName: 'Aman Chhabra',
      user_image: '',
      imageIndex: 0,
      about: '',
      state: 'Select State',
      city: 'Select City',
      selectedSkill: 'Select Skill',
      selectedRating: 0,
      ableToTravel: 'No',
      enteredLanguage: '',
      workExperience: '1 year',
      gender: 'Male',
      dateOfBirth: 'Nov 3, 1996',
      enteredEquipment: '',

      skillData: [],
      equipmentsData: [],
      portfolio: [],
      languagesData: [],
      selectedItems: [],
      selectedSubCat: [],

      height: 0,
      showMore: false,
      isImageViewVisible: false,
    };
  }

  componentDidMount() {
    // this.setDefaultView();
    // this.setState({
    //   about: 'hello',
    // });
  }

  setDefaultView = async () => {
    try {
      // const response = await APIService.sendGetCall(
      //   '/profile/main' + this.props.userId
      // );

      const response = getResponseData;
      let state = response.state;
      let city = response.city;
      if (response.state === '' || response.state === null || !state) {
        state = 'Select State';
      }
      if (response.city === '' || response.city === null || !city) {
        city = 'Select City';
      }

      let user_image = response.user_image;
      if (!user_image) {
        user_image = '';
      }

      this.catData = response.catData;
      this.subCatData = response.subCatData;

      for (let i of this.catData) {
        let childrenArr = [];
        for (let j of this.subCatData) {
          if (i.cat_id === j.cat_id) {
            let subCatObj = {
              id: j.sub_cat_id,
              cat_id: j.cat_id,
              name: j.name,
              status: j.status,
            };
            childrenArr.push(subCatObj);
          }
        }
        let catObj: any = {
          id: i.cat_id,
          name: i.name,
          status: i.status,
          children: childrenArr,
        };
        this.combinedCatData.push(catObj);
      }

      let portfolio = response.portfolio;
      if (!portfolio) {
        portfolio = [];
      }

      let selectedSubCat = response.sub_cat;
      if (!selectedSubCat || selectedSubCat === '') {
        selectedSubCat = '[]';
      }

      let equipmentsData = response.my_equipments;
      if (!equipmentsData || equipmentsData === '') {
        equipmentsData = '[]';
      }

      let languagesData = response.languages_known;
      if (!languagesData || languagesData === '') {
        languagesData = '[]';
      }

      setTimeout(() => {
        this.setState({
          fullName: fullName,
          about: response.about,
          state: state,
          city: city,
          user_image: user_image,
          portfolio: portfolio,
          dateOfBirth: response.DOB,
          gender: response.gender,
          workExperience: response.work_experience,
          ableToTravel: response.able_to_travel,
          selectedSubCat: JSON.parse(selectedSubCat),
          equipmentsData: JSON.parse(equipmentsData),
          languagesData: JSON.parse(languagesData),
          isLoading: false,
        });
      }, 10000);
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

  _renderPortfolio = () => {
    const { portfolio } = this.state;
    if (portfolio.length === 0) {
      return (
        <>
          <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 10 }}>
            Portfolio
          </Text>
          <View
            style={{
              flex: 1,
              height: 205,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Images!</Text>
          </View>
        </>
      );
    }
    const portfolioLength = portfolio.length - 1;
    return (
      <AppCard style={{ overflow: 'visible' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Portfolio</Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.portfolioStyle}
          data={portfolio}
          horizontal={true}
          keyExtractor={(item, index: number) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  this.setState({
                    imageIndex: index,
                    isImageViewVisible: true,
                  });
                }}
              >
                <View>
                  {index === portfolioLength ? (
                    <Image
                      style={{
                        width: 300,
                        height: 200,
                        borderRadius: 30,
                        marginRight: 15,
                      }}
                      source={item.source}
                      resizeMode="cover"
                    />
                  ) : (
                    <View>
                      {index === 0 ? (
                        <Image
                          style={{
                            width: 300,
                            height: 200,
                            borderRadius: 30,
                            marginLeft: 20,
                          }}
                          source={item.source}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          style={{
                            width: 300,
                            height: 200,
                            borderRadius: 30,
                          }}
                          source={item.source}
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </AppCard>
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

  // _renderReportSection = () => {
  //   return (
  //     <View
  //       style={[
  //         styles.cardStyle,
  //         { flexDirection: 'row', justifyContent: 'space-around' },
  //       ]}
  //     >
  //       <View style={{ alignItems: 'center' }}>
  //         <Progress.Circle
  //           size={60}
  //           progress={this.state.project_completed}
  //           showsText={true}
  //           color={Styles.PrimaryColor2}
  //           formatText={() => {
  //             let item = this.state.project_completed;
  //             item * 100;
  //             return <Text>{item}%</Text>;
  //           }}
  //         />
  //         <Text style={styles.textStyle}>Projects</Text>
  //         <Text style={styles.textStyle}>Completed</Text>
  //       </View>
  //       <View style={{ alignItems: 'center' }}>
  //         <Progress.Circle
  //           size={60}
  //           progress={this.state.repeated_hire}
  //           showsText={true}
  //           color={Styles.PrimaryColor2}
  //           formatText={() => {
  //             let item = this.state.repeated_hire;
  //             item * 100;
  //             return <Text>{item}%</Text>;
  //           }}
  //         />
  //         <Text style={styles.textStyle}>Repeat</Text>
  //         <Text style={styles.textStyle}>Hire</Text>
  //       </View>
  //       <View style={{ alignItems: 'center' }}>
  //         <Progress.Circle
  //           size={60}
  //           progress={this.state.work_on_time}
  //           showsText={true}
  //           color={Styles.PrimaryColor2}
  //           formatText={() => {
  //             let item = this.state.work_on_time;
  //             item * 100;
  //             return <Text>{item}%</Text>;
  //           }}
  //         />
  //         <Text style={styles.textStyle}>Work</Text>
  //         <Text style={styles.textStyle}>On Time</Text>
  //       </View>
  //       <View style={{ alignItems: 'center' }}>
  //         <Progress.Circle
  //           size={60}
  //           progress={this.state.work_knowledge}
  //           showsText={true}
  //           color={Styles.PrimaryColor2}
  //           formatText={() => {
  //             let item = this.state.work_knowledge;
  //             item * 100;
  //             return <Text>{item}%</Text>;
  //           }}
  //         />
  //         <Text style={styles.textStyle}>Work</Text>
  //         <Text style={styles.textStyle}>Knowledge</Text>
  //       </View>
  //     </View>
  //   );
  // };

  _renderSkillSection = () => {
    const { selectedSubCat } = this.state;
    let filteredSubCat = [];
    for (let i of selectedSubCat) {
      for (let j of this.subCatData) {
        if (j.sub_cat_id === i) {
          filteredSubCat.push(j);
        }
      }
    }
    return (
      <View style={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>My Skills</Text>
        </View>
        {filteredSubCat.length === 0 ? (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Skills</Text>
          </View>
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            {filteredSubCat.map((item, index) => {
              return (
                <BoxText
                  size={16}
                  key={item.sub_cat_id}
                  text={item.name}
                  showCross={allowEdit}
                  onPress={() => {
                    this.setState({
                      selectedSubCat: this.state.selectedSubCat.filter(
                        (newItem, newIndex) => newIndex !== index
                      ),
                    });
                  }}
                />
              );
            })}
          </View>
        )}
      </View>
    );
  };

  _renderEquipmentsSection = () => {
    const { equipmentsData } = this.state;
    return (
      <View style={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            My Equipments
          </Text>
        </View>
        {equipmentsData.length === 0 ? (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No EquipmentsData</Text>
          </View>
        ) : (
          equipmentsData.map((item: any, index: number) => {
            return (
              <SkillBox
                key={index}
                value={item.value}
                level={item.rating}
                onCrossPress={() => {
                  this.setState({
                    equipmentsData: this.state.equipmentsData.filter(
                      (item, newIndex) => {
                        return index !== newIndex;
                      }
                    ),
                  });
                }}
              />
            );
          })
        )}
      </View>
    );
  };

  _renderOthers = () => {
    const { workExperience, gender, dateOfBirth, ableToTravel } = this.state;
    return (
      <AppCard>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Others</Text>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingStyle}>Date of Birth</Text>
          <View style={{ margin: 6 }}>
            <Text style={{ fontSize: 16 }}>{dateOfBirth}</Text>
          </View>
          <Text style={styles.headingStyle}>Gender</Text>
          <View style={{ margin: 6 }}>
            <Text style={{ fontSize: 16 }}>{gender}</Text>
          </View>
          <Text style={styles.headingStyle}>Work Experience</Text>

          <View style={{ margin: 6 }}>
            <Text style={{ fontSize: 16 }}>{workExperience}</Text>
          </View>

          <Text style={styles.headingStyle}>Able to Travel</Text>

          <View style={{ margin: 6 }}>
            <Text style={{ fontSize: 16 }}>{ableToTravel}</Text>
          </View>
        </View>
      </AppCard>
    );
  };

  _renderLanguagesSection = () => {
    const { languagesData } = this.state;
    return (
      <View style={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Languages Known
          </Text>
        </View>
        {languagesData.length === 0 ? (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Languages</Text>
          </View>
        ) : (
          languagesData.map((item: any, index: number) => {
            return (
              <SkillBox
                key={index}
                value={item.value}
                level={item.rating}
                onCrossPress={() => {
                  this.setState({
                    languagesData: this.state.languagesData.filter(
                      (item, newIndex) => {
                        return index !== newIndex;
                      }
                    ),
                  });
                }}
              />
            );
          })
        )}
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
        {this._renderPortfolio()}
        {this._renderAboutSection()}
        {this._renderSkillSection()}
        {this._renderEquipmentsSection()}
        {this._renderOthers()}
        {this._renderLanguagesSection()}
        {this._renderCheckReviews()}
        <View style={{ height: 305 }} />
      </>
    );
  };

  _renderCheckReviews = () => {
    const { toReview } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          toReview(this.userId);
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
        <ImageView
          glideAlways
          images={this.state.portfolio}
          imageIndex={this.state.imageIndex}
          animationType="slide"
          isVisible={this.state.isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
          // onImageChange={index => {
          //     console.log(index);
          // }}
        />
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
  portfolioStyle: {
    height: 205,
    marginLeft: '-4%',
    marginRight: '-4%',
    marginTop: 5,
  },
  headingStyle: { fontSize: 18 },
});
