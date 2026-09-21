import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { SyrianEvent } from "../types";
import { INITIAL_SYRIAN_EVENTS } from "../data/eventsData";

let memoryEvents: SyrianEvent[] = [...INITIAL_SYRIAN_EVENTS];

/**
 * Fetches all Syrian cultural and public events from Firestore with fallback.
 */
export async function getAllSyrianEvents(): Promise<SyrianEvent[]> {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "events");
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const firestoreEvents: SyrianEvent[] = [];
        snap.forEach((docSnap) => {
          firestoreEvents.push({ id: docSnap.id, ...docSnap.data() } as SyrianEvent);
        });
        // Merge or replace
        const idMap = new Map<string, SyrianEvent>();
        INITIAL_SYRIAN_EVENTS.forEach((e) => idMap.set(e.id, e));
        firestoreEvents.forEach((e) => idMap.set(e.id, e));
        memoryEvents = Array.from(idMap.values());
        return memoryEvents;
      }
    } catch (err) {
      console.warn("[SHAM360 Events] Firestore fetch error:", err);
    }
  }

  return memoryEvents;
}

/**
 * Saves or updates a Syrian event in Firestore and local memory.
 */
export async function saveSyrianEvent(event: SyrianEvent): Promise<SyrianEvent> {
  const safeId = event.id || `evt-${Date.now()}`;
  const record: SyrianEvent = { ...event, id: safeId };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "events", safeId);
      await setDoc(docRef, record, { merge: true });
    } catch (err) {
      console.warn("[SHAM360 Events] Firestore save error:", err);
    }
  }

  const idx = memoryEvents.findIndex((e) => e.id === safeId);
  if (idx >= 0) {
    memoryEvents[idx] = record;
  } else {
    memoryEvents.unshift(record);
  }

  return record;
}

/**
 * Deletes an event from Firestore and local memory.
 */
export async function deleteSyrianEvent(eventId: string): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "events", eventId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("[SHAM360 Events] Firestore delete error:", err);
    }
  }

  memoryEvents = memoryEvents.filter((e) => e.id !== eventId);
  return true;
}
