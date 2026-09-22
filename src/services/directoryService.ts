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
  limit,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { DIRECTORY_DATA, DirectoryItem } from "../data/directoryData";

export type { DirectoryItem };

/**
 * Fetches directory items directly from Firestore collection 'directory'.
 * Falls back to DIRECTORY_DATA if Firestore is empty or during network transitions.
 */
export async function getDirectoryItemsFromFirestore(options?: {
  category?: string;
  city?: string;
  searchKeyword?: string;
  limitCount?: number;
}): Promise<DirectoryItem[]> {
  try {
    const dirRef = collection(db, "directory");
    const constraints: any[] = [];

    if (options?.category && options.category !== "all" && options.category !== "الكل") {
      constraints.push(where("category", "==", options.category));
    }
    if (options?.limitCount) {
      constraints.push(limit(options.limitCount));
    }

    const q = constraints.length > 0 ? query(dirRef, ...constraints) : query(dirRef);
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as DirectoryItem));
      return items;
    }
  } catch (error) {
    console.warn("[SHAM360 Directory] Firestore directory fetch note:", error);
  }

  // Initial seed dataset fallback ensuring instant UI rendering
  let fallbackList = [...DIRECTORY_DATA];

  if (options?.category && options.category !== "all" && options.category !== "الكل") {
    fallbackList = fallbackList.filter((item) => item.category === options.category);
  }

  return fallbackList;
}

/**
 * Retrieves a single directory item by slug directly from Firestore.
 */
export async function getDirectoryItemBySlugFromFirestore(slug: string): Promise<DirectoryItem | null> {
  const cleanSlug = slug.trim().toLowerCase();
  if (!cleanSlug) return null;

  try {
    const dirRef = collection(db, "directory");
    const q = query(dirRef, where("slug", "==", cleanSlug), limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as DirectoryItem;
    }

    // Direct doc lookup by ID
    const directDoc = await getDoc(doc(db, "directory", cleanSlug));
    if (directDoc.exists()) {
      return { id: directDoc.id, ...directDoc.data() } as DirectoryItem;
    }
  } catch (error) {
    console.warn("[SHAM360 Directory] Firestore single item query note:", error);
  }

  // Fallback to static catalog item
  const found = DIRECTORY_DATA.find((item) => item.slug === cleanSlug || item.id === cleanSlug);
  return found || null;
}

/**
 * Saves or updates a directory item in Firestore 'directory' collection.
 */
export async function saveDirectoryItemToFirestore(item: DirectoryItem): Promise<string> {
  const docId = item.id || item.slug;
  const docRef = doc(db, "directory", docId);
  await setDoc(
    docRef,
    {
      ...item,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
  return docId;
}

/**
 * Deletes a directory item from Firestore.
 */
export async function deleteDirectoryItemFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, "directory", id);
  await deleteDoc(docRef);
}
