import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Moment from 'moment'

import { AppInput, AppButton } from '../../components';
import Globals from '../../utils/Globals';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

import { Styles } from '../../common';

interface Props {
  toProject: any;
}

interface State {
  budget: string;
  checked: boolean;
}

export default class PostProject4 extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      budget: '',
      checked: false,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = () => {
    this.setState({
      budget: Globals.PostProject.budget,
    });
  };

  _renderSkill = () => {
    return <View />;
  };

  /**
   * handle the button request
   */
  nextHandler = () => {
    const { toProject } = this.props;
    const { budget } = this.state;

    Globals.PostProject.budget = budget;

    let params = {
      title: Globals.PostProject.title,
      detail: Globals.PostProject.detail,
      category: Globals.PostProject.category,
      state: Globals.PostProject.state,
      city: Globals.PostProject.city,
      budget: parseInt(Globals.PostProject.budget),
      validity: Moment().add(7,'d'),
      status: Globals.PostProject.status,
      // type: Globals.PostProject.type,
      requireSkills: Globals.PostProject.skills,
      createdAt: Moment(),
    };
    console.log('params', params);

    try {
      const response = APIService.sendPutCall('project/create', params);
      console.log('res', response);
      toProject();
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
            height: Math.round(Dimensions.get('window').height - 83),
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={styles.headingStyle}>Set a budget..</Text>
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
            <View style={{ marginTop: 20 }}>
              <CheckBox
                title="I have read and agree to Terms & Condition."
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />

              <View style={{ padding: 10 }}>{this._renderSkill()}</View>
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
