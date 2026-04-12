import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Empty string defaults to window.location (relative)
const SOCKET_URL = '';

export const useSocket = () => {
  const [data, setData] = useState({ crowdData: {}, waitTimes: {} });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to VenueFlow sync engine');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from VenueFlow sync engine');
    });

    socket.on('venueUpdate', (newData) => {
      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { data, isConnected };
};
