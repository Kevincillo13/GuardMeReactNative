import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';

const ProfilePage = ({ navigation }) => {
  const { authData, logout } = useAuth();

  // Datos de ejemplo para mostrar en el perfil, reemplazados por authData si está disponible
  const profileData = {
    profilePicture: authData?.profilePicture || 'https://via.placeholder.com/100',
    name: authData?.name || 'Tony Villaverde',
    email: authData?.email || 'antoniovive@gmail.com'
  };

  return (
    <ImageBackground source={require('../assets/brainBG.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/tonti.jpeg')} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {/* Acción del nuevo botón */}}>
              <Text style={styles.buttonText}>Edit Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Ajustar la transparencia aquí
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10, // Ajusta la altura del botón
    paddingHorizontal: 20, // Ajusta el ancho del botón
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Espacio entre los botones
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfilePage;

