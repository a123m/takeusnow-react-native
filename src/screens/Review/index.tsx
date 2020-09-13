import React from 'react';
import { FlatList, View, Text, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { ReviewCard, Spinner } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr, completeImageUrl } from '../../utils/utils';
// import APIService from '../../utils/APIService';

import { Styles } from '../../common';

type Props = {
  userId: string | null | undefined;
};

type State = {
  averageReviews: number;
  totalReviews: number;
  reviews: ReviewType[];
  isLoading: boolean;
  isListEnd: boolean;
  noReviews: boolean;
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
  description: string;
  rating: number;
  created_at: Date | string;
};

export default class Review extends React.PureComponent<Props, State> {
  private userId: string | null | undefined;
  private page = 2;
  private limit = 10;
  constructor(props: Props) {
    super(props);
    this.state = {
      averageReviews: 0,
      totalReviews: 0,
      reviews: [],
      isLoading: true,
      isListEnd: false,
      noReviews: false,
    };
  }

  componentDidMount() {
    this.setDefaultView();
  }

  setDefaultView = async () => {
    try {
      const { userId } = this.props;
      if (userId) {
        this.userId = userId;
      } else {
        this.userId = await AsyncStorage.getItem('userId');
      }

      const response: ResponseType = await APIService.sendGetCall(
        '/reviews/' + this.userId
      );

      if (!response) {
        return;
      }
      if (response.reviews.length === 0) {
        this.setState({
          noReviews: true,
        });
        return;
      }
      const reviews = response.reviews;
      reviews.forEach((item) => {
        item.user_image = completeImageUrl(item.user_image);
      });
      this.setState({
        averageReviews: response.average_reviews,
        totalReviews: response.total_reviews,
        reviews: reviews,
        isLoading: false,
      });
    } catch (err) {
      GlobalErr(err);
    }
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
          const response: ReviewType[] = await APIService.sendGetCall(
            `reviews/${this.userId}?page=${this.page}&limit=${this.limit}`
          );
          if (response.length > 0) {
            //Successful response from the API Call
            this.page = this.page + 1;
            //After the response increasing the offset for the next API call.
            const reviews = response;
            reviews.forEach((item) => {
              item.user_image = completeImageUrl(item.user_image);
            });
            this.setState({
              reviews: [...this.state.reviews, ...reviews],
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
    if (this.state.noReviews) {
      return this._renderEmptyView();
    }
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.state.reviews}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {this.state.isLoading ? (
              <Spinner
                mode="normal"
                size="large"
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
            value={item.description}
            rating={item.rating}
            createdAt={item.created_at}
          />
        )}
      />
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle={'dark-content'} />
        {this._renderTopView()}
        {this._renderDataView()}
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
