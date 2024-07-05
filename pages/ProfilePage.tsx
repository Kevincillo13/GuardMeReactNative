import { Button, View, Text, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';

function ProfilePage({ navigation }) {
  const { authData, logout } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}

export default ProfilePage;
