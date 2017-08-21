import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

/* LoggedIn user screens */
import Menu from '../screens/Menu';
import ImageMap from '../screens/ImageMap';
import Map from '../screens/Map';
import Schedule from '../screens/Schedule';
import Badges from '../screens/Badges';
import Faq from '../screens/Faq';
import Snaps from '../screens/Snaps';
import VenueInfo from '../screens/VenueInfo';

/* LoggedIn user screens */
import Settings from '../screens/Settings';
import Me from '../screens/Me';

/* user LoggedOut user / onboarding screens */
import Signin from '../screens/auth/Signin';
import SignUp from '../screens/auth/SignUp';
import StartTour from '../screens/onboarding/StartTour';
import WelcomeCarouselOne from '../screens/onboarding/WelcomeCarouselOne';
import WelcomeCarouselTwo from '../screens/onboarding/WelcomeCarouselTwo';
import WelcomeCarouselThree from '../screens/onboarding/WelcomeCarouselThree';

export const LoggedInAppStack = StackNavigator({
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

export const LoggedOutAppStack = StackNavigator({
  Signin: {
    screen: Signin,
    navigationOptions: ({ navigation }) => ({}),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({}),
  },
  StartTour: {
    screen: StartTour,
    navigationOptions: {},
  },
  WelcomeCarouselOne: {
    screen: WelcomeCarouselOne,
    navigationOptions: ({ navigation }) => ({}),
  },
  WelcomeCarouselTwo: {
    screen: WelcomeCarouselTwo,
    navigationOptions: ({ navigation }) => ({}),
  },
  WelcomeCarouselThree: {
    screen: WelcomeCarouselThree,
    navigationOptions: ({ navigation }) => ({}),
  }
});

export const Tabs = TabNavigator({
  Menu: {
    screen: LoggedInAppStack,
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
  LoggedOutAppStack:{
    screen: LoggedOutAppStack,
  },
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
