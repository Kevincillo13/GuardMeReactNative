import React from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import useWebSocket from '../hooks/useWebSocket';
import ECGGraph from '../components/ECGGraph';

const HomePage = () => {
    const { data, isConnected } = useWebSocket('ws://your_server_address:8080');
    const image = require('../assets/background.jpg'); 

    return (
        <SafeAreaView style={styles.container}>
            {/* Fondo de pantalla */}
            <ImageBackground source={image} resizeMode="cover" style={styles.image} blurRadius={5}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>GUARDME</Text>
                    {/* Heart Rate Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Heart rate</Text>
                        <Text style={styles.heartRate}>
                            {data ? `${data.heartRate} ` : 'Loading... '}
                            <Text style={styles.bpm}>BPM</Text>
                        </Text>
                    </View>

                    {/* Blood Oxygen Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Blood Oxygen</Text>
                        <Text style={styles.bloodOxygen}>
                            {data ? `${data.bloodOxygen} ` : 'Loading... '}
                            <Text style={styles.percent}>%</Text>
                        </Text>
                    </View>

                    {/* ECG Graph */}
                    {data && data.ecgData.length > 0 ? (
                        <ECGGraph ecgData={data.ecgData} />
                    ) : (
                        <Text style={styles.loadingText}></Text>
                    )}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
    },
    heartRate: {
        fontSize: 32,
        color: 'red',
    },
    bpm: {
        fontSize: 16,
        color: 'red',
    },
    bloodOxygen: {
        fontSize: 32,
        color: 'red',
    },
    percent: {
        fontSize: 16,
        color: 'red',
    },
    loadingText: {
        fontSize: 16,
        color: 'black',
        marginTop: 20,
    },
});

export default HomePage;