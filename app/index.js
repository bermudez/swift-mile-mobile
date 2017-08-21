import React, { Component } from 'react';
import { Root, Tabs } from './config/router';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    userToken: null,
		    firstTimeUser: true
		}
	}
  render() {
    return <Root screenProps={{userToken: this.state.userToken, firstTimeUser: this.state.firstTimeUser}} />;
  }
}

export default App;
