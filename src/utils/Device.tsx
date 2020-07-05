import { Platform,Dimensions } from 'react-native';

const Device = {
  OS : Platform.OS,
  Version : Platform.Version,
  ScreenHeight: Dimensions.get('window').height,
  ScreenWidth:Dimensions.get('window').width
}

export default Device;
