import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import Config from '../utils/Config';

axios.defaults.baseURL = Config.Debug ? Config.LocalIP : Config.ServerIP;
axios.defaults.timeout = 9000;

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
    try {
      if (netStatus.isConnected == false) {
        Alert.alert(
          'Alert',
          'Unable to access internet, Please check your connectivity and try again'
        );
        return new Error('Network Fail');
      }

      axios.interceptors.request.use((request: object) => {
        // console.log('=====request======\n', request);
        return request;
      });

      const response: any = await axios.get(url, headerObj);
      if (response.status === 500) {
        Alert.alert('Alert', 'Please Login Again');
        return;
      }
      if (response.status !== 200) {
        if (response.message) {
          Alert.alert('Alert', response.message);
          return;
        }
        Alert.alert('Alert', 'Something went wrong please try again');
        return;
      }
      return response.data;
    } catch (err) {
      // console.log(err.response)
      return err.response;
    }
  }

  /**
   * This is async function for making all Post Calls to server.
   * @param url
   * @param params
   * @param headers
   * @returns {Promise<void>}
   */

  static async sendPostCall(url: string, params: object) {
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
    try {
      if (netStatus.isConnected == false) {
        Alert.alert(
          'Alert',
          'Unable to access internet, Please check your connectivity and try again'
        );
        return new Error('Network Fail');
      }

      axios.interceptors.request.use((request: object) => {
        // console.log('=====request======\n', request);
        return request;
      });

      const response = await axios.post(url, params, headerObj);
      if (response.status === 500) {
        Alert.alert('Alert', 'Please Login Again');
        return;
      }
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again');
        return;
      }
      return response.data;
    } catch (err) {
      // console.log(err.response)
      return err.response;
    }
  }

  /**
   * This is async function for making all Patch Calls to server.
   * @param url
   * @param params
   * @param headers
   * @returns {Promise<void>}
   */
  static async sendPatchCall(url: string, params: object) {
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
    try {
      if (netStatus.isConnected == false) {
        Alert.alert(
          'Alert',
          'Unable to access internet, Please check your connectivity and try again'
        );
        return new Error('Network Fail');
      }

      axios.interceptors.request.use((request: object) => {
        // console.log('=====request======\n', request);
        return request;
      });

      const response = await axios.patch(url, params, headerObj);
      if (response.status === 500) {
        Alert.alert('Alert', 'Please Login Again');
        return;
      }
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again');
        return;
      }
      return response.data;
    } catch (err) {
      // console.log(err.response)
      return err.response;
    }
  }

  /**
   * This is async function for making all PUT Calls to server.
   * @param url
   * @param params
   * @param headers
   * @returns {Promise<void>}
   */
  static async sendPutCall(url: string, params: object) {
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
    try {
      if (netStatus.isConnected == false) {
        Alert.alert(
          'Alert',
          'Unable to access internet, Please check your connectivity and try again'
        );
        return new Error('Network Fail');
      }

      axios.interceptors.request.use((request: object) => {
        // console.log('=====request======\n', request);
        return request;
      });

      const response = await axios.put(url, params, headerObj);
      if (response.status === 500) {
        Alert.alert('Alert', 'Please Login Again');
        return;
      }
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again');
        return;
      }
      return response.data;
    } catch (err) {
      // console.log(err.response)
      return err.response;
    }
  }
}
