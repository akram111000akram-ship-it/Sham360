import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Optimizes and resizes an image file in the browser before upload.
 * Reduces bandwidth usage significantly for mobile networks in Syria.
 */
export async function optimizeImageFile(
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 800,
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image for optimization"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image to Firebase Storage, with resilient fallback to base64 data URL
 * if Storage is offline or unconfigured.
 */
export async function uploadImageFile(
  file: File,
  storagePath: string,
  maxWidth: number = 1200,
  maxHeight: number = 800
): Promise<string> {
  // 1. Optimize image locally first
  const optimizedBlob = await optimizeImageFile(file, maxWidth, maxHeight);

  // 2. Try Firebase Storage if configured
  if (storage) {
    try {
      const storageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(storageRef, optimizedBlob, {
        contentType: "image/jpeg",
        cacheControl: "public, max-age=31536000"
      });
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (storageError) {
      console.warn(
        `[SHAM360 Storage] Firebase Storage upload to ${storagePath} failed or bucket not ready, using data URL fallback:`,
        storageError
      );
    }
  }

  // 3. Fallback to optimized Base64 data URL for local persistence and offline readiness
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(optimizedBlob);
  });
}

/**
 * Dedicated helper to upload avatar photos (400x400)
 */
export async function uploadProfileAvatar(file: File, profileId: string): Promise<string> {
  const safeId = profileId.replace(/[^a-zA-Z0-9_-]/g, "");
  const path = `profiles/${safeId}/avatar_${Date.now()}.jpg`;
  return uploadImageFile(file, path, 500, 500);
}

/**
 * Dedicated helper to upload profile cover photos (1400x700)
 */
export async function uploadProfileCover(file: File, profileId: string): Promise<string> {
  const safeId = profileId.replace(/[^a-zA-Z0-9_-]/g, "");
  const path = `profiles/${safeId}/cover_${Date.now()}.jpg`;
  return uploadImageFile(file, path, 1400, 700);
}

/**
 * Dedicated helper to upload product catalog photos (1000x1000)
 */
export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const safeId = productId.replace(/[^a-zA-Z0-9_-]/g, "");
  const path = `products/${safeId}_${Date.now()}.jpg`;
  return uploadImageFile(file, path, 1000, 1000);
}

/**
 * Dedicated helper to upload cultural/public event banners (1200x675)
 */
export async function uploadEventCover(file: File, eventId: string): Promise<string> {
  const safeId = eventId.replace(/[^a-zA-Z0-9_-]/g, "");
  const path = `events/${safeId}_${Date.now()}.jpg`;
  return uploadImageFile(file, path, 1200, 675);
}

export const uploadEventBanner = uploadEventCover;

/**
 * Dedicated helper to upload payment method QR code images (600x600)
 */
export async function uploadPaymentQrImage(file: File, profileId: string, provider: string): Promise<string> {
  const safeId = profileId.replace(/[^a-zA-Z0-9_-]/g, "");
  const safeProvider = provider.replace(/[^a-zA-Z0-9_-]/g, "");
  const path = `profiles/${safeId}/payments/${safeProvider}_qr_${Date.now()}.jpg`;
  return uploadImageFile(file, path, 600, 600);
}
