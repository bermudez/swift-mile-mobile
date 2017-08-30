import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  BackgroundImage,
  Dimensions,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-elements';
import { poiClusters } from '../config/sampleMapClusters';
import VenueBackgroundImage from "../assets/UI/Background-Venues.png"
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';

import ConfigObj from '../config/params';
import Auth0 from 'react-native-auth0';
const auth0Obj = new Auth0({ domain: ConfigObj.auth0.domain, clientId: ConfigObj.auth0.clientId });

const API_BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/';

const S3_ASSETS_BASE_URL = 'https://s3.us-east-2.amazonaws.com/swiftmile-app-assets/ui-images/';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const POIClustersData = poiClusters;
const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';
const VenuesData = parseMarkers();

function parseMarkers()
  {
    // console.log("Parsing Markers!");
    let markers = [];
    // console.log("polygons----");
    // console.dir(POIClustersData);
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      // console.dir(POIClustersData[i].pois);
      for (var j = POIClustersData[i].pois.length - 1; j >= 0; j--) {
        markers.push(POIClustersData[i].pois[j]);
        // console.dir(POIClustersData[i].pois[j]);
      }
    }
    // console.log("Markers-----");
    // console.dir(markers);
    return markers;
  }

  function val2key(val,array){
    for (var key in array) {
      this_val = array[key];
      if(this_val == val.key){
          return key;
          break;
      }
    }
  }

  function indexToVenueKey(index, array)
  {
    return array[index].key;
  }
class VenueInfo extends React.Component {

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    // console.log("Parameters: ---");
    // console.dir(params);
    // this.props.initialSlide = 2;
    this.state = {};
    this.state.userLoggedIn = this.props.screenProps.userLoggedIn;
    // this.state.initialSlide = 10;
    this.state.VenuesData = VenuesData;
    // if(typeof(params) !== 'undefined' && typeof(params.venueKey) !== 'undefined')
    // {
      // this.props.initialSlide = val2key(params.venueKey,VenuesData);
      // console.log("Swiper index");
      // console.log(this.props.initialSlide);
       // console.log(val2key(params.venueKey,VenuesData));
      // this.swiper.index = params.venueKey;
    // }
    // else
    // {
      // this.props.initialSlide = 10;
      // console.log("venueKey not found");
    // }

    // console.log("Inside VenueInfo constructor");
    // console.log("Inside VenueInfo constructor: props");
    // console.dir(props);

  };

  showCheckInScreen(e, venue_key)
  {
    if(typeof(e.nativeEvent.target) !== 'undefined')
    {
      this.props.navigation.navigate('CameraScreen', {venueKey: venue_key});
    }
  }

  checkAuth(e, venue_key)
  {
    console.log("Inside CheckAuth");
        AsyncStorage.getItem("@userIdToken").then(userIdToken => {
            if(userIdToken == null){
                 // this.state.loading = false;
                 auth0Obj
            .webAuth
            .authorize({scope: 'openid email', audience: 'https://fiduciam.auth0.com/userinfo'})
            .then(credentials =>{
              // console.log('Credentials start - ');
              // console.log(credentials); 
              // console.log('- credentials end');
              // Successfully authenticated
              // Store the accessToken
              // const storeUserToken = await AsyncStorage.setItem("@userIdToken", userIdToken);
              const storeUserToken = AsyncStorage.setItem("@userIdToken", credentials.idToken);
              this.setState({userLoggedIn: true});
              this.setState({userIdToken: credentials.idToken});
              this.props.screenProps.userToken = credentials.idToken;
              this.props.screenProps.userLoggedIn = true;

              fetch(API_BASE_URL+'users/', {
                    method: 'POST',
                    headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.props.screenProps.userToken
                              }
                  })
                  .then((response) => response.json(true))
                  .then((responseData) => {
                    console.log("received response data from server");
                    // console.log(JSON.parse(responseData.body));
                    this.props.screenProps.userId = responseData.body.id;
                    /**/
                    //redirect to Camera screen
                    console.log("Venue key");
                    console.log(venue_key);

                    // var venue_key = indexToVenueKey(this.swiper.index, VenuesData);
                    // console.log("Current Swiper index");
                    // console.log(this.swiper.index);
                    // console.log("Venue data");
                    // console.log(VenuesData);
                    this.props.navigation.navigate('CameraScreen', {venueKey: venue_key});
                    /**/
                  })
                  .catch((error) => { console.log(error); })
                  .done();






            }
            ).catch(error => 
            {
              alert("Authentication failed!")
              // console.log('Error occured - ');
              // console.log(error);
            });
            }
            else
            {
              this.props.screenProps.userToken = userIdToken;
              // this.props.navigation.navigate('Menu', {});
                // console.log("User Already Logged In - redirect to next intended state");
                // console.log(userIdToken);
            }})
            .catch(error => 
        {
          console.log('Error occured - ');
          console.log(error);
        });

// @userIdToken
// @tokenExpiration
// @userId
// @firstTimeUser

  }

  componentDidMount()
  {
    // this.swiper.index = this.state.initialSlide;
    // this.swiper.index = 3;
    // AsyncStorage.getItem("@userIdToken").then(userIdToken => {
    //   console.log("User Already LoggedIn - VenueInfo Page");
    //   console.log(userIdToken);
    //   // this.setState({userLoggedIn: true});
    // }).catch(error => 
    //         {
    //           alert("Authentication check failed!")
    //         });
  }

  // getVal(val){
  //   console.warn(val);
  //   //source={{ uri: S3_ASSETS_BASE_URL+"Background-Venues.png", cache: 'force-cache' }}
  // }

  render() {
          return (
              <Swiper style={styles.wrapper} 
              showsButtons={true}
              index={this.props.screenProps.currentVenueIndex}
              ref={ref => { this.swiper = ref; }}
              >
              {
              this.state.VenuesData.map(venue => (
                <View style={styles.slide1}
                  key={venue.key}
                >
                <Image
                  key={venue.key}
                  source={VenueBackgroundImage}
                  style={ styles.image }
                  >
                  <View 
                    style={{ justifyContent: 'center' }}
                    >
                    <Text style={styles.text}>{venue.title}</Text>
                    <Text style={styles.text}>{venue.description}</Text>
                    <Image 
                      style={{
                        height:200,
                        width:200
                      }}
                      source={{ uri: venue.markerImage, cache: 'force-cache'}}
                      />

                  </View>

                  <View 
                    style={{ justifyContent: 'center' }}
                   >
                    <Text style={styles.text}>Venue Directions Map Goes here</Text>
                  </View>
                  <View
                    style={{ justifyContent: 'center' }}
                  >
                    <Text style={styles.text}>Venue Offers Goes here</Text>
                    <Text style={styles.text}>Venue Offers Goes here</Text>
                    {
                      !this.state.userLoggedIn ?
                      <Button
                        key={venue.key}
                        onPress={e => this.checkAuth(e, venue.key) }
                        title="Login to CheckIn Here"
                        textStyle={{textAlign: 'center'}}
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        accessibilityLabel="Checkin here by taking a selfie"
                      />
                      :
                      <Button
                        key={venue.key}
                        onPress={e => this.showCheckInScreen(e, venue.key)}
                        title="CheckIn Here"
                        textStyle={{textAlign: 'center'}}
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        accessibilityLabel="Checkin here by taking a selfie"
                      />
                    }
                  </View>
                </Image>    
                </View>              
              ))}
              
            </Swiper>
      );
    }
  }
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image:{
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});


module.exports = VenueInfo;