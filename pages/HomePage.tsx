import React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';

function HomePage({ navigation }) {
  const { authData, login, logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="camera" onPress={() => { navigation.navigate("camera") }} />
        <Button title="image" onPress={() => { navigation.navigate("image") }} />
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}

export default HomePage;
