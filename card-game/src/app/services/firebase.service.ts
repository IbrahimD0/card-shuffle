import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getFirestore, Firestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';

import { Card } from '../type';

const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
  measurementId: environment.firebase.measurementId,
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app: FirebaseApp;
  private firestore: Firestore;

  constructor() {
    if (!getApps().length) {
      this._app = initializeApp(firebaseConfig);
    } else {
      this._app = getApps()[0];
    }
    this.firestore = getFirestore(this._app);
  }

  async loadDeck(): Promise<Card[]> {
    try {
      const docRef = doc(this.firestore, 'decks/currentDeck');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        return docSnap.data()['deck'] || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to load deck:', error);
      return [];
    }
  }

  async saveDeck(deck: Card[]): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'decks/currentDeck');
      await setDoc(docRef, { deck });
    } catch (error) {
      console.error('Failed to save deck:', error);
    }
  }
}
