import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = '';
const SYSTEM_SECRET = 'stadium-integrity-lock-24';

/**
 * Technical Specification:
 * - Security: HMAC-SHA256 data signing verification.
 * - Performance: Throttled updates (max 1 per 500ms) to ensure UI silkiness.
 */
async function verifyData(payload, signature) {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SYSTEM_SECRET);
    const data = encoder.encode(JSON.stringify(payload));

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = new Uint8Array(signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    return await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      sigBytes,
      data
    );
  } catch (err) {
    console.error('Security Verification Error:', err);
    return false;
  }
}

export const useSocket = () => {
  const [data, setData] = useState({ crowdData: {}, waitTimes: {} });
  const [isConnected, setIsConnected] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  
  // Performance: Throttle state updates to ensure smooth rendering
  const lastUpdateRef = useRef(0);
  const pendingDataRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    const handleVenueUpdate = async (envelope) => {
      const { data: rawData, signature } = envelope;
      const isValid = await verifyData(rawData, signature);
      
      if (!isValid) {
        console.error('🚨 SECURITY ALERT: Unauthorized data modification detected!');
        setIsSecure(false);
        return;
      }

      setIsSecure(true);
      
      // Throttling Logic: Max one update every 500ms
      const now = Date.now();
      if (now - lastUpdateRef.current > 500) {
        setData(rawData);
        lastUpdateRef.current = now;
      } else {
        pendingDataRef.current = rawData;
      }
    };

    // Buffer Flush: Ensure the latest data is shown even if throttled
    const flushInterval = setInterval(() => {
      if (pendingDataRef.current && Date.now() - lastUpdateRef.current > 500) {
        setData(pendingDataRef.current);
        pendingDataRef.current = null;
        lastUpdateRef.current = Date.now();
      }
    }, 500);

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('venueUpdate', handleVenueUpdate);

    return () => {
      clearInterval(flushInterval);
      socket.off('venueUpdate', handleVenueUpdate);
      socket.disconnect();
    };
  }, []);

  return { data, isConnected, isSecure };
};
