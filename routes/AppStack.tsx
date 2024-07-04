import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import PatientPage from '../pages/PatientPage';
import QRPage from '../pages/QRPage';
import ProfilePage from '../pages/ProfilePage';
import PatientRegisterPage from '../pages/PatientRegisterPage';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff"
  }
};

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="patient" component={PatientPage} />
      <Tab.Screen name="qr" component={QRPage} />
      <Tab.Screen name="profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={BottomTabs} />
      <Stack.Screen name="patientRegister" component={PatientRegisterPage} />
    </Stack.Navigator>
  );
}

export default AppStack;
