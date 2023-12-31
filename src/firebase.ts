// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get, remove } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import {signal} from "@angular/core";
import {board} from "./controler";

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
export let userUid = signal('');
export let userCredentials = signal('');
export function writeUserData( uid: any, email: any, path: any) {
  set(ref(db, path), {
    userUid: uid,
    email: email,

  });
}
export function writeTableData( player: any, seat: any) {
  set(ref(db, 'table'), {
    player: player,
    seat: seat,


  });
}

export function writeGameData( board: any) {
  board.forEach((item: any, index: any) => {
  set(ref(db, 'game/' + index), {
    id: item.id,
    value: item.value,
  });
  });
}
export function writeGameTurnData( player: any, gameIsReady: any) {
  set(ref(db, 'turn'), {
      whoseTurn: player,
      gameIsReady: gameIsReady,
   });
}
export function removeTableData(path: any) {
  remove(ref(db, path));
}
export async function signInWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider).then((result) => {
    userIsLogged.set(true);
    const user = result.user;
    if (typeof user.email === "string") {
      userCredentials.set(user.email);
    }
    writeUserData(user.uid, user.email, 'users');
    userUid.set(user.uid);
    console.log(userCredentials());
  });


  console.log(credential);
}

export async function signInWithEmailAndPassword1(email: any, password: any) {
  const auth = getAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  if (user) {
    userIsLogged.set(true);
    if (typeof user.email === "string") {
      userCredentials.set(user.email);
    }
    writeUserData(user.uid, user.email, 'users');
    userUid.set(user.uid);
    console.log(userCredentials());
  }
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
      writeUserData(user.uid, user.email, 'logedUsers/' + user.uid);
      if (typeof user.email === "string") {
        userCredentials.set(user.email);
      }
    } else {
      console.log('niezalogowany');
      userIsLogged.set(false);
      removeTableData('logedUsers/' + userUid());

    }
  });
}
export let userName1 = signal('Waiting for player');
export let userName2 = signal('Waiting for player');
export let user1isTaken = signal(false);
export let user2isTaken = signal(false);
export const gameIsReady = signal(false);

export const whoseTurn = signal(userName1());

onValue(ref(db, 'table'), (snapshot) => {
  const data = snapshot.val();
  if (data) {
    userName1.set(data.player[0]);
    userName2.set(data.player[1]);
    user1isTaken.set(data.seat[0]);
    user2isTaken.set(data.seat[1]);

  }
});
1
onValue(ref(db, 'turn'), (snapshot) => {
  const data = snapshot.val();
  if (data) {
    console.log(data);
    whoseTurn.set(data.whoseTurn);
    gameIsReady.set(data.gameIsReady);
  }
});
