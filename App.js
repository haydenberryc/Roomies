import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { firebaseConfig } from './config';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoadingScreen from './screens/LoadingScreen';
import GroupScreen from './screens/GroupScreen';
import CalendarScreen from './screens/CalendarScreen';
import EventFormScreen from './screens/EventFormScreen';

import * as firebase from 'firebase';

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
