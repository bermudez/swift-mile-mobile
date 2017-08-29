import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../globals/styles';
import ConfigObj from '../config/params';
import Auth0 from 'react-native-auth0';

const auth0Obj = new Auth0({ domain: ConfigObj.auth0.domain, clientId: ConfigObj.auth0.clientId });

class Me extends Component {

  constructor(props)
  {
  	super(props);
  	console.log(ConfigObj.auth0);
  }
  componentDidMount()
  {
  	//, audience: 'https://fiduciam.auth0.com/userinfo'

	auth0Obj
	    .webAuth
	    .authorize({scope: 'openid email', audience: 'https://fiduciam.auth0.com/userinfo'})
	    .then(credentials =>{
	    	console.log('Credentials start - ');
	    	console.log(credentials);	
	    	console.log('- credentials end');
	      // Successfully authenticated
	      // Store the accessToken
	    })
	    .catch(error => 
	    	{
	    		console.log('Error occured - ');
	    		console.log(error);
	    	}
	    );

  }

  checkAuth()
  {
        AsyncStorage.getItem("@userIdToken").then(userIdToken => {
            if(userIdToken == null){
                 this.state.loading = false;
                 auth0Obj
				    .webAuth
				    .authorize({scope: 'openid email', audience: 'https://fiduciam.auth0.com/userinfo'})
				    .then(credentials =>{
				    	console.log('Credentials start - ');
				    	console.log(credentials);	
				    	console.log('- credentials end');
				      // Successfully authenticated
				      // Store the accessToken
				    	// const storeUserToken = await AsyncStorage.setItem("@userIdToken", userIdToken);
				    	const storeUserToken = AsyncStorage.setItem("@userIdToken", userIdToken);
				    	this.props.navigation.goBack();
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
            	this.props.navigation.navigate('Menu', {});
                console.log("User Already Logged In - redirect to next intended state");
                console.log(userIdToken);
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

  render() {

    return (
      <ScrollView>

      </ScrollView>
    );
  }
}

export default Me;
