import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Menu from '../screens/Menu';
import ImageMap from '../screens/ImageMap';
import Map from '../screens/Map';
import Schedule from '../screens/Schedule';
import Badges from '../screens/Badges';
import Faq from '../screens/Faq';
import Snaps from '../screens/Snaps';
import VenueInfo from '../screens/VenueInfo';


import Settings from '../screens/Settings';
import Me from '../screens/Me';

export const FeedStack = StackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
    },
  },
  ImageMap: {
    screen: ImageMap,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
    }),
  },
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
    }),
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: ({ navigation }) => ({
      title: 'Schedule',
    }),
  },
  Badges: {
    screen: Badges,
    navigationOptions: ({ navigation }) => ({
      title: 'Badges',
    }),
  },
  Faq: {
    screen: Faq,
    navigationOptions: ({ navigation }) => ({
      title: 'FAQ',
    }),
  },
  VenueInfo: {
    screen: VenueInfo,
    navigationOptions: ({ navigation }) => ({
      title: 'VenueInfo',
    }),
  },
  Snaps: {
    screen: Snaps,
    navigationOptions: ({ navigation }) => ({
      title: 'Snaps',
    }),
  },


});

export const Tabs = TabNavigator({
  Menu: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Menu',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
