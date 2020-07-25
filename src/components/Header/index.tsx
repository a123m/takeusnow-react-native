// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';
// import Icon2 from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';
// import { Styles } from 'src/common';
// import { Avatar } from 'react-native-elements';

// type Header = {
//   name: string;
//   _headerRight?: any;
//   _rightIcon?: string;
// };

// const renderHeader = (props) => {
//   return (
//     <SafeAreaView>
//       <TouchableOpacity
//         style={{
//           height: 37,
//           width: 37,
//           borderRadius: 100,
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 34,
//           marginLeft: 13,
//           position: 'absolute',
//           zIndex: 2,
//         }}
//         onPress={() => props.navigation.goBack()}
//       >
//         <Icon2 name="arrow-back" color="white" size={25} />
//       </TouchableOpacity>
//       <Animated.View
//         style={{
//           height: this.animatedHeaderHeight,
//           position: 'absolute',
//           width: '100%',
//           zIndex: 1,
//         }}
//       >
//         <LinearGradient
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           colors={[
//             Styles.PrimaryColor2,
//             Styles.PrimaryColor,
//             Styles.PrimaryColor3,
//           ]}
//           style={{ flex: 1 }}
//         >
//           <Animated.Text
//             style={{
//               fontSize: 22,
//               fontWeight: 'bold',
//               color: 'white',
//               marginTop: 37,
//               marginLeft: 73,
//               opacity: this.animatedOpacityShow,
//               position: 'absolute',
//             }}
//           >
//             Aman Chhabra
//           </Animated.Text>
//           <Animated.View
//             style={[
//               styles.smallContainer,
//               { opacity: this.animatedOpacityHide },
//             ]}
//           >
//             <Avatar
//               size={'large'}
//               source={
//                   'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg',}
//             />
//             <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
//               {/* {this.state.username} */}
//               Aman Chhabra
//             </Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Icon name="location-pin" color="white" size={16} />
//               <Text style={{ fontSize: 12, color: 'white' }}>Noida,UP</Text>
//             </View>
//             <TouchableOpacity onPress={() => {}}>
//               <View>
//                 <Text style={{ fontSize: 10, color: 'white' }}>
//                   Check Reviews
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </Animated.View>
//         </LinearGradient>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// // const renderHeader = (props: Header) => {
// //   return (
// //     <SafeAreaView>
// //       <View style={styles.header_footer_style}>
// //         <View
// //           style={[styles.container, { alignItems: 'flex-start', padding: 10 }]}
// //         ></View>
// //         <View style={styles.container}>
// //           <Text style={styles.textStyle}> {props.name} </Text>
// //         </View>
// //         <TouchableOpacity onPress={props._headerRight}>
// //           <View
// //             style={[styles.container, { alignItems: 'flex-end', padding: 10 }]}
// //           >
// //             <Icon name={props._rightIcon} size={24} color={'white'} />
// //           </View>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// const styles = StyleSheet.create({
//   header_footer_style: {
//     // flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     height: 45,
//     backgroundColor: 'rgb(104,	42,	163	)',
//   },
//   textStyle: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   container: {
//     width: 100,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default renderHeader;
