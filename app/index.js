import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Root, Tabs } from './config/router';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.userToken = null;
		this.state.firstTimeUser = null;
        this.state.userLoggedIn = false;
        this.state.userId = null;
	}

	componentDidMount(){
        AsyncStorage.getItem("@userId").then(value => {
            if(value != null){
                 this.setState({userId: value});
            }
        }).catch((error) => {
                console.log(error);
            });
        AsyncStorage.getItem("@firstTimeUser").then(value => {
            if(value == null){
            	console.log("App Root - First Time: ");
            	console.dir(value);
                 AsyncStorage.setItem('@firstTimeUser', '1');
                 this.state.firstTimeUser=true;
                 console.log("App Root - firstTimeUser state set to true");
            }
            else
            {
            	console.log("App Root - Repeat User");
                this.setState({firstTimeUser: false});
            }}).then(()=>{
                AsyncStorage.getItem("@userIdToken").then(userIdToken => {
                    if(userIdToken != null){
                        this.setState({userToken: userIdToken});
                        this.setState({userLoggedIn: true});
                    }
                    else
                    {
                        this.setState({userToken: null});
                        this.setState({userLoggedIn: false});
                    }
                });
            }).catch((error) => {
                console.log(error);
                // Alert.alert('problem while fetching badges data');
            });
    	console.log("App Root - constructor post AsyncStorage.");
    }
    
    setUserToken(userToken)
    {
        this.setState({
          userToken: userToken
        });
    }

  render() {
  	
    return <Root screenProps={{ userId: this.state.userId, userToken: this.state.userToken, firstTimeUser: this.state.firstTimeUser, userLoggedIn: this.state.userLoggedIn }} />;
  }
}

export default App;
