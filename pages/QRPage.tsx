import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

function QRPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>QR Page</Text>
      </View>
    </SafeAreaView>
  );
}

export default QRPage;
