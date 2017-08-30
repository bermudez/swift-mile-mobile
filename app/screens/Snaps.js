import React, { Component } from 'react';
import { ScrollView, Text, Image, AsyncStorage, View, BackgroundImage, StyleSheet, Dimensions } from 'react-native';
import Signin from './auth/Auth0Signin';

import ConfigObj from '../config/params';
import Auth0 from 'react-native-auth0';
const auth0Obj = new Auth0({ domain: ConfigObj.auth0.domain, clientId: ConfigObj.auth0.clientId });

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const API_BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/';
const BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/snaps/';
const USER_IMAGES_BASE_URL = 'https://s3.us-east-2.amazonaws.com/swiftmile-app-assets/';

class Snaps extends Component {
  constructor(props)
  {
    console.log("Inside Snaps List - constructor");

    super(props);
    this.state = {};
    this.state.myCheckIns = null;
  }

  componentDidMount(){
    this.checkAuth();
    // if(this.props.screenProps.userLoggedIn)
    // {
    //   this.fetchData();
    // }
    // else
    // {
    //   this.props.navigation.navigate('Signin', {NKCLastScreen: 'snaps'});
    // }
  }

// @userIdToken
// @tokenExpiration
// @userId
// @firstTimeUser
checkAuth()
  {
    AsyncStorage.getItem("@userIdToken").then(userIdToken => {
      if(userIdToken == null){
           auth0Obj
      .webAuth
      .authorize({scope: 'openid email', audience: 'https://fiduciam.auth0.com/userinfo'})
      .then(credentials =>{
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
              this.fetchData();
              /**/
            })
            .catch((error) => { console.log(error); })
            .done();






        }
        ).catch(error => 
        {
          alert("Authentication failed!")
          // console.log('Error occured - ');
          console.log(error);
        });
        }
        else
        {
          this.props.screenProps.userToken = userIdToken;
          this.fetchData();
        }})
        .catch(error => 
    {
      console.log('Error occured - ');
      console.log(error);
    });
  }

  fetchData()
  {
    let userIdToken_temp = this.props.screenProps.userToken;
    fetch(BASE_URL, {
      method: 'GET',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userIdToken_temp
                }
    })
    .then((response) => response.json(true))
    .then((responseData) => {
      console.log("received response data from server");
      this.setState({myCheckIns: JSON.parse(responseData.body)});
      console.log(responseData);
    })
    .catch((error) => {
                console.log(error);
                })
    .done();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            !this.state.myCheckIns ?
            <Text 
              style={ styles.checkin_wrapper} 
            >
              Loading your checkins, please wait...
            </Text>
            : this.state.myCheckIns.length==0 ?
            <Text style={ styles.checkin_wrapper} >No checking...</Text>
            :
            this.state.myCheckIns.map((myCheckIn) => (
            <View 
              key={myCheckIn.id}
              style={styles.checkin_wrapper}
            >
              <Image
                source={{ uri: USER_IMAGES_BASE_URL + myCheckIn.image_url, cache: 'force-cache'}}
                style={ styles.checkinImage }
              >
              </Image>
              </View>
              ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  checkin_wrapper:{
    width: 200,
    height: 200,
    padding: 20,
    margin: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d6d7da',
    borderColor: '#d6d7da'

  },
  checkinImage:{
    width: 160,
    height: 160
  }
});

export default Snaps;
