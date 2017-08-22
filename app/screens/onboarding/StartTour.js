import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, Dimensions} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import welcomeScreenBackgroundImage from "../../assets/UI/WelcomeScreenBackground.png"
import welcomeScreenBackgroundLogoImage from "../../assets/UI/AppLoadingSplashPagePintPathLogo.png"
import welcomeScreenBackgroundCycleImage from "../../assets/UI/AppLoadingSplashPage-SwiftMile.png"

const {screenHeight, screenWidth} = Dimensions.get('window');

class StartTour extends Component {
  constructor(props) {
    super(props);
    console.log("height: ");
    console.log(screenHeight);
    console.log("width: ");
    console.log(screenWidth);

    const { params } = this.props.navigation.state;

    console.log("Inside start Tour constructor");
    console.log("Inside start Tour constructor: props");
    console.dir(props);
    console.log("Inside start Tour constructor: params");
    console.dir(params);

  }
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
          flex: 1, 
          width: screenWidth, 
          height: screenHeight
      }}
        >
        <Image 
          source={welcomeScreenBackgroundLogoImage} 
          style={{ width: 370, height: 200 }}
          />
        
        <Image 
          source={welcomeScreenBackgroundCycleImage} 
          style={{ width: 370, height: 250 }}
          />

        <View>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Skip Tour - SignUp"
            textStyle={{textAlign: 'center'}}
            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
          />
          <Button
            onPress={() => this.props.navigation.navigate('WelcomeCarouselOne')}
            title="StartTour - WelcomeCarouselOne"
            textStyle={{textAlign: 'center'}}
            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}

          />
        </View>
      </ImageBackground>
    );
  }
}

export default StartTour;
