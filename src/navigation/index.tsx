import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Styles } from '../common/index';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import ForgetPassword from './ForgetPasswordScreen';
import { SignUpScreen, AccountTypeScreen, MobileScreen } from './SignUpScreen';
import HomeScreen from './HomeScreen';
import PlansScreen from './PlansScreen';
import PaymentScreen from './PaymentScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import ReviewScreen from './ReviewScreen';
import EditProfileScreen from './EditProfileScreen';
import ProjectScreen from './ProjectScreen';
import ProjectStatusScreen from './ProjectStatusScreen';
import {
  PostProjectScreen,
  PostProjectScreen2,
  PostProjectScreen3,
  PostProjectScreen4,
} from './PostProjectScreen';
import BrowseScreen from './BrowseScreen';
import CategoryScreen from './CategoryScreen';
import DetailsScreen from './DetailsScreens';
import ProposalScreen from './ProposalScreen';
import SendProposalScreen from './SendProposalScreen';
import MessengerScreen from './MessengerScreen';
import ChatScreen from './ChatScreen';

const getTabBarIcon = (navigation: any, focused: any, tintColor: any) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName = '';
  if (routeName === 'Home') {
    iconName = focused ? 'home' : 'home';
    // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Project') {
    iconName = focused ? 'folder-alt' : 'folder-alt';
  } else if (routeName === 'Browse') {
    iconName = focused ? 'magnifier' : 'magnifier';
  } else if (routeName === 'Profile') {
    iconName = focused ? 'user' : 'user';
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={22} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Plans: PlansScreen,
  Payment: PaymentScreen,
  Messenger: MessengerScreen,
  Chat: ChatScreen,
});

HomeStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProjectStack = createStackNavigator({
  Project: ProjectScreen,
  ProjectStatus: ProjectStatusScreen,
  PostProject: PostProjectScreen,
  PostProject2: PostProjectScreen2,
  PostProject3: PostProjectScreen3,
  PostProject4: PostProjectScreen4,
});

ProjectStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const BrowseStack = createStackNavigator({
  Browse: BrowseScreen,
  Category: CategoryScreen,
  Details: DetailsScreen,
  Proposal: ProposalScreen,
  SendProposal: SendProposalScreen,
  Profile: ProfileScreen,
  Review: ReviewScreen,
  // Profile: {
  //   screen: _tabNavigator,
  //   navigationOptions: ({ navigation }) => ({

  //     headerTitle:navigation.getParam(''),
  //     header: () => <ProfileScreen navigation={navigation} />,
  //   }),
  // },
});

BrowseStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator({
  EditProfile: EditProfileScreen,
  Review: ReviewScreen,
  Settings: SettingsScreen,
});

ProfileStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const AppTab = createBottomTabNavigator(
  {
    Home: HomeStack,
    Project: ProjectStack,
    Browse: BrowseStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, tintColor }: any) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: Styles.PrimaryColor2,
      inactiveTintColor: '#aaa',
    },
  }
);
const AuthStack = createStackNavigator({
  SignIn: { screen: SignInScreen },
  ForgetPassword: { screen: ForgetPassword },
  AccountType: { screen: AccountTypeScreen },
  Mobile: { screen: MobileScreen },
  SignUp: { screen: SignUpScreen },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      App: AppTab,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Splash',
    }
  )
);
