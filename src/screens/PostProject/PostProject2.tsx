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
import RegionList from '../../utils/RegionList';

import { Styles } from '../../common';

interface Props {
  toPostProject3(): void;
}

interface State {
  title: string;
  state: string;
  city: string;
}

export default class PostProject2 extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      state: '',
      city: '',
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    this.setState({
      title: Globals.PostProject.title,
      state: Globals.PostProject.state,
      city: Globals.PostProject.city,
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
    const { state, city } = this.state;
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
      <>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingStyle}>State</Text>

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

          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>City</Text>

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
              this.state.state !== 'Select State' &&
              this.state.city !== 'Select City' &&
              this.state.state !== '' &&
              this.state.city !== ''
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
