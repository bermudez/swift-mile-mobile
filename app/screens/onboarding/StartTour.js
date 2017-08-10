import React, { Component } from 'react';
import { ScrollView, View, Text, Button, ImageBackground, Image, Dimensions} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import welcomeScreenBackgroundImage from "../../assets/UI/WelcomeScreenBackground.png"
import welcomeScreenBackgroundLogoImage from "../../assets/UI/AppLoadingSplashPagePintPathLogo.png"
import welcomeScreenBackgroundCycleImage from "../../assets/UI/AppLoadingSplashPage-SwiftMile.png"

const {screenHeight, screenWidth} = Dimensions.get('window');

class StartTour extends Component {
  render() {

    return (
      <View>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Skip Tour - SignUp"
            style={{ marginTop:100 }}
          />
          <Button
            onPress={() => this.props.navigation.navigate('WelcomeCarouselOne')}
            title="StartTour - WelcomeCarouselOne"
          />
          
      </View>
    );
  }
}

export default StartTour;
