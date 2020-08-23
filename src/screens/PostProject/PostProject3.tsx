import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { AppInput, AppButton, AppModal, BoxText } from '../../components';
import Globals from '../../utils/Globals';

import { Styles } from '../../common';

interface Props {
  toPostProject4: any;
}

interface State {
  detail: string;
  skillData: any;
  showSkillModal: boolean;
  selectedSkillIds: any;
}

const catData = [
  { cat_id: 0, name: 'Select Category', status: 0 },
  { cat_id: 1, name: 'Photography', status: 0 },
  { cat_id: 2, name: 'Videography', status: 0 },
  { cat_id: 3, name: 'Wedding Planning', status: 0 },
  { cat_id: 4, name: 'Makeup Artist', status: 0 },
  { cat_id: 5, name: 'Decoration', status: 0 },
  { cat_id: 6, name: 'Choreography', status: 0 },
  { cat_id: 7, name: 'Astrology', status: 0 },
  { cat_id: 8, name: 'Entertainment', status: 0 },
];
const subCatData = [
  { sub_cat_id: 1, cat_id: 1, name: 'Still', status: 0 },
  { sub_cat_id: 2, cat_id: 1, name: 'Videograph', status: 0 },
  { sub_cat_id: 3, cat_id: 1, name: 'Wedding Planners', status: 0 },
  { sub_cat_id: 4, cat_id: 1, name: 'Makeup Artist', status: 0 },
  { sub_cat_id: 5, cat_id: 2, name: 'Decorators', status: 0 },
  { sub_cat_id: 6, cat_id: 2, name: 'Choreographers', status: 0 },
  { sub_cat_id: 7, cat_id: 2, name: 'Astrologers', status: 0 },
  { sub_cat_id: 8, cat_id: 3, name: 'Entertainers', status: 0 },
];

export default class PostProject3 extends React.PureComponent<Props, State> {
  private combinedCatData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      detail: '',
      skillData: [],
      showSkillModal: false,
      selectedSkillIds: [],
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

    for (let i of catData) {
      const childrenArr = [];
      for (let j of subCatData) {
        if (i.cat_id === j.cat_id) {
          const subCatObj = {
            id: j.sub_cat_id,
            cat_id: j.cat_id,
            name: j.name,
            status: j.status,
          };
          childrenArr.push(subCatObj);
        }
      }
      const catObj: any = {
        id: i.cat_id,
        name: i.name,
        status: i.status,
        children: childrenArr,
      };
      this.combinedCatData.push(catObj);
    }
  };

  _renderSkill = () => {
    const { skillData } = this.state;
    return (
      <View
        style={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}
      >
        {skillData.map((item: string, index: string | number | undefined) => {
          return (
            <BoxText
              size={16}
              key={index}
              text={item}
              onPress={() => {
                this.setState({
                  selectedSkillIds: this.state.selectedSkillIds.filter(
                    (newItem: any, newIndex: string | number | undefined) =>
                      newIndex !== index
                  ),
                });
              }}
            />
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

    if (detail.length < 100 || detail.length > 800) {
      Alert.alert(
        'Alert',
        'Please provide at least 100 - 800 characters to your project details'
      );
      return;
    }
    Globals.PostProject.detail = detail;
    Globals.PostProject.skills = skillData;

    toPostProject4();
  };

  /**
   * Skill Modal
   */
  _renderSkillModal = () => {
    const { selectedSkillIds } = this.state;
    return (
      <AppModal visible={this.state.showSkillModal}>
        <View style={styles.modalContainer}>
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

            <SectionedMultiSelect
              items={this.combinedCatData}
              uniqueKey="id"
              subKey="children"
              selectText="Choose Skill..."
              showDropDowns={false}
              readOnlyHeadings={true}
              onSelectedItemsChange={(selectedSkillIds) =>
                this.setState({ selectedSkillIds })
              }
              selectedItems={this.state.selectedSkillIds}
            />
          </View>

          <AppButton
            disabled={selectedSkillIds.length !== 0 ? false : true}
            onPress={() => {
              if (this.state.skillData.length === 10) {
                Alert.alert('Alert', 'Skill selection limit has reached');
                return;
              }
              const selectedSkills = [];
              for (let i of this.state.selectedSkillIds) {
                for (let j of subCatData) {
                  if (j.sub_cat_id === i) {
                    selectedSkills.push(j.name);
                  }
                }
              }

              this.setState({
                skillData: selectedSkills,
                showSkillModal: false,
              });
            }}
          >
            ADD
          </AppButton>
        </View>
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
  modalContainer: { padding: 10, flex: 1, justifyContent: 'space-between' },
});
