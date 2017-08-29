import React from 'react';
import { Text, ScrollView, View, Image, BackgroundImage, StyleSheet, Dimensions } from 'react-native';

// import { mybadges } from '../config/badges'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/badges/';

class Badges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.mybadges = null;

    console.log("Inside Badges constructor");
    // console.log("Inside Badges constructor: props");
    // console.dir(props);

  };

  componentWillMount()
  {
      this.fetchData();
  }
  fetchData() {
    fetch(BASE_URL, {
      method: 'GET',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
    })
    .then((response) => response.json(true))
    .then((responseData) => {
      console.log("received response data from server");
      // console.log(JSON.parse(responseData.body));
      // console.log(responseData.body[0]['max_granted']);
      // console.log(typeof(JSON.parse(responseData.body)));
      // console.log(responseData.body.json());
      this.state.setState({mybadges: JSON.parse(responseData.body)});
      // this.state.mybadges = JSON.parse(responseData.body);
        // console.log(typeof(this.state.mybadges));
    })
    .catch((error) => {
                    Alert.alert('problem while fetching badges data');
                })
    .done();
  }

  render() {

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: "https://s3.us-east-2.amazonaws.com/swiftmile-app-assets/ui-images/Background-Badges.png" }}
            style={ styles.image }
          >
          {
            !this.state.mybadges ?
            <Text>Loading your badges, please wait...</Text>
            : this.state.mybadges.length==0 ?
            <Text>No badges awarded...</Text>
            :
            this.state.mybadges.map((mybadge) => (
            <View 
              key={mybadge.key}
              style={styles.badge_wrapper}
            >
              <Image
                source={{ uri: mybadge.image }}
                style={ styles.badgeImage }
              >
                <Text>{mybadge.badgeName}!</Text>  
              </Image>
              </View>
              ))
          }
          
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
  badge_title:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  badge_wrapper:{
    width: 100,
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderColor: '#d6d7da'

  },
  image: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  badgeImage:{
    width: 80,
    height: 80
  }
});

export default Badges;
