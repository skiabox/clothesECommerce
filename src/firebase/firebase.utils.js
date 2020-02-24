import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBHBa3FBABTzxhHa79RWtBU_uTEpDGehrQ',
  authDomain: 'crwn-db-ae9c6.firebaseapp.com',
  databaseURL: 'https://crwn-db-ae9c6.firebaseio.com',
  projectId: 'crwn-db-ae9c6',
  storageBucket: 'crwn-db-ae9c6.appspot.com',
  messagingSenderId: '229507290101',
  appId: '1:229507290101:web:ded1428bf67730f0de06bc',
  measurementId: 'G-4B5VTMZ67T'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
