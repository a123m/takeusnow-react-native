import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Picker,
  Dimensions,
} from 'react-native';

import { AppInput, AppButton } from '../../components';
import Globals from '../../utils/Globals';
import APIService from '../../utils/APIService';

import { Styles } from '../../common';

interface Props {
  toPostProject3(): void;
}

interface State {
  title: string;
  state: number;
  city: number;
  stateData: object[];
  cityData: object[];
}

export default class PostProject2 extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      state: 0,
      city: 0,

      stateData: [],
      cityData: [],
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    const stateData = await APIService.sendGetCall('/worlddata/state');
    this.setState({
      title: Globals.PostProject.title,
      state: Globals.PostProject.state,
      city: Globals.PostProject.city,
      stateData: stateData,
    });
  };
  /**
   * handle the button request
   */
  nextHandler = () => {
    const { toPostProject3 } = this.props;
    const { title, state, city } = this.state;

    if (title.length < 15) {
      Alert.alert(
        'Alert',
        'Please provide at least 15 characters to your project'
      );
      return;
    }
    if (title.length > 100) {
      Alert.alert('Alert', 'Title is too long!');
      return;
    }
    Globals.PostProject.title = title;
    Globals.PostProject.state = state;
    Globals.PostProject.city = city;

    toPostProject3();
  };

  /**
   * Location View function
   */
  _renderLocation = () => {
    const { state, city, stateData, cityData } = this.state;
    return (
      <>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingStyle}>State</Text>

          <Picker
            selectedValue={state}
            style={{ height: 50, width: 200 }}
            onValueChange={async (itemValue: any) => {
              const cityData = await APIService.sendGetCall(
                `/worlddata/city/${itemValue}`
              );
              this.setState({ state: itemValue, cityData: cityData });
            }}
          >
            {stateData.map((item: any) => {
              return (
                <Picker.Item
                  key={item.state_id}
                  label={item.state_name}
                  value={item.state_id}
                />
              );
            })}
          </Picker>

          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>City</Text>

          <Picker
            selectedValue={city}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue: any) =>
              this.setState({ city: itemValue })
            }
          >
            {cityData.map((item: any) => {
              return (
                <Picker.Item
                  key={item.id}
                  label={item.city_name}
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>
      </>
    );
  };

  /**
   * Main render
   */
  render() {
    return (
      <>
        <View
          style={{
            width: '50%',
            height: 4,
            backgroundColor: Styles.PrimaryColor,
          }}
        />
        <View
          style={{
            height: Math.round(Dimensions.get('window').height) - 83,
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={styles.headingStyle}>Give title to your Project</Text>

            <AppInput
              onChangeText={(title: string) => {
                this.setState({ title });
              }}
              placeholder={'I need 2 professional photographers for an event'}
              value={this.state.title}
              style={{
                padding: 8,
                height: 40,
                marginTop: 10,
                borderBottomColor: Styles.PrimaryColor2,
                borderBottomWidth: 1,
              }}
            />

            <Text style={{ color: 'silver' }}>
              At least 15 character in the the title.
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.headingStyle}>
                Select location of your project
              </Text>
              <View
                style={{
                  padding: 10,
                  // height: 60,
                }}
              >
                {this._renderLocation()}
              </View>
            </View>
          </View>

          <AppButton
            disabled={
              this.state.title !== '' &&
              this.state.state !== 0 &&
              this.state.city !== 0
                ? false
                : true
            }
            onPress={this.nextHandler}
          >
            NEXT
          </AppButton>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
