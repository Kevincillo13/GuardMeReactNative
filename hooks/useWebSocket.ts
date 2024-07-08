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
                    setData(message);
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
        };

        return () => {
            ws.close();
        };
    }, [url]);

    return { data, isConnected };
};

export default useWebSocket;