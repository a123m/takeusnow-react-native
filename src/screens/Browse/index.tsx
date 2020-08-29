import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import LinearGradient from 'react-native-linear-gradient';

import { Header } from '../../components';

// import { Styles } from '../../common';

interface Props {
  _onTilePress(categoryId: number, insideText: string): void;
}

export default class Browse extends React.PureComponent<Props> {
  _renderTileView = (
    categoryId: number,
    insideText: string,
    iconName: string,
    iconType: string,
    iconSize: number
  ) => {
    let myIcon;
    switch (iconType) {
      case 'Fontisto':
        myIcon = <IconFontisto name={iconName} size={iconSize} />;
        break;
      case 'AntDesign':
        myIcon = <IconAntDesign name={iconName} size={iconSize} />;
        break;
      case 'SimpleLineIcons':
        myIcon = <IconSimpleLineIcons name={iconName} size={iconSize} />;
        break;
    }

    return (
      <TouchableNativeFeedback
        onPress={() => this.props._onTilePress(categoryId, insideText)}
      >
        <View style={styles.container}>
          {myIcon}
          <Text style={{ fontSize: 16, margin: 5 }}>{insideText}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    // const { _onTilePress } = this.props;
    return (
      <>
        <Header title={'Browse Your Intrust'} />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.rowContainer}>
              {this._renderTileView(
                1,
                'Photography',
                'photograph',
                'Fontisto',
                30
              )}
              {this._renderTileView(
                2,
                'Videography',
                'videocamera',
                'AntDesign',
                30
              )}
            </View>
            <View style={styles.rowContainer}>
              {this._renderTileView(
                3,
                'Wedding Planners',
                'event',
                'SimpleLineIcons',
                30
              )}
              {this._renderTileView(
                4,
                'Makeup Artist',
                'hourglass',
                'SimpleLineIcons',
                30
              )}
            </View>
            <View style={styles.rowContainer}>
              {this._renderTileView(
                5,
                'Decoration',
                'badge',
                'SimpleLineIcons',
                30
              )}
              {this._renderTileView(
                6,
                'Choreography',
                'people',
                'SimpleLineIcons',
                30
              )}
            </View>
            <View style={styles.rowContainer}>
              {this._renderTileView(
                7,
                'Astrology',
                'pie-chart',
                'SimpleLineIcons',
                30
              )}
              {this._renderTileView(
                8,
                'Entertainment',
                'playlist',
                'SimpleLineIcons',
                30
              )}
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
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    height: 150,
    width: 150,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247, 247, 247)',
  },
});
