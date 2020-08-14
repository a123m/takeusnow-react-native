import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';

import { Styles } from '../../common';

interface Props {
  title: String;
  createdAt?: string | Date;
  budget: number;
  proposals?: number;
  location: String;
  onPress: any;
  skills: Array<string>;
}

const ProjectCard = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          Styles.PrimaryColor2,
          Styles.PrimaryColor,
          Styles.PrimaryColor3,
        ]}
        style={{
          margin: 5,
          borderRadius: 10,
          // height: 150,
          alignItems: 'center',
        }}
      >
        <View style={styles.cardStyle}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.innerStyle}>
              <Text
                style={[styles.textStyle, { fontSize: 16, fontWeight: 'bold' }]}
              >
                {props.title}
              </Text>
            </View>
            <View style={styles.innerStyle}>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name={'briefcase'}
                  size={16}
                  color={styles.textStyle.color}
                />
                <Text style={styles.textStyle}> ₹{props.budget}</Text>
              </View>
              {props.proposals ? (
                <View style={{ flexDirection: 'row', marginLeft: 80 }}>
                  <Icon
                    name={'user'}
                    size={16}
                    color={styles.textStyle.color}
                  />
                  <Text style={styles.textStyle}> {props.proposals}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.innerStyle}>
              <Icon
                name={'location-pin'}
                size={16}
                color={styles.textStyle.color}
              />
              <Text style={styles.textStyle}> {props.location}</Text>
            </View>
            <View style={styles.innerStyle}>
              <Icon name={'fire'} size={16} color={styles.textStyle.color} />
              {props.skills.map((item, index) => {
                return (
                  <View
                    style={{
                      borderRadius: 20,
                      borderColor: styles.textStyle.color,
                      borderWidth: 1,
                      margin: 4,
                      padding: 4,
                    }}
                    key={index}
                  >
                    <Text style={[styles.textStyle, { fontSize: 8 }]}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name={'arrow-right'} style={{ color: 'white' }} />
          </View>
        </View>
      </LinearGradient>
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
    color: 'white',
  },
});

export default ProjectCard;
