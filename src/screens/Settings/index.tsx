import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

import { AppButton } from '../../components';
import Config from '../../utils/Config';

interface Props {
  onViewSignOut(): void;
}

interface State {
  allowNotification: boolean;
}

export default class Settings extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      allowNotification: true,
    };
  }
  /**
   * sign-out handler
   */
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    firebase.messaging().deleteToken();
    this.props.onViewSignOut();
  };

  /**
   * main render
   */
  render() {
    const { allowNotification } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.containerStyle}>
          <View style={styles.smallContainer}>
            <Text style={styles.textStyle}>Notification</Text>
            <Switch
              value={allowNotification}
              onValueChange={() => {
                this.setState({
                  allowNotification: !this.state.allowNotification,
                });
              }}
            />
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.textStyle}>Help</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.textStyle}>Terms & Condition</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.textStyle}>App Version</Text>
            <Text style={[styles.textStyle, { color: 'silver' }]}>
              {Config.Version}
            </Text>
          </View>
        </View>
        <AppButton iconName="logout" onPress={this._signOutAsync}>
          Sign Out
        </AppButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'black',
  },
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    // backgroundColor: 'black',
  },
  textStyle: {
    fontSize: 18,
  },
});
