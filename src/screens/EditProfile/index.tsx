import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
import {
  AppButton,
  AppModal,
  AppInput,
  SkillBox,
  AppCard,
  Loader,
  BoxText,
} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// eslint-disable-next-line no-unused-vars
import { UserEntity, PortfolioEntity } from '../../modals';

import APIService from '../../utils/APIService';
import RegionList from '../../utils/RegionList';
import { GlobalErr, completeImageUrl } from '../../utils/utils';

import { Styles } from '../../common';

interface Props {
  toReview(userId: any): void;
}

interface State {
  fullName: string;
  about: string;
  showSkillModal: boolean;
  skillData: Array<Data>;
  equipmentsData: Array<object | string>;
  allowEdit: boolean;
  height: any;
  gender: string;
  state: string;
  city: string;
  selectedSkill: string;
  selectedRating: number;
  isLoading: boolean;
  userImage: string;
  imageIndex: number;
  isImageViewVisible: boolean;
  portfolio: Partial<PortfolioEntity>[];
  languagesData: Array<object>;
  ableToTravel: string;
  enteredLanguage: string;
  workExperience: string;
  showDatePicker: boolean;
  showEquipmentsModal: boolean;
  dateOfBirth: string;
  enteredEquipment: string;
  showLanguagesModal: boolean;
  selectedSubCat: Array<any>;
  selectedItems: Array<any>;
}

interface Data {
  value: string;
  rating: number;
}

type Portfolio = {
  portfolio: PortfolioEntity[];
};

type Response = UserEntity & Portfolio;

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

export default class ProfileEdit extends React.PureComponent<Props, State> {
  private combinedCatData: any = [];
  private catData: any = [];
  private subCatData: any = [];
  private userId: string | Promise<string | null> | null | undefined;
  state = {
    fullName: '',
    userImage: '',
    about: '',
    state: 'Select State',
    city: 'Select City',
    selectedSkill: 'Select Skill',
    ableToTravel: 'no',
    enteredLanguage: '',
    workExperience: '',
    gender: 'Male',
    dateOfBirth: 'Nov 3, 1996',
    enteredEquipment: '',

    showSkillModal: false,
    allowEdit: false,
    isLoading: true,
    isImageViewVisible: false,
    showDatePicker: false,
    showEquipmentsModal: false,
    showLanguagesModal: false,

    skillData: [],
    equipmentsData: [],
    portfolio: [],
    languagesData: [],
    selectedItems: [],
    selectedSubCat: [],

    height: 0,
    imageIndex: 0,
    selectedRating: 0,
  };

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    try {
      this.userId = await AsyncStorage.getItem('userId');
      const response: Response = await APIService.sendGetCall(
        '/profile/' + this.userId
      );

      const fullName: string = response.fname.concat(' ', response.lname);

      let state = response.state;
      let city = response.city;
      if (response.state === '' || response.state === null || !state) {
        state = 'Select State';
      }
      if (response.city === '' || response.city === null || !city) {
        city = 'Select City';
      }

      let userImage = response.user_image;
      if (!userImage) {
        userImage = '';
      }
      if (userImage.length > 0) {
        userImage = completeImageUrl(userImage);
      }

      this.catData = catData;
      this.subCatData = subCatData;

      for (let i of this.catData) {
        let childrenArr = [];
        for (let j of this.subCatData) {
          if (i.cat_id === j.cat_id) {
            let subCatObj = {
              id: j.sub_cat_id,
              cat_id: j.cat_id,
              name: j.name,
              status: j.status,
            };
            childrenArr.push(subCatObj);
          }
        }
        let catObj: any = {
          id: i.cat_id,
          name: i.name,
          status: i.status,
          children: childrenArr,
        };
        this.combinedCatData.push(catObj);
      }

      let portfolio: any = response.portfolio;
      if (!portfolio) {
        portfolio = [];
      }

      if (portfolio.length > 0) {
        portfolio.forEach((item: any) => {
          item.image_url = completeImageUrl(item.image_url);
          item.uri = item.image_url;
        });
      }

      let selectedSubCat = response.my_skills;
      if (!selectedSubCat || selectedSubCat === '') {
        selectedSubCat = '[]';
      }

      let equipmentsData = response.my_equipments;
      if (!equipmentsData || equipmentsData === '') {
        equipmentsData = '[]';
      }

      let languagesData = response.languages_known;
      if (!languagesData || languagesData === '') {
        languagesData = '[]';
      }

      this.setState({
        fullName: fullName,
        about: response.about,
        state: state,
        city: city,
        userImage: userImage,
        portfolio: portfolio,
        dateOfBirth: response.dob,
        gender: response.gender,
        workExperience: response.work_experience,
        ableToTravel: response.able_to_travel,
        selectedSubCat: JSON.parse(selectedSubCat),
        equipmentsData: JSON.parse(equipmentsData),
        languagesData: JSON.parse(languagesData),
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      GlobalErr(err);
    }
  };

  _renderImageUpload = () => {
    const { allowEdit } = this.state;
    if (!allowEdit) {
      return;
    }
    const options = {
      title: 'Select Profile Image',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const payload = new FormData();
        payload.append('userImage', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });

        try {
          const apiResponse: UserEntity = await APIService.sendPostCall(
            '/profile/userimage/' + this.userId,
            payload
          );

          if (!apiResponse) {
            return;
          }

          this.setState({
            userImage: response.uri,
          });
        } catch (err) {
          GlobalErr(err);
        }
      }
    });
  };

  _renderPortfolioUpload = () => {
    const { allowEdit } = this.state;
    if (!allowEdit) {
      return;
    }
    const options = {
      title: 'Select Portfolio Image',
      noData: true,
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const payload = new FormData();
        payload.append('portfolioImage', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        payload.append('userId', this.userId);

        try {
          const apiResponse: PortfolioEntity = await APIService.sendPostCall(
            '/profile/portfolio',
            payload
          );

          if (!apiResponse) {
            Alert.alert(
              'Alert',
              'Image upload failed. Please try again later!'
            );
            return;
          }

          const imageObj = {
            portfolio_id: apiResponse.portfolio_id,
            image_url: completeImageUrl(apiResponse.image_url),
            uri: completeImageUrl(apiResponse.image_url),
            image_name: apiResponse.image_name,
          };

          this.setState({
            portfolio: [imageObj, ...this.state.portfolio],
          });
        } catch (err) {
          GlobalErr(err);
        }
      }
    });
  };

  _renderProfileImage = () => {
    const { allowEdit, userImage } = this.state;
    let buttonText = '';
    if (allowEdit) {
      buttonText = 'Save Profile';
    } else {
      buttonText = 'Edit Profile';
    }
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          Styles.PrimaryColor2,
          Styles.PrimaryColor,
          Styles.PrimaryColor3,
        ]}
        style={{ flex: 1 }}
      >
        <View style={{ justifyContent: 'center', height: 290 }}>
          <View
            style={{
              height: 245,
              paddingTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableWithoutFeedback onPress={this._renderImageUpload}>
              <Avatar
                rounded
                size={'xlarge'}
                source={
                  userImage === ''
                    ? require('../../Images/avatar.png')
                    : { uri: userImage }
                }
                showEditButton={allowEdit}
              />
            </TouchableWithoutFeedback>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                paddingTop: 10,
              }}
            >
              {this.state.fullName}
            </Text>
          </View>

          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
            onPress={this.saveHandler}
          >
            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'white',
                padding: 5,
                margin: 5,
              }}
            >
              <Text style={{ color: 'white' }}>{buttonText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  _renderPortfolio = () => {
    const { portfolio, allowEdit } = this.state;
    if (portfolio.length === 0) {
      return (
        <>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 10 }}>
              Portfolio
            </Text>
            {allowEdit ? (
              <TouchableOpacity
                onPress={this._renderPortfolioUpload}
                style={{ justifyContent: 'center', margin: 10 }}
              >
                <Icon
                  name="cloud-upload"
                  size={30}
                  color={Styles.PrimaryColor}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              height: 205,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Images!</Text>
          </View>
        </>
      );
    }
    return (
      <AppCard style={{ overflow: 'visible' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Portfolio</Text>
          {allowEdit ? (
            <TouchableOpacity
              onPress={this._renderPortfolioUpload}
              style={{ justifyContent: 'center' }}
            >
              <Icon name="cloud-upload" size={30} color={Styles.PrimaryColor} />
            </TouchableOpacity>
          ) : null}
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.portfolioStyle}
          data={portfolio}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: any) => (
            <View>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  this.setState({
                    imageIndex: index,
                    isImageViewVisible: true,
                  });
                }}
              >
                <View>
                  {allowEdit ? (
                    <TouchableOpacity
                      onPress={async () => {
                        this.setState({ isLoading: true });
                        const response = await APIService.sendDelCall(
                          '/profile/portfolio/' + item.portfolio_id
                        );
                        //Need negative testing
                        if (!response) {
                          return;
                        }
                        this.setState({
                          portfolio: portfolio.filter(
                            (newItem, newIndex) => index !== newIndex
                          ),
                          isLoading: false,
                        });
                      }}
                      style={[styles.crossIconStyle]}
                    >
                      <Icon name="close" size={35} color="white" />
                    </TouchableOpacity>
                  ) : null}
                  <Image
                    style={{
                      width: 300,
                      height: 200,
                      borderRadius: 30,
                    }}
                    source={{ uri: item.image_url }}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </AppCard>
    );
  };

  /**
   * async function for API call and save data to local and server
   */
  saveHandler = async () => {
    const {
      allowEdit,
      about,
      state,
      city,
      dateOfBirth,
      workExperience,
      ableToTravel,
      selectedSubCat,
      equipmentsData,
      languagesData,
    } = this.state;
    if (allowEdit) {
      try {
        this.setState(
          {
            isLoading: true,
          },
          async () => {
            const payload = {
              about: about,
              state: state,
              city: city,
              // portfolio:portfolio,portfolio will have different API
              dateOfBirth: dateOfBirth,
              workExperience: workExperience,
              ableToTravel: ableToTravel,
              mySkills: selectedSubCat,
              myEquipments: equipmentsData,
              languagesKnown: languagesData,
            };

            const response = await APIService.sendPatchCall(
              '/profile/' + this.userId,
              payload
            );

            this.setState({
              allowEdit: false,
              isLoading: false,
            });
            if (!response) {
              return;
            }
            Alert.alert('Alert', response.message);
          }
        );
      } catch (err) {
        GlobalErr(err);
        this.setState({
          allowEdit: false,
          isLoading: false,
        });
      }
    } else {
      this.setState({
        allowEdit: true,
      });
    }
  };

  _renderAbout = () => {
    const { about, allowEdit, height } = this.state;
    return (
      <AppCard>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>About</Text>
        {allowEdit ? (
          <AppInput
            style={{ height: height }}
            placeholder={'Tell people about yourself'}
            multiline={true}
            onChangeText={(about: string) => {
              this.setState({
                about: about,
              });
            }}
            onContentSizeChange={(event: any) => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
            value={about}
          />
        ) : (
          <View style={{ margin: 6 }}>
            <Text>{this.state.about}</Text>
          </View>
        )}
      </AppCard>
    );
  };

  // _renderGender = () => {
  // let male = false;
  // let female = false;
  // const { allowEdit, gender } = this.state;
  // if (gender.toUpperCase() === 'MALE') {
  //   male = true;
  //   female = false;
  // } else if (gender.toUpperCase() === 'FEMALE') {
  //   male = false;
  //   female = true;
  // }
  //   return (
  //     <AppCard>
  //       <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Gender</Text>

  // <View style={{ flexDirection: 'row' }}>
  //   <CheckBox
  //     onPress={() => {
  //       if (!allowEdit) {
  //         return;
  //       }
  //       this.setState({
  //         gender: 'male'
  //       });
  //     }}
  //     title={'Male'}
  //     checkedIcon="dot-circle-o"
  //     uncheckedIcon="circle-o"
  //     checked={male}
  //   />
  //   <CheckBox
  //     onPress={() => {
  //       if (!allowEdit) {
  //         return;
  //       }
  //       this.setState({
  //         gender: 'female'
  //       });
  //     }}
  //     title={'Female'}
  //     checkedIcon="dot-circle-o"
  //     uncheckedIcon="circle-o"
  //     checked={female}
  //   />
  // </View>
  //     </AppCard>
  //   );
  // };

  _renderLocation = () => {
    const { state, allowEdit, city } = this.state;
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
      <AppCard>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Location</Text>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingStyle}>State</Text>
          {allowEdit ? (
            <Picker
              selectedValue={state}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue: any) =>
                this.setState({ state: itemValue })
              }
              mode="dropdown"
            >
              {onlyState.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />;
              })}
            </Picker>
          ) : (
            <View style={{ margin: 6 }}>
              <Text style={{ fontSize: 16 }}>{state}</Text>
            </View>
          )}

          <Text style={styles.headingStyle}>City</Text>
          {allowEdit ? (
            <Picker
              selectedValue={city}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue: any) =>
                this.setState({ city: itemValue })
              }
              mode="dropdown"
            >
              {onlyCity.map(
                (item: string, index: string | number | undefined) => {
                  return <Picker.Item key={index} label={item} value={item} />;
                }
              )}
            </Picker>
          ) : (
            <View style={{ margin: 6 }}>
              <Text style={{ fontSize: 16 }}>{city}</Text>
            </View>
          )}
        </View>
      </AppCard>
    );
  };

  // _renderName = () => {
  //   return (
  //     <View style={styles.cardStyle}>
  //       <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Location</Text>
  //       <AppInput
  //         style={styles.inputStyle}
  //         editable={false}
  //         value={this.state.fullName}
  //         onChangeText={(name: string) => {
  //           this.setState({
  //             fullName: name
  //           });
  //         }}
  //       />
  //     </View>
  //   );
  // };

  _renderSkillSection = () => {
    const { allowEdit, selectedSubCat } = this.state;
    const filteredSubCat = [];
    for (let i of selectedSubCat) {
      for (let j of this.subCatData) {
        if (j.sub_cat_id === i) {
          filteredSubCat.push(j);
        }
      }
    }
    return (
      <View style={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>My Skills</Text>
          {allowEdit ? (
            <AppButton
              buttonType="clear"
              onPress={() => {
                this.setState({ showSkillModal: true });
              }}
            >
              ADD
            </AppButton>
          ) : null}
        </View>
        {filteredSubCat.length === 0 ? (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Skills</Text>
          </View>
        ) : (
          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            {filteredSubCat.map((item, index) => {
              return (
                <BoxText
                  size={16}
                  key={item.sub_cat_id}
                  text={item.name}
                  showCross={allowEdit}
                  onPress={() => {
                    this.setState({
                      selectedSubCat: this.state.selectedSubCat.filter(
                        (newItem, newIndex) => newIndex !== index
                      ),
                    });
                  }}
                />
              );
            })}
          </View>
        )}
      </View>
    );
  };

  _renderSkillModal = () => {
    const { selectedSubCat } = this.state;
    return (
      <AppModal
        onRequestClose={() => this.setState({ showSkillModal: false })}
        visible={this.state.showSkillModal}
      >
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
            <View>
              <SectionedMultiSelect
                items={this.combinedCatData}
                uniqueKey="id"
                subKey="children"
                selectText="Choose Skill..."
                showDropDowns={false}
                readOnlyHeadings={true}
                onSelectedItemsChange={(selectedSubCat) =>
                  this.setState({ selectedSubCat })
                }
                selectedItems={this.state.selectedSubCat}
              />
            </View>
          </View>

          {selectedSubCat.length !== 0 ? (
            <AppButton
              style={{ margin: 10 }}
              onPress={() => {
                this.setState({
                  showSkillModal: false,
                });
              }}
            >
              DONE
            </AppButton>
          ) : null}
        </View>
      </AppModal>
    );
  };

  _renderEquipmentsSection = () => {
    const { allowEdit, equipmentsData } = this.state;
    return (
      <View style={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            My Equipments
          </Text>
          {allowEdit ? (
            <AppButton
              buttonType="clear"
              onPress={() => {
                this.setState({ showEquipmentsModal: true });
              }}
            >
              ADD
            </AppButton>
          ) : null}
        </View>
        {equipmentsData.length === 0 ? (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No EquipmentsData</Text>
          </View>
        ) : (
          equipmentsData.map((item: any, index: number) => {
            return (
              <SkillBox
                key={index}
                value={item.value}
                level={item.rating}
                showCross={this.state.allowEdit}
                onCrossPress={() => {
                  this.setState({
                    equipmentsData: this.state.equipmentsData.filter(
                      (item, newIndex) => {
                        return index !== newIndex;
                      }
                    ),
                  });
                }}
              />
            );
          })
        )}
      </View>
    );
  };

  _renderEquipmentsModal = () => {
    const { enteredEquipment, selectedRating } = this.state;
    return (
      <AppModal
        onRequestClose={() => this.setState({ showEquipmentsModal: false })}
        visible={this.state.showEquipmentsModal}
      >
        <View style={styles.modalContainer}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headingStyle}>
                Please Enter Name of Equipments.
              </Text>
              <AppButton
                style={{ backgroundColor: 'white' }}
                onPress={() => {
                  this.setState({ showEquipmentsModal: false });
                }}
              >
                <Icon name={'close'} size={20} color={Styles.PrimaryColor} />
              </AppButton>
            </View>
            <View style={{ alignItems: 'center' }}>
              <AppInput
                value={enteredEquipment}
                onChangeText={(enteredEquipment: string) => {
                  this.setState({ enteredEquipment });
                }}
                placeholder="Enter Name of Equipment"
                style={styles.modalInput}
              />
            </View>

            {enteredEquipment !== '' ? (
              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.headingStyle}>
                    Please Enter Your Proficiency on Equipment.
                  </Text>
                </View>
                <View style={{ margin: 10 }}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={30}
                    startingValue={selectedRating}
                    onFinishRating={(selectedRating: number) => {
                      this.setState({ selectedRating });
                    }}
                  />
                </View>
              </View>
            ) : null}
          </View>
          {selectedRating !== 0 && enteredEquipment !== '' ? (
            <AppButton
              style={{ margin: 10 }}
              onPress={() => {
                if (this.state.equipmentsData.length === 3) {
                  Alert.alert(
                    'Alert',
                    'Equipment selection limit has reached, Please remove old equipment to add new.'
                  );
                  return;
                }
                let equipmentsObj = {
                  value: this.state.enteredEquipment,
                  rating: this.state.selectedRating,
                };

                this.setState({
                  equipmentsData: [equipmentsObj, ...this.state.equipmentsData],
                  enteredEquipment: '',
                  selectedRating: 0,
                });
              }}
            >
              ADD
            </AppButton>
          ) : null}
        </View>
      </AppModal>
    );
  };

  _renderOthers = () => {
    const {
      allowEdit,
      workExperience,
      gender,
      dateOfBirth,
      ableToTravel,
    } = this.state;
    const ableToTravelData = ['No', 'Yes'];
    return (
      <AppCard>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Others</Text>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.headingStyle}>Date of Birth</Text>
          {allowEdit ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({ showDatePicker: true });
              }}
              style={{ margin: 6 }}
            >
              <Text style={{ fontSize: 16 }}>{dateOfBirth}</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ margin: 6 }}>
              <Text style={{ fontSize: 16 }}>{dateOfBirth}</Text>
            </View>
          )}
          <Text style={styles.headingStyle}>Gender</Text>
          {allowEdit ? (
            <Picker
              selectedValue={gender}
              style={{ height: 50, width: 110 }}
              onValueChange={(gender: string) => this.setState({ gender })}
            >
              <Picker.Item key={1} label={'Male'} value={'Male'} />
              <Picker.Item key={1} label={'Female'} value={'Female'} />
            </Picker>
          ) : (
            <View style={{ margin: 6 }}>
              <Text style={{ fontSize: 16 }}>{gender}</Text>
            </View>
          )}
          <Text style={styles.headingStyle}>Work Experience</Text>
          {allowEdit ? (
            <AppInput
              placeholder={'Ex:- 1 year 3 months'}
              onChangeText={(workExperience: string) => {
                this.setState({ workExperience });
              }}
              value={workExperience}
              maxLength={20}
            />
          ) : (
            <View style={{ margin: 6 }}>
              <Text style={{ fontSize: 16 }}>{workExperience}</Text>
            </View>
          )}
          <Text style={styles.headingStyle}>Able to Travel</Text>
          {allowEdit ? (
            <Picker
              selectedValue={ableToTravel}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue: string) =>
                this.setState({ ableToTravel: itemValue })
              }
            >
              {ableToTravelData.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />;
              })}
            </Picker>
          ) : (
            <View style={{ margin: 6 }}>
              <Text style={{ fontSize: 16 }}>{ableToTravel}</Text>
            </View>
          )}
        </View>
      </AppCard>
    );
  };

  _renderLanguagesSection = () => {
    const { allowEdit, languagesData } = this.state;
    return (
      <View style={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Languages Known
          </Text>
          {allowEdit ? (
            <AppButton
              buttonType="clear"
              onPress={() => {
                this.setState({ showLanguagesModal: true });
              }}
            >
              ADD
            </AppButton>
          ) : null}
        </View>
        {languagesData.length === 0 ? (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Languages</Text>
          </View>
        ) : (
          languagesData.map((item: any, index: number) => {
            return (
              <SkillBox
                key={index}
                value={item.value}
                level={item.rating}
                showCross={this.state.allowEdit}
                onCrossPress={() => {
                  this.setState({
                    languagesData: this.state.languagesData.filter(
                      (item, newIndex) => {
                        return index !== newIndex;
                      }
                    ),
                  });
                }}
              />
            );
          })
        )}
      </View>
    );
  };

  _renderLanguagesModal = () => {
    const { enteredLanguage, selectedRating } = this.state;
    return (
      <AppModal
        onRequestClose={() => this.setState({ showLanguagesModal: false })}
        visible={this.state.showLanguagesModal}
      >
        <View style={styles.modalContainer}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headingStyle}>Please Enter Language.</Text>
              <AppButton
                style={{ backgroundColor: 'white' }}
                onPress={() => {
                  this.setState({
                    showLanguagesModal: false,
                    selectedRating: 0,
                  });
                }}
              >
                <Icon name={'close'} size={20} color={Styles.PrimaryColor} />
              </AppButton>
            </View>
            <View style={{ alignItems: 'center' }}>
              <AppInput
                value={enteredLanguage}
                onChangeText={(enteredLanguage: string) => {
                  this.setState({ enteredLanguage });
                }}
                placeholder="Ex:- English."
                maxLength={10}
                style={styles.modalInput}
              />
            </View>

            {enteredLanguage !== '' ? (
              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.headingStyle}>
                    Please Enter Your Proficiency on Language.
                  </Text>
                </View>
                <View style={{ margin: 10 }}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={30}
                    startingValue={selectedRating}
                    onFinishRating={(selectedRating: number) => {
                      this.setState({ selectedRating });
                    }}
                  />
                </View>
              </View>
            ) : null}
          </View>
          {selectedRating !== 0 && enteredLanguage !== '' ? (
            <AppButton
              style={{ margin: 10 }}
              onPress={() => {
                if (this.state.languagesData.length === 3) {
                  Alert.alert(
                    'Alert',
                    'Language selection limit has reached, Please remove old Languages to add new.'
                  );
                  return;
                }
                const languageObj = {
                  value: this.state.enteredLanguage,
                  rating: this.state.selectedRating,
                };

                this.setState({
                  languagesData: [languageObj, ...this.state.languagesData],
                  enteredLanguage: '',
                  selectedRating: 0,
                });
              }}
            >
              ADD
            </AppButton>
          ) : null}
        </View>
      </AppModal>
    );
  };

  _renderCheckReviews = () => {
    const { toReview } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          toReview(this.userId);
        }}
      >
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: Styles.PrimaryColor2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
              paddingLeft: 10,
            }}
          >
            Check Reviews
          </Text>
          <Icon
            style={{ paddingRight: 10 }}
            name="arrow-right-circle"
            color="white"
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      isLoading,
      showDatePicker,
      dateOfBirth,
      portfolio,
      imageIndex,
      isImageViewVisible,
    } = this.state;
    return (
      <ScrollView scrollEnabled={!isLoading}>
        {this._renderSkillModal()}
        {this._renderEquipmentsModal()}
        {this._renderLanguagesModal()}
        {this._renderProfileImage()}
        {this._renderPortfolio()}
        {this._renderAbout()}
        {this._renderLocation()}
        {this._renderSkillSection()}
        {this._renderEquipmentsSection()}
        {this._renderOthers()}
        {this._renderLanguagesSection()}
        <ImageView
          images={portfolio}
          imageIndex={imageIndex}
          animationType="slide"
          visible={isImageViewVisible}
          onRequestClose={() => this.setState({ isImageViewVisible: false })}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(dateOfBirth)}
            mode={'date'}
            display="default"
            onChange={(event, selectedDate) => {
              if (event.type !== 'dismissed') {
                this.setState({
                  dateOfBirth: Moment(selectedDate).format('MMM DD, YYYY'),
                  showDatePicker: false,
                });
              }
              this.setState({ showDatePicker: false });
            }}
          />
        )}
        {this._renderCheckReviews()}
        <Loader visible={isLoading} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 8,
    elevation: 2,
  },
  cardStyle: {
    padding: 8,
    margin: 5,
    backgroundColor: 'white',
    elevation: 1,
  },
  inputStyle: {
    borderWidth: 1,
  },
  buttonStyle: {
    backgroundColor: 'white',
  },
  headingStyle: { fontSize: 18 },
  crossIconStyle: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    margin: 10,
  },
  portfolioStyle: {
    height: 205,
    marginTop: 5,
  },
  modalContainer: { padding: 10, flex: 1, justifyContent: 'space-between' },
  modalInput: { textAlign: 'center' },
});
