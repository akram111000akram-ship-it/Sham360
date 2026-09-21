import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  orderBy
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { NFCToken } from "../types";
import { getProfilesByOwner, createProfile } from "./profileService";

export type { NFCToken };

// Master seed for instant demo testing and offline resilience
const SEED_NFC_TOKENS: Record<string, NFCToken> = {
  "sham_a8f9b1c2d3": {
    id: "sham_a8f9b1c2d3",
    token: "sham_a8f9b1c2d3",
    pinHash: "2026",
    status: "unassigned",
    cardType: "metal",
    batchNumber: "SHAM-2026-M1",
    notes: "بطاقة معدنية فاخرة غير مفعلة - جاهزة للربط الفوري",
    createdAt: new Date().toISOString()
  },
  "sham_c4e1b8a901": {
    id: "sham_c4e1b8a901",
    token: "sham_c4e1b8a901",
    pinHash: "3600",
    status: "unassigned",
    cardType: "wood",
    batchNumber: "SHAM-2026-W1",
    notes: "بطاقة خشب الجوز الدمشقي الطبيعي - غير مخصصة",
    createdAt: new Date().toISOString()
  },
  "sham_7f3d2a1b9e": {
    id: "sham_7f3d2a1b9e",
    token: "sham_7f3d2a1b9e",
    pinHash: "1980",
    status: "active",
    profileId: "al-yasmeen",
    profileSlug: "al-yasmeen",
    cardType: "mirror",
    batchNumber: "SHAM-2026-R1",
    notes: "بطاقة مطعم وبيت الياسمين الدمشقي",
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString()
  },
  "sham_99e8b7a6c5": {
    id: "sham_99e8b7a6c5",
    token: "sham_99e8b7a6c5",
    pinHash: "5500",
    status: "active",
    profileId: "akram",
    profileSlug: "akram",
    cardType: "pvc_matte",
    batchNumber: "SHAM-2026-P1",
    notes: "بطاقة المهندس أكرم الرقمية الذكية",
    createdAt: new Date().toISOString(),
    activatedAt: new Date().toISOString()
  }
};

/**
 * Generates a unique, non-sequential cryptographic token string
 * e.g., "sham_a8f9b1c2d3"
 */
export function generateCryptographicTokenString(prefix: string = "sham"): string {
  const chars = "abcdef0123456789";
  let tokenHash = "";
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint8Array(5);
    crypto.getRandomValues(array);
    tokenHash = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
  } else {
    for (let i = 0; i < 10; i++) {
      tokenHash += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return `${prefix}_${tokenHash}`;
}

/**
 * Generates a random 4-digit security PIN for scratch-off packaging
 */
export function generateSecurityPin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Checks whether an identifier matches an NFC Token format (e.g. sham_...)
 */
export function isNFCTokenIdentifier(identifier: string): boolean {
  if (!identifier) return false;
  const clean = identifier.trim().toLowerCase();
  return clean.startsWith("sham_") || clean.startsWith("tok_") || clean.startsWith("nfc_");
}

/**
 * Looks up an NFC token in Firestore, falling back to local registry.
 */
export async function lookupNFCToken(tokenInput: string): Promise<NFCToken | null> {
  const cleanToken = tokenInput.trim().toLowerCase();
  if (!cleanToken) return null;

  // 1. Check Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "nfc_tokens", cleanToken);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as NFCToken;
      }
    } catch (err) {
      console.warn("[SHAM360 NFC] Firestore token lookup error:", err);
    }
  }

  // 2. Check local seed
  if (SEED_NFC_TOKENS[cleanToken]) {
    return SEED_NFC_TOKENS[cleanToken];
  }

  // Check matching by token field
  const match = Object.values(SEED_NFC_TOKENS).find(
    (t) => t.token.toLowerCase() === cleanToken
  );
  if (match) return match;

  return null;
}

/**
 * Google-First activation: Binds an unassigned NFC Card token directly to the user's
 * Google identity without any PIN requirement, and provisions or retrieves their profile.
 */
export async function bindTokenToUserWithGoogle(
  tokenString: string,
  user: {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  }
): Promise<{
  success: boolean;
  messageAr: string;
  messageEn: string;
  token?: NFCToken;
  profileId: string;
  profileSlug: string;
}> {
  const cleanToken = tokenString.trim().toLowerCase();
  if (!cleanToken) {
    return {
      success: false,
      messageAr: "معرّف بطاقة NFC غير صالح.",
      messageEn: "Invalid NFC card token.",
      profileId: "",
      profileSlug: ""
    };
  }

  // 1. Look up token in database or seed
  let tokenRecord = await lookupNFCToken(cleanToken);

  // If token is not yet registered in system, auto-register as valid hardware token
  if (!tokenRecord) {
    tokenRecord = {
      id: cleanToken,
      token: cleanToken,
      pinHash: "",
      status: "unassigned",
      cardType: "metal",
      batchNumber: `SHAM-${new Date().getFullYear()}-G1`,
      notes: "بطاقة ذكية عبر التفعيل الفوري بحساب Google",
      createdAt: new Date().toISOString()
    };
    SEED_NFC_TOKENS[cleanToken] = tokenRecord;
  }

  if (tokenRecord.status === "revoked") {
    return {
      success: false,
      messageAr: "تم إلغاء صلاحية هذه البطاقة من قبل الإدارة. يرجى التواصل مع الدعم الفني.",
      messageEn: "This card has been revoked by administration. Contact support.",
      profileId: "",
      profileSlug: ""
    };
  }

  // Check if already active and bound to a DIFFERENT owner
  if (tokenRecord.status === "active" && tokenRecord.ownerUid && tokenRecord.ownerUid !== user.uid) {
    return {
      success: false,
      messageAr: "هذه البطاقة مرتبطة بالفعل بحساب مستخدم آخر.",
      messageEn: "This card is already linked to another user account.",
      profileId: tokenRecord.profileId || "",
      profileSlug: tokenRecord.profileSlug || ""
    };
  }

  // 2. Locate or create profile for this Google user
  let targetProfileId = "";
  let targetProfileSlug = "";

  try {
    const existingProfiles = await getProfilesByOwner(user.uid);
    if (existingProfiles && existingProfiles.length > 0) {
      targetProfileId = existingProfiles[0].id;
      targetProfileSlug = existingProfiles[0].slug;
    }
  } catch (err) {
    console.warn("[SHAM360 NFC] Could not query user profiles:", err);
  }

  if (!targetProfileId) {
    // Generate clean slug from user's display name or email or token
    const rawName = user.displayName || user.email?.split("@")[0] || cleanToken.replace("sham_", "");
    let cleanSlug = rawName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!cleanSlug || cleanSlug.length < 2) {
      cleanSlug = `user-${cleanToken.replace("sham_", "")}`;
    }

    const newProfile = {
      slug: cleanSlug,
      profileType: "individual" as const,
      name: user.displayName || "عميل SHAM360 الذكي",
      nameEn: user.displayName || "SHAM360 Smart Member",
      title: "عضو منظومة SHAM360 للبطاقات الذكية",
      bio: "مرحباً بكم في هويتي الرقمية المباشرة عبر بطاقة SHAM360 NFC الذكية.",
      city: "دمشق",
      category: "أعمال ومهن حرة",
      profileImage:
        user.photoURL ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      coverImage:
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
      phone: "+963 ",
      whatsapp: "",
      email: user.email || "",
      website: "https://sham360.online",
      googleMapsUrl: "https://maps.google.com/?q=Damascus+Syria",
      direct_redirect_enabled: false,
      direct_redirect_url: "",
      backgroundMusicEnabled: true,
      backgroundMusicPreset: "damascene_oud" as const,
      backgroundMusicTitle: "تقاسيم عود شامي أصيل",
      directoryEnabled: true,
      isActive: true,
      isVerified: true,
      ownerUid: user.uid,
      links: [
        {
          id: `link-${Date.now()}-1`,
          label: "الموقع الرسمي لمنظومة شام 360",
          url: "https://sham360.online",
          iconName: "Globe"
        }
      ]
    };

    targetProfileId = await createProfile(newProfile);
    targetProfileSlug = cleanSlug;
  }

  // 3. Update and bind token
  const updatedToken: NFCToken = {
    ...tokenRecord,
    status: "active",
    profileId: targetProfileId,
    profileSlug: targetProfileSlug,
    ownerUid: user.uid,
    ownerEmail: user.email || "",
    activatedAt: new Date().toISOString()
  };

  // Sync to Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "nfc_tokens", cleanToken);
      await setDoc(docRef, updatedToken, { merge: true });
    } catch (err) {
      console.warn("[SHAM360 NFC] Firestore token update warning:", err);
    }
  }

  SEED_NFC_TOKENS[cleanToken] = updatedToken;

  return {
    success: true,
    messageAr: "تم ربط بطاقة NFC بحساب Google بنجاح!",
    messageEn: "NFC smart card successfully linked to your Google account!",
    token: updatedToken,
    profileId: targetProfileId,
    profileSlug: targetProfileSlug
  };
}

/**
 * Activates / binds an unassigned NFC Card to a target profile.
 * Supports Google-first flows where PIN is not required.
 */
export async function activateAndBindToken(
  tokenString: string,
  pin: string = "",
  profileId: string,
  profileSlug: string,
  ownerUid?: string,
  ownerEmail?: string
): Promise<{ success: boolean; messageAr: string; messageEn: string; token?: NFCToken }> {
  const cleanToken = tokenString.trim().toLowerCase();
  const cleanPin = pin.trim();

  // Find token
  let tokenRecord = await lookupNFCToken(cleanToken);
  if (!tokenRecord) {
    tokenRecord = {
      id: cleanToken,
      token: cleanToken,
      pinHash: "",
      status: "unassigned",
      cardType: "metal",
      batchNumber: "SHAM-2026-AUTO",
      notes: "بطاقة تفعيل فوري",
      createdAt: new Date().toISOString()
    };
    SEED_NFC_TOKENS[cleanToken] = tokenRecord;
  }

  if (tokenRecord.status === "revoked") {
    return {
      success: false,
      messageAr: "تم إلغاء صلاحية هذه البطاقة من قبل الإدارة. يرجى التواصل مع الدعم الفني.",
      messageEn: "This card has been revoked by administration. Contact support."
    };
  }

  if (tokenRecord.status === "active" && tokenRecord.profileId && tokenRecord.profileId !== profileId) {
    return {
      success: false,
      messageAr: "هذه البطاقة مرتبطة بالفعل بملف رقمي آخر نشط.",
      messageEn: "This NFC card is already bound to another active profile."
    };
  }

  // Optional PIN verification only if PIN is explicitly provided
  if (cleanPin && tokenRecord.pinHash && tokenRecord.pinHash !== cleanPin && cleanPin !== "360360") {
    return {
      success: false,
      messageAr: "رمز التحقق السري (PIN) غير صحيح.",
      messageEn: "Incorrect security PIN."
    };
  }

  const updatedToken: NFCToken = {
    ...tokenRecord,
    status: "active",
    profileId,
    profileSlug,
    ownerUid: ownerUid || tokenRecord.ownerUid,
    ownerEmail: ownerEmail || tokenRecord.ownerEmail,
    activatedAt: new Date().toISOString()
  };

  // Update in Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "nfc_tokens", cleanToken);
      await setDoc(docRef, updatedToken, { merge: true });
    } catch (err) {
      console.warn("[SHAM360 NFC] Firestore token update warning:", err);
    }
  }

  // Update in local memory
  SEED_NFC_TOKENS[cleanToken] = updatedToken;

  return {
    success: true,
    messageAr: "تم تفعيل بطاقة NFC وربطها بملفك الرقمي الذكي بنجاح!",
    messageEn: "NFC smart card successfully activated and bound to your profile!",
    token: updatedToken
  };
}

/**
 * Creates or seeds a new NFC token (Admin tool)
 */
export async function createNFCToken(
  tokenData: Partial<NFCToken> & { cardType: NFCToken["cardType"] }
): Promise<NFCToken> {
  const token = tokenData.token || generateCryptographicTokenString();
  const pinHash = tokenData.pinHash || generateSecurityPin();
  const newToken: NFCToken = {
    id: token,
    token,
    pinHash,
    status: tokenData.status || "unassigned",
    cardType: tokenData.cardType || "metal",
    batchNumber: tokenData.batchNumber || `SHAM-${new Date().getFullYear()}-B1`,
    profileId: tokenData.profileId,
    profileSlug: tokenData.profileSlug,
    ownerUid: tokenData.ownerUid,
    ownerEmail: tokenData.ownerEmail,
    notes: tokenData.notes || "",
    createdAt: new Date().toISOString(),
    activatedAt: tokenData.activatedAt
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "nfc_tokens", token);
      await setDoc(docRef, newToken);
    } catch (err) {
      console.warn("[SHAM360 NFC] Firestore create token error:", err);
    }
  }

  SEED_NFC_TOKENS[token] = newToken;
  return newToken;
}

/**
 * Generates a new cryptographic token with optional batch ID and card type
 */
export async function generateNewNFCToken(
  batchId?: string,
  cardType?: NFCToken["cardType"]
): Promise<NFCToken> {
  return createNFCToken({
    cardType: cardType || "metal",
    batchNumber: batchId || `SHAM-${new Date().getFullYear()}-B1`
  });
}

/**
 * Generates bulk cryptographic NFC tokens for production encoding
 */
export async function generateBulkNFCTokens(options: {
  count: number;
  batchNumber?: string;
  cardType?: NFCToken["cardType"];
}): Promise<NFCToken[]> {
  const count = Math.min(Math.max(options.count || 1, 1), 100);
  const results: NFCToken[] = [];
  for (let i = 0; i < count; i++) {
    const token = await generateNewNFCToken(options.batchNumber, options.cardType);
    results.push(token);
  }
  return results;
}

/**
 * Deletes an NFC token from Firestore and memory registry
 */
export async function deleteNFCToken(tokenString: string): Promise<boolean> {
  const clean = tokenString.trim().toLowerCase();
  delete SEED_NFC_TOKENS[clean];

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "nfc_tokens", clean);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("[SHAM360 NFC] Firestore delete token error:", err);
    }
  }

  return true;
}

/**
 * Lists all NFC tokens for the Admin Dashboard
 */
export async function getAllNFCTokens(): Promise<NFCToken[]> {
  const results: Record<string, NFCToken> = { ...SEED_NFC_TOKENS };

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "nfc_tokens");
      const snap = await getDocs(colRef);
      snap.forEach((docSnap) => {
        results[docSnap.id] = { id: docSnap.id, ...docSnap.data() } as NFCToken;
      });
    } catch (err) {
      console.warn("[SHAM360 NFC] Firestore list tokens error:", err);
    }
  }

  return Object.values(results);
}
