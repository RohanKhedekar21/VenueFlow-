import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

/**
 * Dynamic Firebase Initialization
 * @param {Object} config - The configuration fetched from the Config Bridge.
 */
export const initFirebase = (config) => {
  // Don't initialize if keys are missing — avoids Firebase SDK errors
  if (!config?.firebaseApiKey || !config?.firebaseProjectId) {
    console.warn("Firebase keys not configured. Analytics disabled.");
    return null;
  }

  const firebaseConfig = {
    apiKey:        config.firebaseApiKey,
    authDomain:    `${config.firebaseProjectId}.firebaseapp.com`,
    projectId:     config.firebaseProjectId,
    storageBucket: `${config.firebaseProjectId}.appspot.com`,
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456",
  };

  const app = initializeApp(firebaseConfig);

  if (typeof window !== 'undefined') {
    getAnalytics(app);
  }

  return app;
};
