import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { AppButton } from '../../components';

interface Props {
  onViewSignOut: Function;
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
            <Text style={styles.textStyle}>Terms & Condotion</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.textStyle}>App Version</Text>
            <Text style={[styles.textStyle, { color: 'silver' }]}>1.0.0</Text>
          </View>
        </View>
        <View style={[styles.containerStyle, { justifyContent: 'center' }]}>
          <AppButton iconName="logout" onPress={this._signOutAsync}>
            Sign Out
          </AppButton>
        </View>
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
