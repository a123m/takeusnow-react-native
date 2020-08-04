import React from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from 'react-native-splash-screen';

type Props = {
  navigation: any;
};

export default class SplashScreen extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    // headerTitle: 'Sign In',
    // headerLeft: Menu(),
    // headerRight: HeaderHomeRight(navigation),
    // headerTintColor: Color.headerTintColor,
    // headerStyle: Styles.Common.toolbar,
    // headerTitleStyle: Styles.SignInHeaderStyle,
    // use to fix the border bottom
    // headerTransparent: true
  });

  componentDidMount = () => {
    // Splash.hide();
    this._userTokenHandler();
  };

  _userTokenHandler = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return <StatusBar backgroundColor="rgb(60,	21,	98)" />;
  }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" />
  //       {/* <StatusBar barStyle="default" /> */}
  //     </View>
  //   );
  // }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
