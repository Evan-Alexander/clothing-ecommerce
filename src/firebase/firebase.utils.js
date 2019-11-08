import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCc5w7OFeIb4jiLxRoWEWVx6XCMKx7B3Pc",
  authDomain: "crown-clothing-db-9ad87.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-9ad87.firebaseio.com",
  projectId: "crown-clothing-db-9ad87",
  storageBucket: "crown-clothing-db-9ad87.appspot.com",
  messagingSenderId: "267373443488",
  appId: "1:267373443488:web:0b96ea51bb5873ee5b0cc5",
  measurementId: "G-K2CVGN20TM"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

// Make available to the app
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// instantiate a new GoogleAuthProvider object
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;