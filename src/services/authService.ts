import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Accessor for the currently authenticated Firebase user.
 */
export function getCurrentUser(): User | null {
  if (!isFirebaseConfigured || !auth) {
    return null;
  }
  return auth.currentUser;
}

/**
 * Subscribes to real-time authentication state changes.
 * Returns an unsubscribe teardown function.
 */
export function subscribeToAuthChanges(callback: (user: User | null) => void): () => void {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

/**
 * Authenticate using Email and Password.
 */
export async function loginWithEmail(email: string, password: string): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("خدمة Firebase غير مهيأة بعد. يرجى تزويد بيانات البيئة VITE_FIREBASE_*");
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(translateAuthError(error.code) || error.message);
  }
}

/**
 * Register a new customer account using Email and Password.
 */
export async function registerWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("خدمة Firebase غير مهيأة بعد. يرجى تزويد بيانات البيئة VITE_FIREBASE_*");
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: displayName.trim() });
    }
    return userCredential.user;
  } catch (error: any) {
    throw new Error(translateAuthError(error.code) || error.message);
  }
}

/**
 * Authenticate using Google OAuth popup provider.
 */
export async function loginWithGoogle(): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("خدمة Firebase غير مهيأة بعد. يرجى تزويد بيانات البيئة VITE_FIREBASE_*");
  }
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(translateAuthError(error.code) || error.message);
  }
}

/**
 * Sign out the current user.
 */
export async function logout(): Promise<void> {
  if (!isFirebaseConfigured || !auth) {
    return;
  }
  await firebaseSignOut(auth);
}

/**
 * Send password reset email.
 */
export async function resetPassword(email: string): Promise<void> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("خدمة Firebase غير مهيأة بعد.");
  }
  try {
    await sendPasswordResetEmail(auth, email.trim());
  } catch (error: any) {
    throw new Error(translateAuthError(error.code) || error.message);
  }
}

/**
 * Translates standard Firebase Auth error codes into clear Arabic messages.
 */
function translateAuthError(code?: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "البريد الإلكتروني المدخل غير صالح.";
    case "auth/user-disabled":
      return "تم تعطيل هذا الحساب. يرجى التواصل مع إدارة SHAM360.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    case "auth/email-already-in-use":
      return "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول بدلاً من ذلك.";
    case "auth/weak-password":
      return "كلمة المرور ضعيفة جداً. يجب أن تحتوي على 6 خانات على الأقل.";
    case "auth/popup-closed-by-user":
      return "تم إغلاق نافذة تسجيل الدخول من قِبل المستخدم.";
    case "auth/network-request-failed":
      return "تعذر الاتصال بالشبكة. يرجى التحقق من اتصال الإنترنت والمحاولة ثانية.";
    default:
      return "حدث خطأ أثناء المصادقة. يرجى إعادة المحاولة.";
  }
}
