import React from 'react';
import {
  FlatList,
  Alert,
  View,
  Text,
  StyleSheet,
  Picker,
  Animated,
} from 'react-native';
import { SearchBar, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { ProjectCard, AppModal, AppCard, AppButton } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';
import RegionList from '../../utils/RegionList';

import { Styles } from '../../common';

interface Props {
  category: string;
  onProjectPress: any;
  showFilterModal: any;
  filterModalHandler: any;
}

interface State {
  searchInput: string;
  projectData: Array<Data> | never[];
  minBudget: number | undefined;
  maxBudget: number | undefined;
  state: string;
  city: string;
  category: string;
}

interface Data {
  projectId: Number;
  title: String;
  createdAt: Date;
  budget: Number;
  proposals: Number;
  location: String;
  skills: Array<String>;
}

const data: Array<Data> = [
  {
    projectId: 1,
    title: 'Need a marriage Planner',
    createdAt: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
  },
  {
    projectId: 2,
    title: 'Need a marriage Planner',
    createdAt: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
  },
  {
    projectId: 3,
    title: 'Need a marriage Planner',
    createdAt: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
  },
  {
    projectId: 4,
    title: 'Need a marriage Planner',
    createdAt: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
  },
  {
    projectId: 5,
    title: 'Need a marriage Planner',
    createdAt: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
  },
  {
    projectId: 6,
    title: 'Need a marriage Planner',
    createdAt: new Date(),
    budget: 200000,
    proposals: 20,
    location: 'Agra',
    skills: ['Professional photographer', 'Editing experience'],
  },
];

export default class Category extends React.PureComponent<Props, State> {
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
  constructor(props: any) {
    super(props);
    this.state = {
      searchInput: '',
      projectData: [],
      minBudget: 0,
      maxBudget: 0,
      state: '',
      city: '',
      category: '',
    };
  }

  componentDidMount() {
    // this.setDefaultView();
    this.setState({ projectData: data });
  }

  setDefaultView = async () => {
    const { category } = this.props;
    let params = { category: category };
    try {
      const response: any = APIService.sendPostCall('browse/category', params);
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again!');
        return;
      }

      let data: Array<Data> = response.data.projects;

      this.setState({
        projectData: data,
      });
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

  saveFilterHandler = () => {};

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
            margin: 10,
          }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Animated.View>
    );
  };

  _renderProjects = () => {
    const { projectData } = this.state;
    console.log('this.animatedSearchHeight', this.animatedSearchHeight);
    return (
      <FlatList
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.scrollY } } },
        ])}
        data={projectData}
        keyExtractor={(item) => item.projectId.toString()}
        style={{ paddingTop: 70 }}
        renderItem={({ item }) => (
          <ProjectCard
            title={item.title}
            createdAt={item.createdAt}
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

  render() {
    return (
      <>
        {this._renderFilterModal()}
        {this._renderSearchBar()}
        {this._renderProjects()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headingStyle: { fontSize: 16, fontWeight: 'bold' },
});
