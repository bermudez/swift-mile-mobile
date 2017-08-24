import React, { Component } from 'react';
import { ScrollView, Image, StyleSheet, Dimensions, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Schedule extends Component {
  render() {

    return (
      <ScrollView style={{ flex:1 }}>
        <View style={styles.container}>
	        <Image
	      		source={{ uri: "https://s3.us-east-2.amazonaws.com/swiftmile-app-assets/ui-images/Schedule.png" }}
	      		style={ styles.image }
	      	>
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

  item: {
    width: deviceWidth,
    height: deviceHeight
  },

  image: {
    width: deviceWidth,
    height: deviceHeight
  }
});
export default Schedule;
