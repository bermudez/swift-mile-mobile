import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const line1 = "NKCGo, the Ultimate Guide to North Kansas City, MO!";
const line2 = "Check-in at dozens of points of interests along our famous mile-and-a-half Pint Path, track your progress among new local discoveries, and win prizes during NKC events like September's Swift Mile, our summertime Arts in the Park, and the long-running Snake Saturday Parade in March!";
const line3 = "The NKCGo app is your guide to entertainment, events, points of interest and the community of North Kansas City. From restaurants and bars, breweries and distilleries, retail and entertainment venues, parks and community spaces to art installations and historical points of interest, North Kansas City has it all!";
const line4 = "Brought to you by Northland Festivals/Snake Saturday & The Swift Mile Street Festival."


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
			<View>
			<Text style={styles.titleText}>
			    {line1}{'\n'}{'\n'}{line2}{'\n'}{'\n'}
					{line3}{'\n'}{'\n'}{line4}
			</Text>
			</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default About;
