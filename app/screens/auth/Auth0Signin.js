import { ScrollView, Text, AsyncStorage } from 'react-native';
import React from 'react';
import Auth0 from 'react-native-auth0';
import ConfigObj from '../../config/params';

const auth0Obj = new Auth0({ domain: ConfigObj.auth0.domain, clientId: ConfigObj.auth0.clientId });
const API_BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/';
const AUTH0_DOMAIN = 'https://fiduciam.auth0.com';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {};
    this.state.userLoggedIn = false;
  };

// @userIdToken
// @tokenExpiration
// @userId
// @firstTimeUser
// @userLoggedIn

  checkAuth()
  {
    console.log("Login Screen - Inside CheckAuth");
    AsyncStorage.getItem("@userIdToken").then(userIdToken => {
      if(userIdToken == null){ 
        auth0Obj
            .webAuth
            .authorize({scope: 'openid email', audience: AUTH0_DOMAIN + '/userinfo'})
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
                    console.log("Auth0 SignIn Screen - received response data from server");
                    // console.log(JSON.parse(responseData.body));
                    this.props.screenProps.userId = responseData.body.id;

                    this.props.navigation.goBack();
                    console.log(this.props);
                    console.log("Going to previous Screen");
                  })
                  .catch((error) => { console.log(error); })
                  .done();

            })
            .catch(error => {
                console.log(error);
              alert("Authentication failed!")
            });
        }
        else
        {
          this.props.screenProps.userToken = userIdToken;
          this.props.navigation.goBack();
          console.log(this.props);
          console.log("Token taken from Local storage - Going to previous Screen");
        }})
        .catch(error => {
          // console.log('Error occured - ');
          console.log(error);
        });
  }

  componentDidMount()
  {
    this.checkAuth();
  }

  render() {
    return (
    <ScrollView>
        <Text>
            Please wait while we are processing your Login!
        </Text>
    </ScrollView>
    );
   }

}

module.exports = Signin;

