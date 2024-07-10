import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Linking, KeyboardAvoidingView } from 'react-native';

export default function SignUpPage({navigation}) {
    
    const image = require('../assets/background.jpg');
    
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.container}>
                {/* Fondo de pantalla */}
                <ImageBackground source={image} resizeMode="cover" style={styles.image} blurRadius={5}>
                    <View style={styles.signupContainer}>
                        <Text style={styles.title}>Sign Up</Text>

                        {/* Campo de nombre de usuario */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>User name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter user name"
                                placeholderTextColor="#A9A9A9"
                            />
                        </View>

                        {/* Campo de correo electrónico */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor="#A9A9A9"
                            />
                        </View>

                        {/* Campo de contraseña */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor="#A9A9A9"
                                secureTextEntry
                            />
                        </View>

                        {/* Campo de confirmación de contraseña */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm password"
                                placeholderTextColor="#A9A9A9"
                                secureTextEntry
                            />
                        </View>

                        {/* Botón de registro */}
                        <TouchableOpacity style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* Texto "Already have an account?" con enlace al inicio de sesión */}
                        <Text style={styles.loginText}>
                            Already have an account?{' '}
                            <Text onPress={() => {navigation.navigate("login")}} style={styles.loginLink}>
                                Login
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
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    signupContainer: {
        backgroundColor: 'transparent',
        padding: 10,
        width: 300,
        marginLeft: '9%',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginVertical: 10,
        
    },
    inputLabel: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
        padding: 10,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontSize: 16,
    },
    signupButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    signupButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    loginLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    aboutUsLink: {
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
        color: '#1E90FF',
    },
});
