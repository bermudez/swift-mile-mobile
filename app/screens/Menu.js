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
    paddingTop: 30,
    marginBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    backgroundColor: '#fff'
    //flex: 1,
    //alignSelf: 'stretch',
  }
});

export default Menu;
