import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import { FIREBASE_CONFIG } from "./consts"

const firebase = initializeApp({
  ...FIREBASE_CONFIG,
});

export const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase)
