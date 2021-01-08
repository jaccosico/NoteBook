import React, { useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { stylesheet, colors } from '../styles/globalStyles';

import Notes from '../screens/Notes';
import NoteDetails from '../screens/NoteDetails';
import Header from '../styles/Header';
import NextHeader from '../styles/NextHeader';
import Intro from '../screens/Intro';


const screens = {
  Intro :{
    screen: Intro,    //This will render SplashScreen at 1st time
    navigationOptions: {
          header: null,
        }
  },
  Notes: {
    screen: Notes,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Notes'/>,
      };
    },
  },
  NoteDetails: {
    screen: NoteDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <NextHeader title={navigation.getParam('topic')}/>,
      };
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: colors.dark,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
});

export default createAppContainer(HomeStack);
