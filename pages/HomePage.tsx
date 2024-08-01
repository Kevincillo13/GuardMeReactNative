import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import useWebSocket from '../hooks/useWebSocket';

const HomePage = () => {
    const { data, isConnected } = useWebSocket('ws://your_server_address:8080');

    return (
        <ImageBackground source={require('../assets/brainBG.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>GUARDME</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        {/* Heart Rate Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Heart Rate</Text>
                            <Text style={styles.heartRate}>
                                {data ? `${data.heartRate} ` : '74'}
                                <Text style={styles.bpm}>BPM</Text>
                            </Text>
                        </View>

                        {/* Blood Oxygen Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Blood Oxygen</Text>
                            <Text style={styles.bloodOxygen}>
                                {data ? `${data.bloodOxygen} ` : '95'}
                                <Text style={styles.percent}>%</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
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
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    titleContainer: {
        paddingTop: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E90FF',
        textTransform: 'uppercase',
        letterSpacing: 2,
        textShadowColor: '#000', // Sombra negra
        textShadowOffset: { width: 0, height: 1 }, // Desplazamiento de la sombra
        textShadowRadius: 1, // Desenfoque de la sombra
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        marginVertical: 15,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,

    },
    heartRate: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#E74C3C',
        textShadowColor: '#000', // Sombra negra
        textShadowOffset: { width: 0, height: 1 }, // Desplazamiento de la sombra
        textShadowRadius: 1, // Desenfoque de la sombra
    },
    bpm: {
        fontSize: 18,
        color: '#E74C3C',
    },
    bloodOxygen: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#3498DB',
        
        textShadowColor: '#000', // Sombra negra
        textShadowOffset: { width: 0, height: 1 }, // Desplazamiento de la sombra
        textShadowRadius: 1, // Desenfoque de la sombra
    },
    percent: {
        fontSize: 18,
        color: '#3498DB',
    },
});

export default HomePage;


