import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { menuItems } from '../config/menuItems';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const UI_IMAGES_BASE_URL = 'https://s3.us-east-2.amazonaws.com/swiftmile-app-assets/ui-images/';

class Menu extends Component {
  onNavigateTo = (menuItem) => {
    this.props.navigation.navigate(`${menuItem.screen}`, { ...menuItem });
  };

  render() {
    return (
      <ScrollView style={{ flex:1 }}>
      <View style={styles.container}>
          <Image
            source={{ uri: UI_IMAGES_BASE_URL + "Background-MainMenu.png" }}
            style={ styles.image }
          >
              <View
                style={ styles.logoContainer }
              >
                <Image
                  style={ styles.logo }
                  source={{ uri: UI_IMAGES_BASE_URL + "AppLoadingSplashPage-SwiftMile.png" }}
                />

                <Image
                  style={ styles.logo }
                  source={{ uri: UI_IMAGES_BASE_URL + "AppLoadingSplashPagePintPathLogo.png" }}
                />


              </View>
              {
                menuItems.map((menuItem) => (

                <TouchableHighlight
                  key={menuItem.title}
                  onPress={() => this.onNavigateTo(menuItem)}
                  >
                  <Image
                    style={ styles.btn }
                    resizeMode='contain'
                    source={{uri: UI_IMAGES_BASE_URL+menuItem.image}}
                  />
                </TouchableHighlight>
              ))}

          </Image>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 200,
    height: 50,
    paddingTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    backgroundColor: '#fff'
    //flex: 1,
    //alignSelf: 'stretch',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row"
  },
  logo: {
    width: 190,
    height: 190,
    paddingTop: 10,
    padding: 10,
    resizeMode: 'contain',
    alignItems: 'center'
  }
});

export default Menu;
