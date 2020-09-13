import React from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { AppInput, ChatBubble, AppButton } from '../../components';
import Socket from '../../utils/Socket';

import { Styles } from '../../common';

const data: Array<object> = [
  { userId: 1, roomId: 123, createdAt: '12:10', text: 'some random text' },
  { userId: 25, roomId: 123, createdAt: '12:10', text: 'some random text' },
  // { userId: 3, roomId: true, createdAt: '12:10', text: 'some random text' },
  // { userId: 25, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 5, roomId: true, createdAt: '12:10', text: 'some random text' },
  // {
  //   userId: 6,
  //   roomId: false,
  //   createdAt: '12:10',
  //   text: 'some random  kjhiuhiuhiuhiuh  iuhtext'
  // },
  // { userId: 25, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 8, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 25, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 10, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 11, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 25, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 13, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 25, roomId: false, createdAt: '12:10', text: 'some random text' },
  // { userId: 20, roomId: true, createdAt: '12:10', text: 'Hello dude wassup' }
];

interface Props {
  roomId: number;
}

interface State {
  input: string;
  data: any;
}

export default class Chat extends React.PureComponent<Props, State> {
  userId: any;
  socket: any = Socket.getIO();
  flatList: FlatList<any> | any;
  constructor(props: any) {
    super(props);
    this.state = {
      input: '',
      data: [],
    };
  }

  componentDidMount() {
    const { roomId } = this.props;
    this.socket.emit('join', { roomId: roomId });

    this.socket.on('chat', (msgObj: object) => {
      this._renderReceivedMessage(msgObj);
    });
    !this.userId ? this.setDefaultView() : null;
    // this.setDefaultView();
  }

  _renderReceivedMessage = (msgObj: object) => {
    let arr = [];
    arr.push(msgObj);
    console.log(arr);
    this.setState({
      data: [msgObj, ...this.state.data],
    });
  };
  /**
   * Default view setup
   */
  setDefaultView = async () => {
    this.userId = await AsyncStorage.getItem('userId');
    this.userId = parseInt(this.userId);
    try {
      this.setState({
        data: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * async functsocketn will trigger on send press
   */
  onButton = async () => {
    const { input } = this.state;
    const { roomId } = this.props;
    if (input === '') {
      return;
    }
    try {
      let params = {
        userId: this.userId,
        roomId: roomId,
        text: this.state.input,
        createdAt: new Date().toISOString(),
      };
      this.setState({
        data: [params, ...this.state.data],
        input: '',
      });
      // const response = await APIService.sendPostCall('/messages/main', params);
      // this.socket.emit('join', { roomId: 123 });
      this.socket.emit('chat', params);
    } catch (err) {
      console.log('Error ', err);
    }
    // this.io.emit('chat', 'hello');
  };

  /**
   * main render function
   */
  render() {
    const { input, data } = this.state;
    return (
      <>
        <FlatList
          inverted
          ref={(ref) => (this.flatList = ref)}
          // onContentSizeChange={() =>
          //   this.flatList.scrollToEnd({ animated: true })
          // }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ChatBubble
              localUserId={this.userId}
              text={item.text}
              userId={item.userId}
              createdAt={item.createdAt}
            />
          )}
        />
        <KeyboardAvoidingView
          behavior="height"
          style={{
            flexDirection: 'row',
            // backgroundColor: 'white'
          }}
        >
          {/* Button for sending files */}
          {/* <AppButton style={styles.leftButton} onPress={this.onButton}>
            <Icon name={'plus'} size={24} />
          </AppButton> */}
          <View style={styles.inputStyle}>
            <AppInput
              placeholder={'Message...........'}
              onChangeText={(input: string) => {
                this.setState({ input: input });
              }}
              value={input}
            />
          </View>
          <AppButton
            style={
              this.state.input == ''
                ? styles.rightButton
                : styles.rightButtonUpdated
            }
            onPress={this.onButton}
          >
            <Icon name={'send'} size={24} color={'white'} />
          </AppButton>
        </KeyboardAvoidingView>
      </>
    );
  }
}

/**
 * styles
 */
const styles = StyleSheet.create({
  messageInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
  },
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
    marginBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inputStyleUpdated: {
    flex: 1,
    borderWidth: 2,
    borderColor: Styles.PrimaryColor,
    margin: 5,
    marginBottom: 8,
  },
  leftButton: {
    borderRadius: 100,
    marginLeft: 10,
    margin: 5,
    marginBottom: 8,
  },
  rightButton: {
    backgroundColor: 'silver',
    flex: 1,
    margin: 5,
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 20,
  },
  rightButtonUpdated: {
    backgroundColor: Styles.PrimaryColor2,
    flex: 1,
    margin: 5,
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 20,
  },
  iconStyle: {
    color: Styles.PrimaryColor,
  },
});
