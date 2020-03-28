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

//pass additionalData for the user as an object - additionalData is an object
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //get the doc reference from the specific user in the authentication table (that stores simple or google mails with a User Uid)
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //const collectionRef = firestore.collection('users');

  //we get the snapshot objects (for both the document and the collection) from firestore whether or not the user exists
  const snapShot = await userRef.get();
  //const collectionSnapshot = await collectionRef.get(); //we get an object with properties docs(array of documents), empty, size and more
  //console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) }); //with .data() method we get a JSON representation of the data

  //if the user does not exist we create him
  if (!snapShot.exists) {
    //take the values we want from the giant auth object using deconstruction
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // use try catch because it is an asynchronous request to the firestore database
    try {
      await userRef.set({
        //this means displayName: displayName because we are inside an object (same rule exists for all fields)
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

// --one time utility function to add colelction with documents
//collectionKey is a string
//objectsToAdd is an array of objects
//the function is async because batch.commit() returns a Promise
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  //firestore will give us back a reference
  const collectionRef = firestore.collection(collectionKey);
  //console.log(collectionRef);

  //we use batch to write all our documents with one move
  //so we don't suffer an internet connection interruption
  const batch = firestore.batch();
  //call a function to each element
  //the difference with map is that here we don't get back an array
  objectsToAdd.forEach(obj => {
    //create a new doc reference inside the collection, giving it a randon id
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

//function to convert array to map
export const convertCollectionsSnapshotToMap = collections => {
  //create a new array of objects using the old array of objects and the map javascript function
  const transformedCollection = collections.docs.map(doc => {
    //we destrucrure title and items from doc.data()
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id, //remains the same
      title,
      items
    };
  });

  //console.log(transformedCollection);
  //use reduce javascript function with an initial accumulator of an empty object
  //in the end we get from the database an shop object similar to that inside shop.data.js (except from the id of the category eg hats)
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
