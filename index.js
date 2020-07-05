/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import axios from 'react-native-axios';
import App from './App';
import { name as appName } from './app.json';

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

AppRegistry.registerComponent(appName, () => App);
