import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ImageBackground, ViewProps, KeyboardAvoidingView } from 'react-native';
import useAuth from '../hooks/useAuth';

export type LoginCardPropos = ViewProps & {
    handleSetSessions: Function
};

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useAuth();

    const image = require('../assets/background.jpg');

    const handleLogin = async () => {
        console.log(`Attempting login with email: ${email}, password: ${password}`);
        await login(email, password);
        if (user) {
            console.log("Login successful, navigating to home screen");
            navigation.navigate("singUp");
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.container}>
                {/* Fondo de pantalla */}
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>Login</Text>

                        {/* Campo de correo electrónico */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor="#A9A9A9"
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* Campo de contraseña */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor="#A9A9A9"
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {/* Switch para "Remember me" */}
                        <View style={styles.switchContainer}>
                            <Switch />
                            <Text style={styles.switchText}>Remember me</Text>
                        </View>

                        {/* Botón de inicio de sesión */}
                        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        {/* Texto "Don't have an account?" con enlace a la página de registro */}
                        <Text style={styles.signupText}>
                            Don't have an account?{' '}
                            <Text onPress={() => { navigation.navigate("singUp") }} style={styles.signupLink}>
                                SignUp
                            </Text>
                        </Text>

                        {/* Enlace a la página "About Us" */}
                        <Text
                            style={styles.aboutUsLink}
                            onPress={() => {
                                // Aquí puedes definir la URL de la página "About Us"
                                Linking.openURL('https://tu-sitio.com/AboutUs');
                            }}
                        >
                            About Us
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },

    title: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: 'white',
    },
    inputContainer: {
      marginVertical: 10,
      marginHorizontal: 35,
      width: '80%',
    },
    inputLabel: {
      fontSize: 16,
      color: 'white',
      marginBottom: 5,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semitransparente
      borderRadius: 5,
      padding: 10,
      borderColor: '#DDDDDD',
      borderWidth: 1,
      fontSize: 16,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginVertical: 10,

    },
    switchText: {
      fontSize: 16,
      color: 'white',
    },
   
    loginButton: {
      backgroundColor: '#1E90FF',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      width: '80%',
      marginTop: 20,
      marginHorizontal: 35,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signupText: {
      textAlign: 'center',
      marginTop: 20,
      color: 'white',
    },
    signupLink: {
      color: '#1E90FF',
      fontWeight: 'bold',
    },
    aboutUsLink: {
      textAlign: 'center',
      marginTop: 10,
      textDecorationLine: 'underline',
      color: 'white',
    },
  });