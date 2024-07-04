import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

function ProfilePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Page</Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfilePage;
