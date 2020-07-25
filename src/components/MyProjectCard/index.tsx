import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import AppCard from '../AppCard';
// import LinearGradient from 'react-native-linear-gradient';

import { Styles } from '../../common';

interface Props {
  status: string;
  title: string;
  postedOn: Date | string;
  proposals?: number;
  onPress: any;
}

const MyProjectCard = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <AppCard style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.9 }}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                borderRadius: 20,
                borderColor: Styles.PrimaryColor2,
                borderWidth: 1,
                margin: 4,
                padding: 5,
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 8, color: Styles.PrimaryColor2 },
                ]}
              >
                {props.status}
              </Text>
            </View>
          </View>
          <View style={styles.innerStyle}>
            <Text
              style={[styles.textStyle, { fontSize: 16, fontWeight: 'bold' }]}
            >
              {props.title}
            </Text>
          </View>

          <View style={styles.innerStyle}>
            <Icon name={'ios-timer'} size={16} color={styles.textStyle.color} />
            <Text style={{ color: 'silver' }}>
              {' '}
              Posted On: {moment(props.postedOn).format('Do MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name={'md-arrow-dropright'} size={20} />
        </View>
      </AppCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    // padding: 10,
    margin: 10,
    // backgroundColor: 'white',
    // elevation: 1,
  },
  innerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  textStyle: {
    color: 'black',
  },
});

export default MyProjectCard;
