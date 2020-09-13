import React from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Chatter } from '../../components';
import { _flatListItemSeparator } from '../../utils/utils';
import Socket from '../../utils/Socket';

interface Data {
  fname: string;
  last_text: string;
  date: string;
  roomId: number;
}
[];

interface State {
  data: Array<Data>;
}

const data: Data = [
  {
    fname: 'hulu',
    last_text: 'hows you',
    date: '2020-02-05T13:18:40.721Z',
    roomId: 123,
  },
  {
    fname: 'aman',
    last_text: 'hows you',
    date: '2020-02-05T13:18:40.721Z',
    roomId: 234,
  },
  {
    fname: 'kaushal',
    last_text: 'hy you',
    date: '2020-02-05T13:18:40.721Z',
    roomId: 345,
  },
  {
    fname: 'mikin',
    last_text: 'howsjhgjhgiiu yguyguygiuiuouoihiuuyguygohiojoihihojoj',
    date: '2020-02-05T13:18:40.721Z',
    roomId: 456,
  },
];

export default class Messenger extends React.PureComponent<any, State> {
  socket: any = Socket.getIO();
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.setDefaultView();
    this.socket.emit('join', { roomId: 123 });
    this.socket.on('chat', (msgObj: object) => {});
  }

  /**
   * default view setup
   */
  setDefaultView = async () => {
    await AsyncStorage.setItem('messagesData', JSON.stringify(data));
    let messagesData: any = await AsyncStorage.getItem('messagesData');
    this.setState({
      data: JSON.parse(messagesData),
    });
  };

  /**
   * main render
   */
  render() {
    const { onViewPress } = this.props;
    const { data } = this.state;
    return (
      <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
        <FlatList
          data={data}
          ItemSeparatorComponent={_flatListItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Chatter
              name={item.fname}
              text={item.last_text}
              time={item.date}
              onPress={() => {
                onViewPress(item.roomId, item.fname);
              }}
            />
          )}
        />
      </View>
    );
  }
}
