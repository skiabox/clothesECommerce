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

//pass additionalData for the user as an object
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //if the user does not exist we create him
  if (!snapShot.exists) {
    //take the values we want from the giant auth object using deconstruction
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // use try catch because it is an asynchronous request to the firestore database
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  //console.log(firestore.doc('users/128fdashadu'));
  //console.log(snapShot); // exists property is false

  //return a user reference from this function
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
