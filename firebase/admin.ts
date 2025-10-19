import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    // Check if we have the required environment variables
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      console.error("Missing required Firebase environment variables:");
      console.error("FIREBASE_PROJECT_ID:", !!process.env.FIREBASE_PROJECT_ID);
      console.error(
        "FIREBASE_CLIENT_EMAIL:",
        !!process.env.FIREBASE_CLIENT_EMAIL
      );
      console.error(
        "FIREBASE_PRIVATE_KEY:",
        !!process.env.FIREBASE_PRIVATE_KEY
      );
      throw new Error(
        "Missing required Firebase environment variables. Please check your deployment configuration."
      );
    }

    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
