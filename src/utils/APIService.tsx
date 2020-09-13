import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, NativeModules } from 'react-native';

import Config from '../utils/Config';
import { GlobalErr } from './utils';

axios.defaults.baseURL = Config.Debug ? Config.LocalIP : Config.ServerIP;
axios.defaults.timeout = 60000;
if (Config.Debug) {
  axios.interceptors.request.use((request: any) => {
    console.log('=======request=======\n', request.data);
    return request;
  });
  axios.interceptors.response.use((response: any) => {
    console.log('=======response======\n', response.data);
    return response;
  });
}

/**
 * Class for sending all Get, Put and Post Calls.
 */
export default class APIService {
  /**
   * This is async function for making all Get Calls to Server.
   * @param url
   * @returns {Promise<void>}
   */
  static async sendGetCall(url: string) {
    const token = await AsyncStorage.getItem('userToken');
    let headerObj = { headers: {} };
    if (token) {
      headerObj.headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      };
    } else {
      headerObj.headers = { 'Content-Type': 'application/json' };
    }

    const netStatus = await NetInfo.fetch();
    if (netStatus.isConnected == false) {
      Alert.alert(
        'Alert',
        'Unable to access internet, Please check your connectivity and try again'
      );
      return;
    }

    try {
      const response = await axios.get(url, headerObj);
      return response.data;
    } catch (err) {
      let errMessage: string = err.response.data.message;
      if (!errMessage) {
        errMessage = 'Something Went wrong please try again!';
      }
      Alert.alert('Alert', errMessage);
      if (errMessage.toUpperCase().includes('TOKEN')) {
        await AsyncStorage.clear();
        NativeModules.DevSettings.reload();
      }

      GlobalErr(err);
    }
  }

  /**
   * This is async function for making all Post Calls to server.
   * @param url
   * @param payload
   * @param headers
   * @returns {Promise<void>}
   */

  static async sendPostCall(url: string, payload: object) {
    const token = await AsyncStorage.getItem('userToken');
    let headerObj = { headers: {} };
    if (token) {
      headerObj.headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      };
    } else {
      headerObj.headers = { 'Content-Type': 'application/json' };
    }

    const netStatus = await NetInfo.fetch();
    if (netStatus.isConnected == false) {
      Alert.alert(
        'Alert',
        'Unable to access internet. Please check your connectivity and try again!'
      );
      return;
    }

    try {
      const response = await axios.post(url, payload, headerObj);
      return response.data;
    } catch (err) {
      GlobalErr(err);
    }
  }

  /**
   * This is async function for making all Patch Calls to server.
   * @param url
   * @param payload
   * @param headers
   * @returns {Promise<void>}
   */
  static async sendPatchCall(url: string, payload: object) {
    const token = await AsyncStorage.getItem('userToken');
    let headerObj = { headers: {} };
    if (token) {
      headerObj.headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      };
    } else {
      headerObj.headers = { 'Content-Type': 'application/json' };
    }
    const netStatus = await NetInfo.fetch();
    if (netStatus.isConnected == false) {
      Alert.alert(
        'Alert',
        'Unable to access internet. Please check your connectivity and try again!'
      );
      return;
    }
    try {
      const response = await axios.patch(url, payload, headerObj);
      return response.data;
    } catch (err) {
      GlobalErr(err);
    }
  }

  /**
   * This is async function for making all PUT Calls to server.
   * @param url
   * @param payload
   * @param headers
   * @returns {Promise<void>}
   */
  static async sendPutCall(url: string, payload: object) {
    const token = await AsyncStorage.getItem('userToken');
    let headerObj = { headers: {} };
    if (token) {
      headerObj.headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      };
    } else {
      headerObj.headers = { 'Content-Type': 'application/json' };
    }
    const netStatus = await NetInfo.fetch();
    if (netStatus.isConnected == false) {
      Alert.alert(
        'Alert',
        'Unable to access internet. Please check your connectivity and try again!'
      );
      return;
    }

    try {
      const response = await axios.put(url, payload, headerObj);
      return response.data;
    } catch (err) {
      GlobalErr(err);
    }
  }

  /**
   * This is async function for making all Delete Calls to server.
   * @param url
   * @param headers
   * @returns {Promise<void>}
   */
  static async sendDelCall(url: string) {
    const token = await AsyncStorage.getItem('userToken');
    let headerObj = { headers: {} };
    if (token) {
      headerObj.headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
      };
    } else {
      headerObj.headers = { 'Content-Type': 'application/json' };
    }
    const netStatus = await NetInfo.fetch();
    if (netStatus.isConnected == false) {
      Alert.alert(
        'Alert',
        'Unable to access internet. Please check your connectivity and try again!'
      );
      return;
    }
    try {
      const response = await axios.delete(url, headerObj);
      return response.data;
    } catch (err) {
      GlobalErr(err);
    }
  }
}
