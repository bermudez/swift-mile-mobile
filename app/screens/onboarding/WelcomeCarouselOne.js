import React, { Component } from 'react';
import { ScrollView, View, Text, Button, ImageBackground, Image, Dimensions } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class WelcomeCarouselOne extends Component {
  render() {

    return (
      <View>
      	<Text> Welcome Screen 1 </Text>
      	<Button
        onPress={() => this.props.navigation.navigate('WelcomeCarouselTwo')}
        title="Continue"
      />
      </View>
    );
  }
}

export default WelcomeCarouselOne;
