import React, { Component } from 'react';
import { ScrollView } from 'react-native';

class Badges extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.mybadges = {};

    console.log("Inside Badges constructor");
    console.log("Inside Badges constructor: props");
    console.dir(props);

  };

  render() {

    return (
      <ScrollView>

      </ScrollView>
    );
  }
}

export default Badges;
