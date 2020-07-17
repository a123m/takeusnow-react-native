import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Picker,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SearchBar, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {
  ProjectCard,
  AppModal,
  AppCard,
  AppButton,
  UserCard,
} from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';
import RegionList from '../../utils/RegionList';

import { Styles } from '../../common';
import moment from 'moment';
// import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  category: string;
  onProjectPress: any;
  showFilterModal: any;
  filterModalHandler(): void;
  onUserPress(userId: number): void;
}

interface State {
  searchInput: string;
  projectData: Array<Data> | never[];
  userData: any[];
  minBudget: number | undefined;
  maxBudget: number | undefined;
  state: string;
  city: string;
  category: string;
  isLoading: boolean;
  isListEnd: boolean;
}

interface Data {
  projectId: number;
  title: string;
  created_at: Date | string;
  budget: number;
  proposals: number;
  location: string;
  skills: Array<string>;
  status: string;
}

const responseDummyWork: Array<Data> = [
  {
    projectId: 1,
    title: 'Need a marriage Planner',
    created_at: moment().toISOString(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
    status: 'A',
  },
  {
    projectId: 2,
    title: 'Need a marriage Planner',
    created_at: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
    status: 'A',
  },
  {
    projectId: 3,
    title: 'Need a marriage Planner',
    created_at: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
    status: 'A',
  },
  {
    projectId: 4,
    title: 'Need a marriage Planner',
    created_at: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
    status: 'A',
  },
  {
    projectId: 5,
    title: 'Need a marriage Planner',
    created_at: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
    status: 'A',
  },
  {
    projectId: 6,
    title: 'Need a marriage Planner',
    created_at: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
    status: 'A',
  },
];

const responseDummyHire = [
  {
    userId: 1,
    fname: 'Aman',
    lname: 'Chhabra',
    user_image:
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
    average_reviews: 4,
    total_reviews: 5,
  },
];

export default class Category extends React.PureComponent<Props, State> {
  role: string | Promise<string | null>;
  scrollY = new Animated.Value(0);
  startHeight = 70;
  endHeight = 0;
  animatedSearchHeight = this.scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [this.startHeight, this.endHeight],
    extrapolate: 'clamp',
  });
  animatedOpacity = this.animatedSearchHeight.interpolate({
    inputRange: [this.endHeight, this.startHeight],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  animatedTop = this.animatedSearchHeight.interpolate({
    inputRange: [this.endHeight, this.startHeight],
    outputRange: [-30, 0],
    extrapolate: 'clamp',
  });
  categoryId: any;
  constructor(props: any) {
    super(props);
    this.state = {
      projectData: [],
      userData: [],

      minBudget: 0,
      maxBudget: 0,

      state: '',
      city: '',
      category: '',
      searchInput: '',

      isLoading: false,
      isListEnd: false,
    };
    // this.role = AsyncStorage.getItem('role');
    this.role = 'work';
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    // const { category } = this.props;
    // let params = { category: category };
    let response;
    try {
      if (this.role === 'hire') {
        // const response: any =await APIService.sendGetCall('browse/category/hire/'+ this.categoryId);
        response = responseDummyHire;
        this.setState({
          userData: response,
        });
      }
      if (this.role === 'work') {
        // const response: any = await APIService.sendGetCall('browse/category/work/'+ this.categoryId);
        response = responseDummyWork;
        this.setState({
          projectData: response,
        });
        console.log(response);
      }
    } catch (err) {
      GlobalErr(err);
    }
  };

  _renderFilterModal = () => {
    const { minBudget, maxBudget, state, city, category } = this.state;
    const { showFilterModal, filterModalHandler } = this.props;
    // const { state, allowEdit, city } = this.state;
    let onlyState: string[] = [];
    for (let i in RegionList) {
      onlyState.push(i);
    }
    let onlyCity = [];
    for (let i in RegionList) {
      if (i === state) {
        onlyCity = RegionList[i];
      }
    }
    return (
      <AppModal visible={showFilterModal}>
        <AppCard style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.headingStyle}>Filters</Text>
            <AppButton
              style={{ backgroundColor: 'white' }}
              onPress={filterModalHandler}
            >
              <Icon name={'close'} size={20} color={Styles.PrimaryColor} />
            </AppButton>
          </View>
          <View
            style={{
              // flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 100,
              // backgroundColor: 'black',
            }}
          >
            <Text>Minimum Budget</Text>
            <Slider
              value={minBudget}
              onValueChange={(minBudget: number) =>
                this.setState({ minBudget })
              }
            />
            <Text>Value: {minBudget}</Text>
          </View>
          <View
            style={{
              // flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 100,
              // backgroundColor: 'black',
            }}
          >
            <Text>Maximum Budget</Text>
            <Slider
              value={maxBudget}
              onValueChange={(maxBudget: number) =>
                this.setState({ maxBudget })
              }
            />
            <Text>Value: {maxBudget}</Text>
          </View>
          <View
            style={{
              // flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 100,
              // backgroundColor: 'black',
            }}
          >
            <Text>Category</Text>
            <Picker
              selectedValue={category}
              style={{ height: 50, width: 250 }}
              onValueChange={(category: any) => this.setState({ category })}
            >
              {onlyState.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />;
              })}
            </Picker>
          </View>
          <View
            style={{
              // flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 100,
              // backgroundColor: 'black',
            }}
          >
            <Text>State</Text>
            <Picker
              selectedValue={state}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue: any) =>
                this.setState({ state: itemValue })
              }
            >
              {onlyState.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />;
              })}
            </Picker>
          </View>
          <View
            style={{
              // flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 100,
              // backgroundColor: 'black',
            }}
          >
            <Text>City</Text>
            <Picker
              selectedValue={city}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue: any) =>
                this.setState({ city: itemValue })
              }
            >
              {onlyCity.map(
                (item: string, index: string | number | undefined) => {
                  return <Picker.Item key={index} label={item} value={item} />;
                }
              )}
            </Picker>
          </View>
          <AppButton onPress={this.saveFilterHandler}>Apply Filters</AppButton>
        </AppCard>
      </AppModal>
    );
  };

  saveFilterHandler = async () => {
    this.props.filterModalHandler;
    this.setState({
      isLoading: true,
    });
    // const params = {

    // }
    // try {
    //   if (this.role === 'hire') {
    //     // const response: any = await APIService.sendPostCall('browse/category/hire/', params);
    //   }
    //   if (this.role === 'work') {
    //     // const response: any = await APIService.sendPostCall('browse/category/work', params);
    //   }

    //   const response = responseDummyWork;
    //   // const response = responseDummyHire;

    //   this.setState({
    //     projectData: response,
    //   });
    // } catch (err) {
    //   GlobalErr(err);
    // }
  };

  _renderSearchBar = () => {
    const { searchInput } = this.state;
    return (
      <Animated.View
        style={{
          height: this.animatedSearchHeight,
          opacity: this.animatedOpacity,
          top: this.animatedTop,

          position: 'absolute',
          width: '100%',
          // top: 0,
          // left: 0,
          zIndex: 9999,
        }}
      >
        <SearchBar
          placeholder="Search Projects..."
          onChangeText={(searchInput: string) => {
            this.setState({ searchInput });
          }}
          value={searchInput}
          style={{ color: 'white' }}
          containerStyle={{
            backgroundColor: 'white',
            borderColor: 'white',
            borderBottomColor: 'white',
            borderTopColor: 'white',
            margin: 5,
          }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Animated.View>
    );
  };

  loadMoreData = () => {
    if (!this.state.isLoading && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ isLoading: true }, async () => {
        try {
          const response = await APIService.sendGetCall(
            `reviews/${this.userId}/more?page=${this.page}&limit=${this.limit}`
          );
          if (response.length > 0) {
            //Successful response from the API Call
            this.page = this.page + 1;
            //After the response increasing the offset for the next API call.
            this.setState({
              reviews: [...this.state.reviews, ...response],
              //adding the new data with old one available
              isLoading: false,
              //updating the loading state to false
            });
          } else {
            this.setState({
              isLoading: false,
              isListEnd: true,
            });
          }
        } catch (err) {
          GlobalErr(err);
          this.setState({
            isLoading: false,
            isListEnd: true,
          });
        }
      });
    }
  };

  _renderProjects = () => {
    const { projectData } = this.state;
    console.log('projectData', projectData);
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.scrollY } } },
        ])}
        data={projectData}
        keyExtractor={(item) => item.projectId.toString()}
        style={{ paddingTop: 70 }}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {this.state.isLoading ? (
              <ActivityIndicator
                color={Styles.PrimaryColor2}
                style={{ height: 150, paddingBottom: 70 }}
                size="large"
              />
            ) : (
              <View style={{ height: 50 }} />
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <ProjectCard
            title={item.title}
            createdAt={item.created_at}
            budget={item.budget}
            location={item.location}
            onPress={() => this.projectClickHandler(item.projectId)}
            proposals={item.proposals}
            skills={item.skills}
          />
        )}
      />
    );
  };

  projectClickHandler = (projectId: Number) => {
    const { onProjectPress } = this.props;
    onProjectPress(projectId);
  };

  _renderFreeLancers = () => {
    const { onUserPress } = this.props;
    const { userData } = this.state;
    return (
      <FlatList
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.scrollY } } },
        ])}
        data={userData}
        keyExtractor={(item) => item.userId.toString()}
        style={{ paddingTop: 70 }}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {this.state.isLoading ? (
              <ActivityIndicator
                color={Styles.PrimaryColor2}
                style={{ height: 150, paddingBottom: 70 }}
                size="large"
              />
            ) : (
              <View style={{ height: 50 }} />
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <UserCard
            fname={item.fname}
            lname={item.lname}
            averageReviews={item.average_reviews}
            totalReviews={item.total_reviews}
            userImage={item.user_image}
            onPress={() => onUserPress(item.userId)}
          />
        )}
      />
    );
  };

  render() {
    if (this.role === 'work') {
      return (
        <>
          {this._renderFilterModal()}
          {this._renderSearchBar()}
          {this._renderProjects()}
        </>
      );
    }
    if (this.role === 'hire') {
      return (
        <>
          {this._renderFilterModal()}
          {this._renderSearchBar()}
          {this._renderFreeLancers()}
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  headingStyle: { fontSize: 16, fontWeight: 'bold' },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
