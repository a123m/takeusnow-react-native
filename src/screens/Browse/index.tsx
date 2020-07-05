import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';

import { Styles } from '../../common';

interface Props {
  _onTilePress: Function;
}

export default class Browse extends React.PureComponent<Props> {
  _renderTileView = (
    iconName: string,
    insideText: string
    // onPress: Function
  ) => {
    return (
      <TouchableNativeFeedback
        onPress={() => this.props._onTilePress(insideText)}
      >
        <View style={styles.container}>
          <Icon name={iconName} size={24} />
          <Text>{insideText}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    // const { _onTilePress } = this.props;
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            {this._renderTileView('bell', 'search')}
            {this._renderTileView('hourglass', 'search')}
          </View>
          <View style={styles.rowContainer}>
            {this._renderTileView('badge', 'search')}
            {this._renderTileView('anchor', 'search')}
          </View>
          <View style={styles.rowContainer}>
            {this._renderTileView('present', 'search')}
            {this._renderTileView('globe-alt', 'search')}
          </View>
          <View style={styles.rowContainer}>
            {this._renderTileView('present', 'search')}
            {this._renderTileView('globe-alt', 'search')}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    elevation: 2
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5
  },
  container: {
    height: 150,
    width: 150,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247, 247, 247)'
  }
});
