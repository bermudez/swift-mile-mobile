import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import welcomeScreenBackgroundImage from "../../assets/UI/WelcomeScreenBackground.png"
import WelcomeScreenTownImage from "../../assets/UI/WelcomeScreenTown.png"
const {screenHeight, screenWidth} = Dimensions.get('window');

class WelcomeCarouselOne extends Component {
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
          source={WelcomeScreenTownImage} 
          style={{ width: 370, height: 500,resizeMode: 'stretch' }}
          >
        </Image>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('WelcomeCarouselTwo')}
            title="Continue"
            textStyle={{textAlign: 'center'}}
            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}

          />
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeCarouselOne;
