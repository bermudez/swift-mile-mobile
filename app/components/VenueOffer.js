import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

class VenueOffer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
          return (
            <View>
              <Text>Offer Text Goes here!</Text>
            </View>
      );
    }
  }

module.exports = VenueOffer;