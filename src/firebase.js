import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  authDomain: `${Constants.expoConfig.extra.firebaseProjectId}.firebaseapp.com`,
  projectId: Constants.expoConfig.extra.firebaseProjectId,
  storageBucket: `${Constants.expoConfig.extra.firebaseProjectId}.appspot.com`,
  messagingSenderId: "855481216463",
  appId: "1:855481216463:web:6fb7e7ccd74389a5d1f6ba",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };