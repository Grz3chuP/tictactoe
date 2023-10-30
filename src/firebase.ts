// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import {signal} from "@angular/core";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_FlMwkr_pV3N67yQCNbahc2GfPYslEPY",
  authDomain: "tictactoe-f3c98.firebaseapp.com",
  databaseURL: "https://tictactoe-f3c98-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tictactoe-f3c98",
  storageBucket: "tictactoe-f3c98.appspot.com",
  messagingSenderId: "287078941321",
  appId: "1:287078941321:web:174ccd4d4f3d6b5bf5fc58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export let userIsLogged = signal(false);
export function writeUserData( name: any, email: any) {
  set(ref(db, 'users'), {
    username: name,
    email: email,

  });
}

export async function signInWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider).then((result) => {
    userIsLogged.set(true);
    const user = result.user;

  });


  console.log(credential);
}

export async function logOut() {
  const auth = getAuth();
  await signOut(auth);
}
export const checkUserIsLogin = async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('zalogowany' + user.email);
      userIsLogged.set(true);

    } else {
      console.log('niezalogowany');
      userIsLogged.set(false);
    }
  });
}

