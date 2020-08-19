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
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Avatar, SkillBox, AppCard, BoxText, Loader } from '../../components';
import APIService from '../../utils/APIService';
import { completeImageUrl, GlobalErr } from '../../utils/utils';

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
  userImage: any;
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
  isLoading: boolean;
}

const catData = [
  { cat_id: 0, name: 'Select Category', status: 0 },
  { cat_id: 1, name: 'Photography', status: 0 },
  { cat_id: 2, name: 'Videography', status: 0 },
  { cat_id: 3, name: 'Wedding Planning', status: 0 },
  { cat_id: 4, name: 'Makeup Artist', status: 0 },
  { cat_id: 5, name: 'Decoration', status: 0 },
  { cat_id: 6, name: 'Choreography', status: 0 },
  { cat_id: 7, name: 'Astrology', status: 0 },
  { cat_id: 8, name: 'Entertainment', status: 0 },
];
const subCatData = [
  { sub_cat_id: 1, cat_id: 1, name: 'Still', status: 0 },
  { sub_cat_id: 2, cat_id: 1, name: 'Videograph', status: 0 },
  { sub_cat_id: 3, cat_id: 1, name: 'Wedding Planners', status: 0 },
  { sub_cat_id: 4, cat_id: 1, name: 'Makeup Artist', status: 0 },
  { sub_cat_id: 5, cat_id: 2, name: 'Decorators', status: 0 },
  { sub_cat_id: 6, cat_id: 2, name: 'Choreographers', status: 0 },
  { sub_cat_id: 7, cat_id: 2, name: 'Astrologers', status: 0 },
  { sub_cat_id: 8, cat_id: 3, name: 'Entertainers', status: 0 },
];

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
  userId = this.props.userId;
  constructor(props: Props) {
    super(props);
    this.state = {
      fullName: '',
      userImage: '',
      about: '',
      state: 'Select State',
      city: 'Select City',
      selectedSkill: 'Select Skill',
      selectedRating: 0,
      ableToTravel: 'No',
      enteredLanguage: '',
      workExperience: '',
      gender: 'Male',
      dateOfBirth: '',
      enteredEquipment: '',

      skillData: [],
      equipmentsData: [],
      portfolio: [],
      languagesData: [],
      selectedItems: [],
      selectedSubCat: [],

      height: 0,
      imageIndex: 0,

      showMore: false,
      isImageViewVisible: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    try {
      const response = await APIService.sendGetCall('/profile/' + this.userId);
      if (!response) {
        this.setState({ isLoading: false });
        return;
      }

      const fullName: string = response.fname.concat(' ', response.lname);

      let state = response.state;
      let city = response.city;
      if (response.state === '' || response.state === null || !state) {
        state = 'Select State';
      }
      if (response.city === '' || response.city === null || !city) {
        city = 'Select City';
      }

      let userImage = response.user_image;
      if (!userImage) {
        userImage = '';
      }
      if (userImage.length > 0) {
        userImage = completeImageUrl(userImage);
      }

      this.catData = catData;
      this.subCatData = subCatData;

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
      if (portfolio.length > 0) {
        portfolio.forEach((item: any) => {
          item.image_url = completeImageUrl(item.image_url);
          item.uri = item.image_url;
        });
      }

      let selectedSubCat = response.my_skills;
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

      this.setState({
        fullName: fullName,
        about: response.about,
        state: state,
        city: city,
        userImage: userImage,
        portfolio: portfolio,
        dateOfBirth: response.dob,
        gender: response.gender,
        workExperience: response.work_experience,
        ableToTravel: response.able_to_travel,
        selectedSubCat: JSON.parse(selectedSubCat),
        equipmentsData: JSON.parse(equipmentsData),
        languagesData: JSON.parse(languagesData),
        isLoading: false,
      });
    } catch (err) {
      GlobalErr(err);
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
              {this.state.fullName}
            </Animated.Text>
            <Animated.View
              style={[
                styles.smallContainer,
                { opacity: this.animatedOpacityHide },
              ]}
            >
              <Avatar size={'large'} source={this.state.userImage} />
              <Text
                style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}
              >
                {this.state.fullName}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="location-pin" color="white" size={16} />
                <Text style={{ fontSize: 12, color: 'white' }}>
                  {this.state.city}, {this.state.state}
                </Text>
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
                <Image
                  style={{
                    width: 300,
                    height: 200,
                    borderRadius: 30,
                  }}
                  source={{ uri: item.image_url }}
                  resizeMode="cover"
                />
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
    const allowedStrLength = 250;
    if (str.length > allowedStrLength && !this.state.showMore) {
      str = this.state.about.slice(0, allowedStrLength);
      showMore = 'show more';
    } else {
      showMore = 'show less';
    }

    return (
      <View style={styles.cardStyle}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>About</Text>
        <Text>{str}</Text>
        {this.state.about.length > allowedStrLength ? (
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
            {filteredSubCat.map((item) => {
              return (
                <BoxText size={16} key={item.sub_cat_id} text={item.name} />
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
              <SkillBox key={index} value={item.value} level={item.rating} />
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
          <View style={styles.otherSectionContainer}>
            <Text style={styles.otherSectionText}>{dateOfBirth}</Text>
          </View>

          <Text style={styles.headingStyle}>Gender</Text>
          <View style={styles.otherSectionContainer}>
            <Text style={styles.otherSectionText}>{gender}</Text>
          </View>

          <Text style={styles.headingStyle}>Work Experience</Text>
          <View style={styles.otherSectionContainer}>
            <Text style={styles.otherSectionText}>{workExperience}</Text>
          </View>

          <Text style={styles.headingStyle}>Able to Travel</Text>
          <View style={styles.otherSectionContainer}>
            <Text style={styles.otherSectionText}>{ableToTravel}</Text>
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
              <SkillBox key={index} value={item.value} level={item.rating} />
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
      <>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        {this._renderHeaderSection()}
        {this._renderProfileSection()}
        <ImageView
          images={this.state.portfolio}
          imageIndex={this.state.imageIndex}
          visible={this.state.isImageViewVisible}
          onRequestClose={() => this.setState({ isImageViewVisible: false })}
        />
        {this.state.isLoading ? (
          <Loader visible={this.state.isLoading} />
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  smallContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 5,
  },
  headingStyle: { fontSize: 18 },
  otherSectionContainer: { margin: 6 },
  otherSectionText: { fontSize: 16 },
});
