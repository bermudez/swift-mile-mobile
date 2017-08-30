import React from 'react';
import { Text, ScrollView, View, Image, BackgroundImage, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import Signin from './auth/Auth0Signin';

import ConfigObj from '../config/params';
import Auth0 from 'react-native-auth0';
const auth0Obj = new Auth0({ domain: ConfigObj.auth0.domain, clientId: ConfigObj.auth0.clientId });


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const API_BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/';
const BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/badges/';

class Badges extends React.Component {
  constructor(props) {
    super(props);
    // this.props.screenProps.userLoggedIn
    this.state = {};
    this.state.mybadges = null;

    console.log("Inside Badges constructor");
  };

  logloadedBAdges()
  {
    console.log(this.state.mybadges);
  }
  componentWillMount()
  {
    this.checkAuth();
    // if(this.props.screenProps.userLoggedIn)
    // {
    //   this.fetchData();
    // }
    // else
    // {
    //   this.props.navigation.navigate('Signin', {NKCLastScreen: 'badges'});
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

  fetchData() {

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
      // console.log(JSON.parse(responseData.body));
      // console.log(responseData.body[0]['max_granted']);
      // console.log(typeof(JSON.parse(responseData.body)));
      // console.log(responseData.body.json());
      // this.state.mybadges = JSON.parse(responseData.body);
      this.setState({mybadges: JSON.parse(responseData.body)});
      // console.log(this.state.mybadges);
      // this.state.mybadges = JSON.parse(responseData.body);
        // console.log(typeof(this.state.mybadges));
    })
    .catch((error) => {
                console.log(error);

                    // Alert.alert('problem while fetching badges data');
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
            <Text
              onPress={e => this.logloadedBAdges(e) }
              style={ styles.badge_wrapper}
            >
              Loading your badges, please wait...
            </Text>
            : this.state.mybadges.length==0 ?
            <Text style={ styles.badge_wrapper} >No badges awarded...</Text>
            :
            this.state.mybadges.map((mybadge) => (
            <View
              key={mybadge.key}
              style={styles.badge_wrapper}
            >
                <Image
                  source={{ uri: mybadge.image, cache: 'force-cache' }}
                  style={ styles.badgeImage }
                />
                <Text>{mybadge.badgeName}</Text>
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
    textAlign: 'center',
    backgroundColor: 'transparent',
    //backgroundColor: 'rgba(0,0,0,0)',
  },
  badge_wrapper:{
    width: 100,
    height: 100,
    padding: 10,
    margin: 15,
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
    // borderColor: '#d6d7da'

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
