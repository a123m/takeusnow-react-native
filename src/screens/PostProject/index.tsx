import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Styles } from '../../common';

interface Props {
  toPostProject2: any;
}

export default class Project extends React.PureComponent<Props> {
  _renderTileView = (iconName: string, category: string) => {
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.toPostProject2(category)}
      >
        <View style={styles.container}>
          <Icon name={iconName} size={24} />
          <Text>{category}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <>
        <View
          style={{
            width: '25%',
            height: 4,
            backgroundColor: Styles.PrimaryColor
          }}
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.headingStyle}>
                Give Your Project a Category
              </Text>
            </View>
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
      </>
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
  },
  headingStyle: { fontSize: 18, fontWeight: 'bold' }
});
