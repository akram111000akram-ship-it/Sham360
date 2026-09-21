import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Firebase client configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

/**
 * Checks if the minimal required Firebase configuration is present.
 */
export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY"
);

let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let firebaseAuth: Auth | null = null;
let firebaseStorage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreDb = getFirestore(app);
    firebaseAuth = getAuth(app);
    if (firebaseConfig.storageBucket) {
      try {
        firebaseStorage = getStorage(app);
      } catch (storageErr) {
        console.warn("[SHAM360] Storage init warning:", storageErr);
      }
    }
    console.info("[SHAM360] Firebase Firestore, Auth & Storage initialized successfully.");
  } catch (error) {
    console.error("[SHAM360] Firebase initialization failed:", error);
    app = null;
    firestoreDb = null;
    firebaseAuth = null;
    firebaseStorage = null;
  }
} else {
  console.info(
    "[SHAM360] Firebase is not yet configured. Operating in safe offline / mock fallback mode for /p/:slug."
  );
}

export const firebaseApp = app;
export const db = firestoreDb;
export const auth = firebaseAuth;
export const storage = firebaseStorage;
