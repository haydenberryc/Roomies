import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoadingScreen from './screens/LoadingScreen';
import GroupScreen from './screens/GroupScreen';
import CalendarScreen from './screens/CalendarScreen';
import EventFormScreen from './screens/EventFormScreen';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCeE9R9VgRC0PLFcrTB4o0bwjfodDcASy4",
  authDomain: "roommatescheduler.firebaseapp.com",
  databaseURL: "https://roommatescheduler.firebaseio.com",
  projectId: "roommatescheduler",
  storageBucket: "roommatescheduler.appspot.com",
  messagingSenderId: "85029936204",
  appId: "1:85029936204:web:c5f09800e848b9a47f28e9",
  measurementId: "G-DXGKYE5TX9"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  GroupScreen: GroupScreen,
  CalendarScreen: CalendarScreen,
  EventFormScreen: EventFormScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
