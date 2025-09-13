import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const hasEnv = Boolean(firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId);
export const firebaseAvailable = hasEnv;
let app;
let auth;
let googleProvider;
if (hasEnv) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
    }
    catch (e) {
        console.warn('Firebase initialization failed. Auth disabled.', e);
    }
}
else {
    console.warn('Firebase env vars missing. Auth disabled.');
}
export { app, auth, googleProvider };
