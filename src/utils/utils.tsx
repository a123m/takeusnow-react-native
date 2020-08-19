/* eslint-disable no-useless-escape */
import React from 'react';
import { View, Alert } from 'react-native';

import APIService from './APIService';
import Config from './Config';

export function convertTime(t: string) {
  var date = new Date(t);
  var hours: number | string =
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  var minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  // var seconds =
  //   date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let time = hours + ':' + minutes + ' ' + am_pm;
  return time;
}

export function ValidateEmail(mail: string) {
  let regEx = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  );
  let valid = regEx.test(mail);
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
