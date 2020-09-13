/* eslint-disable no-useless-escape */
import React from 'react';
import { View, Alert, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import APIService from './APIService';
import Config from './Config';

export function convertTime(t: string) {
  const date = new Date(t);
  let hours: number | string =
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  // var seconds =
  //   date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  const time = hours + ':' + minutes + ' ' + am_pm;
  return time;
}

export function ValidateEmail(mail: string) {
  const regEx = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  );
  const valid = regEx.test(mail);
  if (valid) {
    return true;
  }
  return false;
}

export function _flatListItemSeparator() {
  return (
    <View
      style={{
        marginLeft: '21%',
        height: 1,
        width: '60%',
        backgroundColor: 'silver',
      }}
    />
  );
}

export function completeImageUrl(url: string): string {
  const baseURL = Config.Debug ? Config.LocalIP : Config.ServerIP;
  return baseURL + '/' + url;
}

export function GlobalErr(err: any) {
  if (Config.Debug) {
    let errMessage: string = err.response.data.message;
    if (!errMessage) {
      errMessage = 'Something Went wrong please try again!';
    }
    Alert.alert('Alert', errMessage);
    if (errMessage.toUpperCase().includes('TOKEN')) {
      AsyncStorage.clear();
      NativeModules.reload();
    }
    console.log('Global Error', err);
  } else {
    let errMessage: string = err.response.data.message;
    if (!errMessage) {
      errMessage = 'Something Went wrong please try again!';
    }
    Alert.alert('Alert', errMessage);
    if (errMessage.toUpperCase().includes('TOKEN')) {
      AsyncStorage.clear();
      NativeModules.reload();
    }
    if (err.response.data.message.includes('_context.t0.response.data')) {
      Alert.alert(
        'Alert',
        'Server is not responding. Please try in some time!'
      );
      return;
    }
    // APIService.sendPostCall('global/error', err);
  }
}

export function combinedCatData(catData: Array<any>, subCatData: Array<any>) {
  const combinedCatData = [];
  for (let i of catData) {
    let childrenArr = [];
    for (let j of subCatData) {
      if (i.cat_id === j.cat_id) {
        const subCatObj = {
          sub_cat_id: j.sub_cat_id,
          cat_id: j.cat_id,
          name: j.name,
          status: j.status,
        };
        childrenArr.push(subCatObj);
      }
    }
    const catObj: any = {
      cat_id: i.cat_id,
      name: i.name,
      status: i.status,
      children: childrenArr,
    };
    combinedCatData.push(catObj);
  }
  return combinedCatData;
}

export const catData = [
  { cat_id: 1, name: 'Photography', status: false },
  { cat_id: 2, name: 'Videography', status: false },
  { cat_id: 3, name: 'Wedding Planning', status: false },
  { cat_id: 4, name: 'Makeup Artist', status: false },
  { cat_id: 5, name: 'Decoration', status: false },
  { cat_id: 6, name: 'Choreography', status: false },
  { cat_id: 7, name: 'Astrology', status: false },
  { cat_id: 8, name: 'Entertainment', status: false },
];
export const subCatData = [
  { sub_cat_id: 11, cat_id: 1, name: 'Still Photography', status: false },
  { sub_cat_id: 12, cat_id: 1, name: 'Candid Photography', status: false },
  { sub_cat_id: 13, cat_id: 1, name: 'Event Photography', status: false },
  { sub_cat_id: 14, cat_id: 1, name: 'Product Photography', status: false },
  { sub_cat_id: 15, cat_id: 2, name: 'Main Videograph', status: false },
  { sub_cat_id: 16, cat_id: 2, name: 'Cinematic Videograph', status: false },
  { sub_cat_id: 17, cat_id: 2, name: 'Event Videograph', status: false },
  { sub_cat_id: 18, cat_id: 2, name: 'Product Videograph', status: false },
  { sub_cat_id: 19, cat_id: 2, name: 'Drone Videograph', status: false },
  { sub_cat_id: 110, cat_id: 3, name: 'Professional Planners', status: false },
  { sub_cat_id: 111, cat_id: 4, name: 'Professional Artist', status: false },
  {
    sub_cat_id: 112,
    cat_id: 5,
    name: 'Professional Decorators',
    status: false,
  },
  { sub_cat_id: 113, cat_id: 6, name: 'Dance Choreographers', status: false },
  { sub_cat_id: 114, cat_id: 6, name: 'Acting Choreographers', status: false },
  { sub_cat_id: 115, cat_id: 2, name: 'Astrologers', status: false },
  {
    sub_cat_id: 116,
    cat_id: 3,
    name: 'Professional Choreographers',
    status: false,
  },
];
