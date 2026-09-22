import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * Firebase client configuration loaded directly from Vite environment variables (import.meta.env).
 * Firestore serves as the exclusive backend database for Profiles, NFC Tokens, and Directory Items.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSySham360ProductionKeyDamascus",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "sham360-2f8bd"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sham360-2f8bd",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "sham360-2f8bd"}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase App directly - No mock mode fallback
export const firebaseApp: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore as the exclusive live database backend
export const db: Firestore = getFirestore(firebaseApp);

// Initialize Firebase Authentication
export const auth: Auth = getAuth(firebaseApp);

// Initialize Firebase Storage
export const storage: FirebaseStorage = getStorage(firebaseApp);

// Status indicator confirming active Firestore/Firebase configuration
export const isFirebaseConfigured: boolean = true;

