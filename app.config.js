import 'dotenv/config';


export default {
  expo: {
    name: "expense-tracker-app",
    slug: "expense-tracker-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      firebaseProjectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    }
  }
};
