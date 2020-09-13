import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { AppInput, AppButton, AppModal, BoxText } from '../../components';
import Globals from '../../utils/Globals';
import { catData, subCatData, combinedCatData } from '../../utils/utils';

import { Styles } from '../../common';
import { CheckBox } from 'react-native-elements';

interface Props {
  toPostProject4: any;
}

interface State {
  detail: string;
  skillData: any;
  showSkillModal: boolean;
  combinedCatData: Array<any>;
}

export default class PostProject3 extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: '',
      skillData: [],
      showSkillModal: false,
      combinedCatData: [],
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = () => {
    const combinedData = combinedCatData(catData, subCatData);
    this.setState({
      detail: Globals.PostProject.detail,
      skillData: Globals.PostProject.skills,
      combinedCatData: combinedData,
    });
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
          return <BoxText size={14} key={index} text={item} />;
        })}
      </View>
    );
  };

  // * handle the button request
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

  // * Skill Modal
  _renderSkillModal = () => {
    const { skillData } = this.state;
    return (
      <AppModal
        onRequestClose={() => this.setState({ showSkillModal: false })}
        visible={this.state.showSkillModal}
      >
        <View style={styles.modalContainer}>
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
          <FlatList
            data={this.state.combinedCatData}
            style={{ flex: 1 }}
            keyExtractor={(item: any) => item.cat_id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => (
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                {item.children.map(
                  (
                    childItem: {
                      name: React.ReactNode;
                      status: boolean;
                      sub_cat_id: number;
                      cat_id: number;
                    },
                    childIndex: React.ReactText
                  ) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      key={childItem.sub_cat_id}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'grey',
                          paddingLeft: 5,
                        }}
                      >
                        {childItem.name}
                      </Text>
                      <CheckBox
                        checkedColor="green"
                        onPress={() => {
                          const combinedCatData: any = [
                            ...this.state.combinedCatData,
                          ];
                          combinedCatData[index].children[
                            childIndex
                          ].status = !childItem.status;
                          if (
                            combinedCatData[index].children[childIndex].status
                          ) {
                            this.setState({
                              combinedCatData: combinedCatData,
                              skillData: [
                                ...this.state.skillData,
                                combinedCatData[index].children[childIndex]
                                  .name,
                              ],
                            });
                          } else {
                            this.setState({
                              combinedCatData: combinedCatData,
                              skillData: this.state.skillData.filter(
                                (item: any) =>
                                  item !==
                                  combinedCatData[index].children[childIndex]
                                    .name
                              ),
                            });
                          }
                        }}
                        checked={childItem.status}
                      />
                    </View>
                  )
                )}
              </View>
            )}
          />

          <AppButton
            disabled={skillData.length !== 0 ? false : true}
            onPress={() => {
              this.setState({
                showSkillModal: false,
              });
            }}
          >
            DONE
          </AppButton>
        </View>
      </AppModal>
    );
  };

  // * Main Render
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
