import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { AppInput, AppButton, Spinner } from '../../components';
import Globals from '../../utils/Globals';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

import { Styles } from '../../common';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  toProject(): void;
}

interface State {
  budget: string;
  reqOn: string;
  checked: boolean;
  showDatePicker: boolean;
  isLoading: boolean;
}

export default class PostProject4 extends React.PureComponent<Props, State> {
  userId: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      budget: '',
      reqOn: moment()
        .add(5, 'days')
        .format('MMM DD, YYYY'),

      checked: false,
      showDatePicker: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    this.userId = await AsyncStorage.getItem('userId');
  };

  _renderSkill = () => {
    return <View />;
  };

  /**
   * handle the button request
   */
  nextHandler = () => {
    const { toProject } = this.props;
    const { budget, reqOn } = this.state;

    this.setState({ isLoading: true });

    Globals.PostProject.budget = budget;
    Globals.PostProject.reqOn = reqOn;

    const payload = {
      categoryId: Globals.PostProject.categoryId,
      projectTitle: Globals.PostProject.title,
      projectDescription: Globals.PostProject.detail,
      projectStatus: Globals.PostProject.status,
      ownerId: parseInt(this.userId),
      reqSkills: Globals.PostProject.skills,
      reqOn: Globals.PostProject.reqOn,
      state: Globals.PostProject.state,
      city: Globals.PostProject.city,
      budget: parseInt(Globals.PostProject.budget),
    };

    try {
      const response: any = APIService.sendPutCall('project/create', payload);
      this.setState({ isLoading: false });
      if (!response) {
        return;
      }
      Alert.alert(
        'Congrats!',
        response.message,
        [{ text: 'OK', onPress: () => toProject() }],
        { cancelable: false }
      );
    } catch (err) {
      GlobalErr(err);
    }
  };

  /**
   * main render
   */
  render() {
    return (
      <>
        <View
          style={{
            width: '100%',
            height: 4,
            backgroundColor: Styles.PrimaryColor,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 10,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={styles.headingStyle}>Set a budget.</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      padding: 8,
                      height: 52,
                      borderBottomColor: Styles.PrimaryColor2,
                      borderBottomWidth: 1,
                      width: 70,
                    }}
                  >
                    <AppInput
                      onChangeText={(budget: string) => {
                        this.setState({ budget });
                      }}
                      placeholder={'10000'}
                      value={this.state.budget}
                      style={{ height: 120 }}
                      keyboardType={'numeric'}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 40,
                    }}
                  >
                    <Text style={{ color: Styles.PrimaryColor2, fontSize: 16 }}>
                      INR
                    </Text>
                  </View>
                </View>
                <Text style={{ color: 'silver' }}>Minimum 500.</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.headingStyle}>Requirement Date.</Text>
                <TouchableOpacity
                  style={{
                    padding: 8,
                    height: 52,
                    borderBottomColor: Styles.PrimaryColor2,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({ showDatePicker: true });
                  }}
                >
                  <Text style={{ color: Styles.PrimaryColor2 }}>
                    {this.state.reqOn}
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: 'silver' }}>Select Date.</Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <CheckBox
                title="I have read and agree to Terms & Condition."
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />

              <View style={{ padding: 10 }}>{this._renderSkill()}</View>
            </View>
          </View>
        </View>
        <AppButton
          disabled={
            parseInt(this.state.budget) >= 500 && this.state.checked
              ? false
              : true
          }
          onPress={this.nextHandler}
        >
          DONE
        </AppButton>
        {this.state.showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'date'}
            display="default"
            onChange={(event, selectedDate) => {
              if (event.type !== 'dismissed') {
                console.log('selected Date', typeof selectedDate);
                if (
                  selectedDate &&
                  selectedDate.toISOString() < moment().toISOString()
                ) {
                  Alert.alert(
                    'Alert',
                    'Past date cannot be considered as requirement date!'
                  );
                  return;
                }
                this.setState({
                  reqOn: moment(selectedDate).format('MMM DD, YYYY'),
                  showDatePicker: false,
                });
              }
              this.setState({ showDatePicker: false });
            }}
          />
        )}
        {this.state.isLoading ? (
          <Spinner mode="overlay" size="large" color="white" />
        ) : null}
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
