import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { ReviewCard } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';
// import APIService from '../../utils/APIService';

import { Styles } from '../../common';

const responseDummy: ResponseType = {
  average_reviews: 4,
  total_reviews: 5,
  reviews: [
    {
      fname: 'mike',
      lname: 'lulu',
      user_image:
        'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
      review_text: 'well done bro!',
      rating: 4,
      createdAt: moment()
        .subtract(7, 'd')
        .toISOString(),
    },
    {
      fname: 'mike',
      lname: 'lulu',
      user_image:
        'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
      review_text: 'well done bro!',
      rating: 4,
      createdAt: moment().toISOString(),
    },
    {
      fname: 'mike',
      lname: 'lulu',
      user_image:
        'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
      review_text: 'well done bro!',
      rating: 4,
      createdAt: moment().toISOString(),
    },
    {
      fname: 'mike',
      lname: 'lulu',
      user_image:
        'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
      review_text: 'well done bro!',
      rating: 4,
      createdAt: moment().toISOString(),
    },
  ],
};

type Props = {
  userId: string | null | undefined;
};

type State = {
  averageReviews: number;
  totalReviews: number;
  reviews: ReviewType[];
  isLoading: boolean;
  isListEnd: boolean;
};

type ResponseType = {
  average_reviews: number;
  total_reviews: number;
  reviews: ReviewType[];
};

type ReviewType = {
  fname: string;
  lname: string;
  user_image: string;
  review_text: string;
  rating: number;
  createdAt: Date | string;
};

export default class Review extends React.PureComponent<Props, State> {
  protected userId: string | null | undefined;
  protected page: number = 0;
  protected limit: number = 10;
  constructor(props: any) {
    super(props);
    this.state = {
      averageReviews: 0,
      totalReviews: 0,
      reviews: [],
      isLoading: false,
      isListEnd: false,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    const { userId } = this.props;
    if (userId) {
      this.userId = userId;
    } else {
      this.userId = await AsyncStorage.getItem('userId');
    }

    // const response = await APIService.sendGetCall(
    //   'reviews/' + this.userId
    // );
    const response = responseDummy; //delete this line when API is connected
    this.setState({
      averageReviews: response.average_reviews,
      totalReviews: response.total_reviews,
      reviews: response.reviews,
    });
  };

  _renderTopView = () => {
    const { averageReviews, totalReviews } = this.state;
    return (
      <View style={{ height: 50, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderColor: 'grey',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {totalReviews}
          </Text>
          <Text>Total Reviews</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {averageReviews}
          </Text>
          <Text>Avg Reviews</Text>
        </View>
      </View>
    );
  };

  _renderEmptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Reviews</Text>
      </View>
    );
  };

  loadMoreData = () => {
    if (!this.state.isLoading && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ isLoading: true }, async () => {
        try {
          const response = await APIService.sendGetCall(
            `reviews/${this.userId}/more?page=${this.page}&limit=${this.limit}`
          );
          if (response.length > 0) {
            //Successful response from the API Call
            this.page = this.page + 1;
            //After the response increasing the offset for the next API call.
            this.setState({
              reviews: [...this.state.reviews, ...response],
              //adding the new data with old one available
              isLoading: false,
              //updating the loading state to false
            });
          } else {
            this.setState({
              isLoading: false,
              isListEnd: true,
            });
          }
        } catch (err) {
          GlobalErr(err);
          this.setState({
            isLoading: false,
            isListEnd: true,
          });
        }
      });
    }
  };

  _renderDataView = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.state.reviews}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {this.state.isLoading ? (
              <ActivityIndicator
                color={Styles.PrimaryColor2}
                style={{ margin: 40 }}
              />
            ) : null}
          </View>
        )}
        onEndReached={() => this.loadMoreData()}
        renderItem={({ item }) => (
          <ReviewCard
            name={item.fname}
            value={item.review_text}
            rating={item.rating}
            createdAt={item.createdAt}
          />
        )}
      />
    );
  };
  render() {
    return (
      <>
        {this._renderTopView()}
        {this.state.reviews.length === 0
          ? this._renderEmptyView()
          : this._renderDataView()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
