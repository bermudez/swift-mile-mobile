import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

class VenueDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
          return (
            <View>
              <Text>VenueDetail Text Goes here!</Text>
            </View>
      );
    }
  }

module.exports = VenueDetail;