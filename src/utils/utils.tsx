/* eslint-disable no-useless-escape */
import React from 'react';
import { View, Alert } from 'react-native';

import APIService from './APIService';
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

export function GlobalErr(err: Error) {
  if (Config.Debug) {
    console.log('Global Error', err);
  } else {
    if (err.message.includes('_context.t0.response.data')) {
      Alert.alert(
        'Alert',
        'Server is not responding. Please try in some time!'
      );
    }
    APIService.sendPostCall('global/error', err);
  }
}

export const catData = [
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
export const subCatData = [
  { sub_cat_id: 11, cat_id: 1, name: 'Still Photography', status: 0 },
  { sub_cat_id: 12, cat_id: 1, name: 'Candid Photography', status: 0 },
  { sub_cat_id: 13, cat_id: 1, name: 'Event Photography', status: 0 },
  { sub_cat_id: 14, cat_id: 1, name: 'Product Photography', status: 0 },
  { sub_cat_id: 15, cat_id: 2, name: 'Main Videograph', status: 0 },
  { sub_cat_id: 16, cat_id: 2, name: 'Cinematic Videograph', status: 0 },
  { sub_cat_id: 17, cat_id: 2, name: 'Event Videograph', status: 0 },
  { sub_cat_id: 18, cat_id: 2, name: 'Product Videograph', status: 0 },
  { sub_cat_id: 19, cat_id: 2, name: 'Drone Videograph', status: 0 },
  { sub_cat_id: 110, cat_id: 3, name: 'Professional Planners', status: 0 },
  { sub_cat_id: 111, cat_id: 4, name: 'Professional Artist', status: 0 },
  { sub_cat_id: 112, cat_id: 5, name: 'Professional Decorators', status: 0 },
  { sub_cat_id: 113, cat_id: 6, name: 'Dance Choreographers', status: 0 },
  { sub_cat_id: 114, cat_id: 6, name: 'Acting Choreographers', status: 0 },
  { sub_cat_id: 115, cat_id: 2, name: 'Astrologers', status: 0 },
  {
    sub_cat_id: 115,
    cat_id: 3,
    name: 'Professional Choreographers',
    status: 0,
  },
];
