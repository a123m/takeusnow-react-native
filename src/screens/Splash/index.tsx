/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { View, UIManager, StyleSheet } from 'react-native';
import Loader from 'react-native-mask-loader';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import Router from '../../navigation';
import Device from '../../utils/Device';

type State = {
  appReady: Boolean;
};

export default class Splash extends React.PureComponent<{}, State> {
  _image: any;

  constructor(props: any) {
    super(props);
    this.state = {
      appReady: false,
    };

    if (Device.OS === 'android') {
      // noinspection JSUnresolvedFunction
      UIManager.setLayoutAnimationEnabledExperimental(true); // enable Animation on Android
    }

    this._image = require('../../../assets/snaplancing.png');
  }

  componentDidMount() {
    this.prepareData();
    setTimeout(() => {
      this.setState({
        appReady: true, // for IOS
      });
      SplashScreen.hide(); // for Android
    }, 3000);
  }

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  _navigationAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  prepareData = () => {
    /**
     * add loading data here
     */
  };

  _androidView = () => {
    return <Router />;
  };

  _iosView = () => {
    return (
      <View style={styles.root}>
        <Loader
          isLoaded={this.state.appReady}
          imageSource={this._image}
          backgroundStyle={styles.loadingBackgroundStyle}
        >
          {/* <View style={styles.container}></View> */}
          <LoginRouter />
        </Loader>
      </View>
    );
  };

  render() {
    return Device.OS === 'android' ? this._androidView() : this._iosView();
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBackgroundStyle: {
    backgroundColor: 'rgba(98, 6, 148, 1)',
  },
});
