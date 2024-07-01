import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ImageBackground, ViewProps, KeyboardAvoidingView } from 'react-native';
import useAuth from '../hooks/useAuth';

export type LoginCardPropos = ViewProps & {
    handleSetSessions: Function
};

export default function LoginPage({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    
    const image = require('../assets/background.jpg');

    const handleLogin = async () => {
        await login(email,password)
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
                                onChangeText={(setEmail)}
                            />
                        </View>

                        {/* Campo de contraseña */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor="#A9A9A9"
                                onChangeText={(setPassword)}
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
                            <Text onPress={()=>{navigation.navigate("singUp")}} style={styles.signupLink}>
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
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: 300,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginVertical: 10,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        padding: 10,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    switchText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333333',
    },
    loginButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
    },
    signupLink: {
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
