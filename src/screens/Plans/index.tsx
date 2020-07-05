import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { PricingCard } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { Styles } from '../../common';

export default class Plans extends React.PureComponent<any, any> {
  userId: any = AsyncStorage.getItem('userId');
  constructor(props: any) {
    super(props);
    this.state = {
      planInUse: 'free',
    };
  }

  render() {
    const { toPayment } = this.props;
    const { planInUse } = this.state;
    return (
      <Swiper loop={false} index={1}>
        <View style={styles.slide}>
          <PricingCard
            color={Styles.PrimaryColor2}
            title="Free"
            price="₹0"
            info={[
              '5% Project/Service Fee',
              '20 Proposals Per Month',
              '10 Skills',
              '10 Portfolio Slots',
              'Basic Support',
              'All Core Features',
            ]}
            button={{
              title: ' IN USE',
              icon: 'done-all',
            }}
            containerStyle={{ flex: 1 }}
            wrapperStyle={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          />
        </View>
        <View style={styles.slide}>
          <PricingCard
            color={Styles.PrimaryColor2}
            title="Basic"
            price="₹199"
            info={[
              '0% Project/Service Fee',
              '50 Proposals Per Month',
              '20 Skills',
              '20 Portfolio Slots',
              'Basic Support',
              'All Core Features',
            ]}
            button={{
              title: planInUse === 'basic' ? ' IN USE' : ' UPGRADE PLAN',
              icon: 'flight-takeoff',
            }}
            containerStyle={{ flex: 1 }}
            wrapperStyle={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            onButtonPress={() => {
              const amount = 199;
              toPayment(this.userId, amount);
            }}
          />
        </View>
        <View style={styles.slide}>
          <PricingCard
            color={Styles.PrimaryColor2}
            title="Pro"
            price="₹499"
            info={[
              '0% Project/Service Fee',
              '100 Proposals Per Month',
              '30 Skills',
              '30 Portfolio Slots',
              'Priority Support',
              'All Core Features',
            ]}
            button={{
              title: planInUse === 'pro' ? ' IN USE' : ' UPGRADE PLAN',
              icon: 'flight-takeoff',
            }}
            containerStyle={{ flex: 1 }}
            wrapperStyle={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            onButtonPress={() => {
              const amount = 499;
              toPayment(this.userId, amount);
            }}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
});
