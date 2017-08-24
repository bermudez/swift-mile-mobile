import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

/* Main Menu Screens */
import Menu from '../screens/Menu';
import Schedule from '../screens/Schedule';
import Map from '../screens/Map';
import VenueInfo from '../screens/VenueInfo';
import CameraScreen from '../screens/CameraScreen'; // Need login
import Badges from '../screens/Badges'; // Need login
import Snaps from '../screens/Snaps'; // Need login
import Me from '../screens/Me'; // Need login
import About from '../screens/About';

/* User on boarding screens */
import Signin from '../screens/auth/Signin';
import SignUp from '../screens/auth/SignUp';
import StartTour from '../screens/onboarding/StartTour';
import WelcomeCarouselOne from '../screens/onboarding/WelcomeCarouselOne';
import WelcomeCarouselTwo from '../screens/onboarding/WelcomeCarouselTwo';
import WelcomeCarouselThree from '../screens/onboarding/WelcomeCarouselThree';

export const AppMainMenuStack = StackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
    },
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: ({ navigation }) => ({
      title: 'Schedule',
    }),
  },
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
    }),
  },
  VenueInfo: {
    screen: VenueInfo,
    navigationOptions: ({ navigation }) => ({
      title: 'VenueInfo',
    }),
  },
  Badges: {
    screen: Badges,
    navigationOptions: ({ navigation }) => ({
      title: 'Badges',
    }),
  },
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'CheckIn',
    }),
  },
  Snaps: {
    screen: Snaps,
    navigationOptions: ({ navigation }) => ({
      title: 'Snaps',
    }),
  },
  Me: {
    screen: Me,
    navigationOptions: ({ navigation }) => ({
      title: 'Me',
    }),
  },
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      title: 'About',
    }),
  },
});

export const AppOnBoardingStack = StackNavigator({
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

export const Root = StackNavigator({
    AppMainMenuStack:{
      screen: AppMainMenuStack,
    },
    AppOnBoardingStack: {
      screen: AppOnBoardingStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  });
