// hooks/useWebSocket.ts
import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
    const [data, setData] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setIsConnected(true);
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.heartRate && message.bloodOxygen && Array.isArray(message.ecgData)) {
                    const validEcgData = message.ecgData.map((value) =>
                        isFinite(value) ? value : 0
                    );
                    setData({
                        heartRate: isFinite(message.heartRate) ? message.heartRate : 0,
                        bloodOxygen: isFinite(message.bloodOxygen) ? message.bloodOxygen : 0,
                        ecgData: validEcgData,
                    });
                } else {
                    console.warn('Received invalid data:', message);
                }
            } catch (e) {
                console.error('Error parsing message:', e);
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log('Disconnected from WebSocket server');
            setTimeout(() => {
                useWebSocket(url);
            }, 1000);
        };

        return () => {
            ws.close();
        };
    }, [url]);

    return { data, isConnected };
};

export default useWebSocket;
