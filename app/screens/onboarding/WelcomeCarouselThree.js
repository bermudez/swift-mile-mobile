import React, { Component } from 'react';
import { ScrollView, View, Text, Button, ImageBackground, Image, Dimensions } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class WelcomeCarouselThree extends Component {
  render() {

    return (
      <View>
      	<Text> Welcome Screen 3 </Text>
      	<Button
        onPress={() => this.props.navigation.navigate('SignUp')}
        title="Continue"
      />
      </View>
    );
  }
}

export default WelcomeCarouselThree;
