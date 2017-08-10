import React, { Component } from 'react';
import { ScrollView, View, Text, Button, ImageBackground, Image, Dimensions } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class WelcomeCarouselTwo extends Component {
  render() {

    return (
      <View>
      	<Text> Welcome Screen 2 </Text>
      	<Button
        onPress={() => this.props.navigation.navigate('WelcomeCarouselThree')}
        title="Continue"
      />
      </View>
    );
  }
}

export default WelcomeCarouselTwo;
