import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useConfig Hook
 * Fetches the runtime configuration from the backend Config Bridge.
 * This allows the app to use API keys from the Cloud Run Console.
 */
export const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    // Fetch from backend bridge
    axios.get('/api/config')
      .then(res => {
        if (isMounted) {
          setConfig(res.data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.warn("Config Bridge unavailable, falling back to local environment.");
        if (isMounted) {
          // Fallback to build-time vars if backend is unreachable or local
          setConfig({
            googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
            firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
            firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "venueflow-prod"
          });
          setIsLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  return { config, isLoading, error };
};
