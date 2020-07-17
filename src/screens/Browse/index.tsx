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

// import { Styles } from '../../common';

interface Props {
  _onTilePress: Function;
}

export default class Browse extends React.PureComponent<Props> {
  _renderTileView = (
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
        onPress={() => this.props._onTilePress(insideText)}
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
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            {this._renderTileView('Photography', 'photograph', 'Fontisto', 30)}
            {this._renderTileView(
              'Videography',
              'videocamera',
              'AntDesign',
              30
            )}
          </View>
          <View style={styles.rowContainer}>
            {this._renderTileView(
              'Wedding Planner',
              'event',
              'SimpleLineIcons',
              30
            )}
            {this._renderTileView(
              'Makeup Artist',
              'hourglass',
              'SimpleLineIcons',
              30
            )}
          </View>
          <View style={styles.rowContainer}>
            {this._renderTileView('Decoration', 'badge', 'SimpleLineIcons', 30)}
            {this._renderTileView(
              'Choreography',
              'people',
              'SimpleLineIcons',
              30
            )}
          </View>
          <View style={styles.rowContainer}>
            {this._renderTileView(
              'Astrology',
              'pie-chart',
              'SimpleLineIcons',
              30
            )}
            {this._renderTileView(
              'Entertainment',
              'playlist',
              'SimpleLineIcons',
              30
            )}
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
