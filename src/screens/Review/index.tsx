import React from 'react';
import { FlatList, View, Text } from 'react-native';

import { ReviewCard } from '../../components';

const data: Array<data> = [
  {
    fullName: 'aman chhabra',
    value:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, veniam? Quidem iure deleniti quisquam sapiente reiciendis deserunt tenetur facilis laboriosam soluta temporibus eligendi unde dolores, dolorem corrupti, veniam illum odio!',
    rating: 3
  },
  {
    fullName: 'Kaushal Singh',
    value:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, veniam? Quidem iure deleniti quisquam sapiente reiciendis deserunt tenetur facilis laboriosam soluta temporibus eligendi unde dolores, dolorem corrupti, veniam illum odio!',
    rating: 5
  },
  {
    fullName: 'Nitin Singh',
    value:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, veniam? Quidem iure deleniti quisquam sapiente reiciendis deserunt tenetur facilis laboriosam soluta temporibus eligendi unde dolores, dolorem corrupti, veniam illum odio!',
    rating: 2
  },
  {
    fullName: 'aman chhabra',
    value:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, veniam? Quidem iure deleniti quisquam sapiente reiciendis deserunt tenetur facilis laboriosam soluta temporibus eligendi unde dolores, dolorem corrupti, veniam illum odio!',
    rating: 3
  },
  {
    fullName: 'aman chhabra',
    value:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, veniam? Quidem iure deleniti quisquam sapiente reiciendis deserunt tenetur facilis laboriosam soluta temporibus eligendi unde dolores, dolorem corrupti, veniam illum odio!',
    rating: 1
  }
];

interface data {
  fullName: string;
  value: string;
  rating: number;
}

interface State {
  data: Array<data>;
}

export default class Review extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      data: data
    });
  }
  _renderEmptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Reviews</Text>
      </View>
    );
  };

  _renderDataView = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.state.data}
        renderItem={({ item }) => (
          <ReviewCard
            fullName={item.fullName}
            value={item.value}
            rating={item.rating}
          />
        )}
      />
    );
  };
  render() {
    return (
      <>
        {this.state.data === []
          ? this._renderEmptyView()
          : this._renderDataView()}
      </>
    );
  }
}
