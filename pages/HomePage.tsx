import React from 'react';
import { View, Text, SafeAreaView} from 'react-native';
import useWebSocket from '../hooks/useWebSocket';
import ECGGraph from '../components/ECGGraph';

const HomePage = () => {
    const { data, isConnected } = useWebSocket('ws://your_server_address:8080');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
            <Text>Heart Rate: {data ? data.heartRate : 'Loading...'}</Text>
            <Text>Blood Oxygen: {data ? data.bloodOxygen : 'Loading...'}</Text>
            {data && data.ecgData.length > 0 ? (
                <ECGGraph ecgData={data.ecgData} />
            ) : (
                <Text>Loading ECG data...</Text>
            )}
        </View>
        </SafeAreaView>
    );
};

export default HomePage;
