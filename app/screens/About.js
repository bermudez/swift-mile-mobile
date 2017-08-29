import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class About extends Component {
	constructor(props)
	{
		super(props);
		console.log('Inside About Page - Screen Props');
		console.log(this.props.screenProps);
	}

  render() {
    return (
      <ScrollView>
        
      </ScrollView>
    );
  }
}

export default About;
