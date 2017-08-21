import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import welcomeScreenBackgroundImage from "../../assets/UI/WelcomeScreenBackground.png"
import welcomeScreenGroupPhotoImage from "../../assets/UI/WelcomeScreen-GroupPhoto.png"

const {screenHeight, screenWidth} = Dimensions.get('window');

class WelcomeCarouselThree extends Component {
  render() {

    return (
      <ImageBackground 
        source={welcomeScreenBackgroundImage}
        height={screenHeight}
        width={screenWidth}
        resizeMode={Image.resizeMode.sretch}
        style={{ 
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          flex: 1, 
          width: screenWidth, 
          height: screenHeight
        }}
        >
        <Image 
          source={welcomeScreenGroupPhotoImage} 
          style={{ width: 370, height: 400,resizeMode: 'stretch' }}
          >
        </Image>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Continue"
            textStyle={{textAlign: 'center'}}
            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}

          />
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeCarouselThree;
