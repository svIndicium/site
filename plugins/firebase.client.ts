import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export default defineNuxtPlugin(() => {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyD_4U8xu0z-fEqhGQyEt-walZiNSLN0Z9s',
    authDomain: 'svindicium-website.firebaseapp.com',
    databaseURL: 'https://svindicium-website-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'svindicium-website',
    storageBucket: 'svindicium-website.appspot.com',
    messagingSenderId: '18534773268',
    appId: '1:18534773268:web:f816171343e066a079ad01',
    measurementId: 'G-449W2Y5BHP',
  };

  // Initialize Firebase only on client side
  if (import.meta.client) {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    return {
      provide: {
        firebase: app,
        analytics,
      },
    };
  }
});
