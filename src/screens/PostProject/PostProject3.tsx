import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Picker,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { AppInput, AppButton, AppModal, AppCard } from '../../components';
import Globals from '../../utils/Globals';

import { Styles } from '../../common';

interface Props {
  toPostProject4: any;
}

interface State {
  detail: string;
  skillData: Array<string | object>;
  showSkillModal: boolean;
  selectedSkill: string;
}

const skillList = [
  'Select Skill',
  'TickTock Photography',
  'Marriage Photography',
  'Personal PhotoShoot',
];

export default class PostProject3 extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: '',
      skillData: [],
      showSkillModal: false,
      selectedSkill: 'Select Skill',
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = () => {
    this.setState({
      detail: Globals.PostProject.detail,
      skillData: Globals.PostProject.skills,
    });
  };

  _renderSkill = () => {
    const { skillData } = this.state;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {skillData.map((item, index) => {
          return (
            <View
              style={{
                borderRadius: 5,
                borderColor: Styles.PrimaryColor2,
                borderWidth: 1,
                // margin: 4,
                padding: 2,
              }}
              key={index}
            >
              <Text style={{ fontSize: 10, color: Styles.PrimaryColor2 }}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  /**
   * handle the button request
   */
  nextHandler = () => {
    const { toPostProject4 } = this.props;
    const { detail, skillData } = this.state;

    if (detail.length < 15) {
      Alert.alert(
        'Alert',
        'Please provide at least 150 characters to your project details'
      );
      return;
    }
    if (detail.length > 800) {
      Alert.alert('Alert', 'Detail is too long!');
      return;
    }
    Globals.PostProject.detail = detail;
    Globals.PostProject.skills = skillData;
    // Globals.PostProject. = state;
    // Globals.PostProject.city = city;

    console.log(Globals.PostProject.detail);
    toPostProject4();
  };

  /**
   * Skill Modal
   */
  _renderSkillModal = () => {
    const { selectedSkill } = this.state;
    return (
      <AppModal visible={this.state.showSkillModal}>
        <AppCard>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headingStyle}>Please Select Skill.</Text>
              <AppButton
                style={{ backgroundColor: 'white' }}
                onPress={() => {
                  this.setState({ showSkillModal: false });
                }}
              >
                <Icon name={'close'} size={20} color={Styles.PrimaryColor} />
              </AppButton>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Picker
                selectedValue={selectedSkill}
                style={{ height: 50, width: 250 }}
                onValueChange={(itemValue: any) =>
                  this.setState({ selectedSkill: itemValue })
                }
              >
                {skillList.map(
                  (item: string, index: string | number | undefined) => {
                    return (
                      <Picker.Item key={index} label={item} value={item} />
                    );
                  }
                )}
              </Picker>
            </View>

            <AppButton
              disabled={selectedSkill !== 'Select Skill' ? false : true}
              onPress={() => {
                if (this.state.skillData.length === 10) {
                  Alert.alert('Alert', 'Skill selection limit has reached');
                  return;
                }
                let selectedSkill = this.state.selectedSkill;

                this.setState({
                  skillData: [selectedSkill, ...this.state.skillData],
                  selectedSkill: 'Select Skill',
                });
              }}
            >
              ADD
            </AppButton>
          </View>
        </AppCard>
      </AppModal>
    );
  };

  /**
   * main render
   */
  render() {
    return (
      <>
        <View
          style={{
            width: '75%',
            height: 4,
            backgroundColor: Styles.PrimaryColor,
          }}
        />
        {this._renderSkillModal()}
        <View
          style={{
            height: Math.round(Dimensions.get('window').height) - 83,
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={styles.headingStyle}>Give Detail of your Project</Text>
            <View
              style={{
                padding: 8,
                height: 140,
                borderBottomColor: Styles.PrimaryColor2,
                borderBottomWidth: 1,
              }}
            >
              <AppInput
                multiline={true}
                onChangeText={(detail: string) => {
                  this.setState({ detail });
                }}
                placeholder={'I need 2 professional photographers for an event'}
                value={this.state.detail}
                style={{ height: 120 }}
              />
            </View>
            <Text style={{ color: 'silver' }}>
              At least 200 character in the the detail.
            </Text>
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.headingStyle}>
                  Add required skills for your project.
                </Text>
                <AppButton
                  onPress={() => this.setState({ showSkillModal: true })}
                >
                  Add
                </AppButton>
              </View>
              {this._renderSkill()}
            </View>
          </View>

          <AppButton
            disabled={
              this.state.detail !== '' && this.state.skillData.length !== 0
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
