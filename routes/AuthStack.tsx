import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SingUpPage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const { authData, login, logout } = useAuth();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="singUp" component={SignUpPage} />
      </Stack.Navigator>
    </>
  );
}

export default AuthStack;
