import React from 'react';
import Category from '../screens/Category';

import { HeaderRight } from '../components';

import { Styles } from '../common';

type Props = {
  navigation: any;
  onProjectPress: any;
};

export default class CategoryScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: navigation.getParam('category'),
    headerTitleStyle: Styles.AppHeaderStyle.textStyle,
    headerTintColor: Styles.AppHeaderStyle.headerTintColor,
    headerRight: () => (
      <HeaderRight
        iconType={'Feather'}
        name={'filter'}
        onPress={navigation.getParam('showFilterModal')}
      />
    ),
  });

  state = {
    showFilterModal: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      showFilterModal: this.filterModalHandler,
    });
  }

  filterModalHandler = () => {
    this.setState({
      showFilterModal: !this.state.showFilterModal,
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <Category
        onProjectPress={(projectId: number) =>
          navigation.navigate('Details', { projectId: projectId })
        }
        onUserPress={(userId: number) =>
          navigation.navigate('Profile', { userId: userId })
        }
        showFilterModal={this.state.showFilterModal}
        filterModalHandler={this.filterModalHandler}
        category={navigation.getParam('category')}
        categoryId={navigation.getParam('categoryId')}
      />
    );
  }
}
