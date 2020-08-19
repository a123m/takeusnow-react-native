import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Picker,
  Animated,
  ActivityIndicator,
  Slider,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  ProjectCard,
  AppModal,
  // AppCard,
  AppButton,
  UserCard,
} from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';
import RegionList from '../../utils/RegionList';

// eslint-disable-next-line no-unused-vars
import { ProjectEntity, UserEntity } from '../../modals';

import { Styles } from '../../common';

interface Props {
  categoryId: number;
  category: string;
  onProjectPress: any;
  showFilterModal: boolean;
  filterModalHandler(): void;
  onUserPress(userId: number): void;
}

interface State {
  searchInput: string;
  projectData: ProjectEntity[];
  userData: UserEntity[];
  minBudget: number;
  maxBudget: number | undefined;
  state: string;
  city: string;
  isLoading: boolean;
  isListEnd: boolean;
}

interface Data {
  req_skills: string;
  id: number;
  title: string;
  created_at: Date | string;
  budget: number;
  proposals: number;
  location: string;
  status: string;
}

type HireResponseType = {
  userId: number;
  fname: string;
  lname: string;
  user_image: string;
  average_reviews: number;
  total_reviews: number;
};

export default class Category extends React.PureComponent<Props, State> {
  completeResponseData: any = [];
  projectFilterParams = {
    minBudget: 0,
    state: '',
    city: '',
  };
  userFilterParams = {};
  role: string | null = 'work';
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
  categoryId = this.props.categoryId;
  page = 1;
  limit = 10;
  constructor(props: any) {
    super(props);
    this.state = {
      projectData: [],
      userData: [],

      minBudget: 0,
      maxBudget: 0,

      state: '',
      city: '',
      searchInput: '',

      isLoading: true,
      isListEnd: false,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    this.role = await AsyncStorage.getItem('accountType');
    try {
      if (this.role === 'work') {
        const response: ProjectEntity[] = await APIService.sendPostCall(
          `browse/${this.categoryId}?page=${this.page}&limit=${
            this.limit
          }&type=work`,
          this.projectFilterParams
        );
        this.completeResponseData = response;

        this.setState({
          projectData: response,
          isLoading: false,
        });
      }
      if (this.role === 'hire') {
        const response: UserEntity[] = await APIService.sendPostCall(
          `browse/${this.categoryId}?page=${this.page}&limit=${
            this.limit
          }&type=hire`,
          this.userFilterParams
        );
        this.completeResponseData = response;

        this.setState({
          userData: response,
          isLoading: false,
        });
      }
    } catch (err) {
      GlobalErr(err);
    }
  };

  _renderFilterModal = () => {
    const { minBudget, state, city } = this.state;
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
      <AppModal onRequestClose={filterModalHandler} visible={showFilterModal}>
        <View style={styles.modalContainer}>
          <View>
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
                alignItems: 'stretch',
                justifyContent: 'center',
                height: 100,
              }}
            >
              <Text style={{ fontSize: 16 }}>Min Budget: {minBudget}</Text>
              <Slider
                value={minBudget}
                maximumValue={30000}
                minimumValue={1}
                step={1}
                onSlidingComplete={(minBudget) => {
                  this.setState({ minBudget });
                }}
                style={{ margin: 15 }}
              />
            </View>
            <Text style={{ fontSize: 16 }}>Location</Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  height: 100,
                }}
              >
                <Text>State</Text>
                <Picker
                  selectedValue={state}
                  style={{ height: 50, width: 200 }}
                  onValueChange={(itemValue: any) =>
                    this.setState({ state: itemValue })
                  }
                >
                  {onlyState.map((item, index) => {
                    return (
                      <Picker.Item key={index} label={item} value={item} />
                    );
                  })}
                </Picker>
              </View>
              <View
                style={{
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  height: 100,
                }}
              >
                <Text>City</Text>
                <Picker
                  selectedValue={city}
                  style={{ height: 50, width: 200 }}
                  onValueChange={(itemValue: any) =>
                    this.setState({ city: itemValue })
                  }
                >
                  {onlyCity.map(
                    (item: string, index: string | number | undefined) => {
                      return (
                        <Picker.Item key={index} label={item} value={item} />
                      );
                    }
                  )}
                </Picker>
              </View>
            </View>
          </View>
          <AppButton onPress={this.saveFilterHandler}>Apply Filters</AppButton>
        </View>
      </AppModal>
    );
  };

  saveFilterHandler = async () => {
    this.props.filterModalHandler();
    this.setState({
      isLoading: true,
      projectData: [],
      userData: [],
    });
    this.page = 1;
    this.projectFilterParams.minBudget = this.state.minBudget;
    this.projectFilterParams.state = this.state.state;
    this.projectFilterParams.city = this.state.city;
    let response;
    try {
      if (this.role === 'hire') {
        response = await APIService.sendPostCall(
          `browse/${this.categoryId}/hire?page=${this.page}&limit=${
            this.limit
          }`,
          this.userFilterParams
        );
        this.setState({
          userData: response,
          isLoading: false,
        });
      }
      if (this.role === 'work') {
        response = await APIService.sendPostCall(
          `browse/${this.categoryId}/work?page=${this.page}&limit=${
            this.limit
          }`,
          this.projectFilterParams
        );
        this.setState({
          projectData: response,
          isLoading: false,
        });
      }
    } catch (err) {
      GlobalErr(err);
      this.setState({
        isLoading: false,
      });
    }
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
          zIndex: 99,
        }}
      >
        <SearchBar
          placeholder={
            this.role === 'work' ? 'Search Projects...' : 'Search Users...'
          }
          onChangeText={(searchInput: string) => {
            this.setState({ searchInput }, () => {
              if (this.role === 'work') {
                const filteredData = this.completeResponseData.filter(
                  (item: Data) => {
                    return item.title
                      .toLowerCase()
                      .includes(searchInput.toLowerCase());
                  }
                );
                this.setState({ projectData: filteredData });
              }
              if (this.role === 'hire') {
                const filteredData = this.completeResponseData.filter(
                  (item: UserEntity) => {
                    return (
                      item.fname
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                      item.lname
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    );
                  }
                );
                this.setState({ userData: filteredData });
              }
            });
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
          let response: any;
          this.page = this.page + 1;

          if (this.role === 'work') {
            response = await APIService.sendPostCall(
              `browse/${this.categoryId}?page=${this.page}&limit=${
                this.limit
              }&type=work`,
              this.projectFilterParams
            );
          }

          if (this.role === 'hire') {
            response = await APIService.sendPostCall(
              `browse/${this.categoryId}?page=${this.page}&limit=${
                this.limit
              }&type=hire`,
              this.userFilterParams
            );
          }

          if (response.length > 0) {
            //Successful response from the API Call
            //After the response increasing the offset for the next API call.
            if (this.role === 'work') {
              this.setState({
                projectData: [...this.state.projectData, ...response],
                //adding the new data with old one available
                isLoading: false,
                //updating the loading state to false
              });
            }

            if (this.role === 'hire') {
              this.setState({
                userData: [...this.state.userData, ...response],
                //adding the new data with old one available
                isLoading: false,
                //updating the loading state to false
              });
            }
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
    const { onProjectPress } = this.props;
    const { projectData } = this.state;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.scrollY } } },
        ])}
        data={projectData}
        keyExtractor={(item) => item.project_id.toString()}
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
            title={item.project_title}
            createdAt={item.created_on}
            budget={item.budget}
            location={item.state}
            onPress={() => onProjectPress(item.project_id)}
            // proposals={item.proposals}
            skills={JSON.parse(item.req_skills)}
          />
        )}
      />
    );
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
        keyExtractor={(item) => item.user_id.toString()}
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
            onPress={() => onUserPress(item.user_id)}
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
  modalContainer: { padding: 10, flex: 1, justifyContent: 'space-between' },
});
