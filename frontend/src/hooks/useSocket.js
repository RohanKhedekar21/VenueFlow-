import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Empty string defaults to window.location (relative)
const SOCKET_URL = '';

export const useSocket = () => {
  const [data, setData] = useState({ crowdData: {}, waitTimes: {} });
  const [insight, setInsight] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    const handleConnect = () => {
      setIsConnected(true);
      console.log('Connected to VenueFlow sync engine');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from VenueFlow sync engine');
    };

    const handleVenueUpdate = (payload) => {
      setData(payload);
    };

    const handleInsight = (payload) => {
      setInsight(payload.message);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('venueUpdate', handleVenueUpdate);
    socket.on('aiInsight', handleInsight);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('venueUpdate', handleVenueUpdate);
      socket.off('aiInsight', handleInsight);
      socket.disconnect();
    };
  }, []);

  return { data, insight, isConnected };
};
