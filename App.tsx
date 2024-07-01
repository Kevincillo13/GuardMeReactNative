// App.js o App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './providers/AuthProvider';
import AuthStack from './routes/AuthStack';
import AppStack from './routes/AppStack';
import useAuth from './hooks/useAuth';

function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

