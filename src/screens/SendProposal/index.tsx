import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';

import { AppCard, AppInput, AppButton } from '../../components';
import APIService from '../../utils/APIService';
import { GlobalErr } from '../../utils/utils';

import { Styles } from '../../common';

interface Props {
  title: String;
}

interface State {
  input: String;
}

export default class SendProposal extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: '',
      // 'Provide information about how good you will complete this project Provide informatio',
    };
  }

  sendProposalHandler = async () => {
    const { input } = this.state;
    if (input.length < 100) {
      Alert.alert('Alert', 'Please write at least 100 words in you proposal');
      return;
    }

    let params = {
      id: projectId,
      proposal: input,
    };
    try {
      const response = await APIService.sendPostCall(
        'browse/category/details/proposal',
        params
      );
      if (response.status !== 200) {
        Alert.alert('Alert', 'Something went wrong please try again!');
        return;
      }
    } catch (err) {
      GlobalErr(err);
    }
  };

  render() {
    return (
      <>
        <AppCard>
          <Text style={styles.textHeaderStyle}>Send Proposal To</Text>
          <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
          <View
            style={{
              borderColor: Styles.PrimaryColor3,
              borderWidth: 1,
              borderRadius: 5,
              height: 150,
              margin: 10,
            }}
          >
            <AppInput
              multiline={true}
              placeholder={
                'Provide information about how awesomely you will complete this project'
              }
              onChangeText={(input: String) => {
                this.setState({ input });
              }}
              value={this.state.input}
              style={{ height: 150 }}
            />
          </View>
          <Text style={styles.textHeaderStyle}>Proposals Left</Text>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                height: 50,
                backgroundColor: 'silver',
                margin: 10,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 20 }}>10 / 20</Text>
            </View>
          </View>
          <AppButton onPress={this.sendProposalHandler}>
            Send Proposal
          </AppButton>
        </AppCard>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textHeaderStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
