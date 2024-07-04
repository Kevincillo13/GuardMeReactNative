import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo, FontAwesome } from '@expo/vector-icons';
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
    height: 80,
    backgroundColor: "#fff",
    borderTopColor: "#0f74d3",
    borderTopWidth: 0,
    paddingBottom: 15,
  },
};

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen 
        name="home" 
        component={HomePage} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              borderRadius: 25,
              backgroundColor: focused ? '#0f74d3' : 'transparent',
              paddingTop: 8,
              paddingBottom: 10,
              transform: [{ scale: focused ? 1.2 : 1 }],
            }}>
              <FontAwesome name="home" size={24} color={focused ? 'white' : '#0f74d3'} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="patient" 
        component={PatientPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              borderRadius: 25,
              backgroundColor: focused ? '#0f74d3' : 'transparent',
              paddingTop: 8,
              paddingBottom: 10,
              transform: [{ scale: focused ? 1.2 : 1 }],
            }}>
              <FontAwesome name="user-md" size={24} color={focused ? 'white' : '#0f74d3'} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="qr" 
        component={QRPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              borderRadius: 25,
              backgroundColor: focused ? '#0f74d3' : 'transparent',
              paddingTop: 8,
              paddingBottom: 10,
              transform: [{ scale: focused ? 1.2 : 1 }],
            }}>
              <FontAwesome name="qrcode" size={24} color={focused ? 'white' : '#0f74d3'} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              borderRadius: 25,
              backgroundColor: focused ? '#0f74d3' : 'transparent',
              paddingTop: 8,
              paddingBottom: 10,
              transform: [{ scale: focused ? 1.2 : 1 }],
            }}>
              <FontAwesome name="user" size={24} color={focused ? 'white' : '#0f74d3'} />
            </View>
          ),
        }}
      />
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
