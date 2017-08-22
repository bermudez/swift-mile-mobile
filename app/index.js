import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Root, Tabs } from './config/router';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.userToken = null;
		this.state.firstTimeUser = null;
		// this.setState = {
		//     userToken: null,
		//     firstTimeUser: null
		// };
	}

	componentDidMount(){
        AsyncStorage.getItem("@firstTimeUser").then(value => {
            if(value == null){
            	console.log("First Time: ");
            	console.dir(value);
                 AsyncStorage.setItem('@firstTimeUser', '1'); // No need to wait for `setItem` to finish, although you might want to handle errors
                 this.state.firstTimeUser=true;
                 console.log("firstTimeUser state set to true");
            }
            else
            {
            	console.log("Repeat User");
                 this.setState({firstTimeUser: false});
            }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
    	console.log("constructor post AsyncStorage.");
    }
  render() {
  	
    return <Root screenProps={{userToken: this.state.userToken, firstTimeUser: this.state.firstTimeUser}} />;
  }
}

export default App;
