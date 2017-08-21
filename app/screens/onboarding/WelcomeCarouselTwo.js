import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';

import welcomeScreenBackgroundImage from "../../assets/UI/WelcomeScreenBackground.png"
import welcomeScreenCyclingImage from "../../assets/UI/WelcomeScreen-Cycling.png"

const {screenHeight, screenWidth} = Dimensions.get('window');

class WelcomeCarouselTwo extends Component {
  render() {

    return (
      <ImageBackground 
        source={welcomeScreenBackgroundImage}
        height={screenHeight}
        width={screenWidth}
        resizeMode={Image.resizeMode.sretch}
        style={{ position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1, width: screenWidth, height: screenHeight, alignSelf: 'stretch' }}
        >
        <Image 
          source={welcomeScreenCyclingImage} 
          style={{ width: 370, height: 400,resizeMode: 'stretch' }}
          >
        </Image>
        
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('WelcomeCarouselThree')}
            title="Continue"
            textStyle={{textAlign: 'center'}}
            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}

          />
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeCarouselTwo;
