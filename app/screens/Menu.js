import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { menuItems } from '../config/data';

class Menu extends Component {
  onNavigateTo = (menuItem) => {
    this.props.navigation.navigate(`${menuItem.screen}`, { ...menuItem });
  };

  render() {
    return (
      <ScrollView>
        <List>
          {menuItems.map((menuItem) => (
            <ListItem
              key={menuItem.title}
              title={`${menuItem.title.toUpperCase()}`}
              onPress={() => this.onNavigateTo(menuItem)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Menu;
