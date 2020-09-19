import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDlFbHUwAbmQOk1rxIC-ed4lcNB6K5b-3M",
  authDomain: "travelblog-f630b.firebaseapp.com",
  databaseURL: "https://travelblog-f630b.firebaseio.com",
  projectId: "travelblog-f630b",
  storageBucket: "travelblog-f630b.appspot.com",
  messagingSenderId: "326732608891",
  appId: "1:326732608891:web:79e740c0097621399179de",
  measurementId: "G-BMWZ17LG0K",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
