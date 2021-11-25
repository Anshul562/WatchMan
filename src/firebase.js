<<<<<<< HEAD
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/firestore"

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBuV1EMBAjKajhiBIZ1yfjw2G1v8MMRxkA",
  authDomain: "watchman-auth.firebaseapp.com",
  projectId: "watchman-auth",
  storageBucket: "watchman-auth.appspot.com",
  messagingSenderId: "951107185072",
  appId: "1:951107185072:web:c80ec9f64945ccdc4ace75"
})

export const db=firebase.firestore()
export const auth = firebaseConfig.auth()
=======
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/firestore"

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBuV1EMBAjKajhiBIZ1yfjw2G1v8MMRxkA",
  authDomain: "watchman-auth.firebaseapp.com",
  projectId: "watchman-auth",
  storageBucket: "watchman-auth.appspot.com",
  messagingSenderId: "951107185072",
  appId: "1:951107185072:web:c80ec9f64945ccdc4ace75"
})

export const db=firebase.firestore()
export const auth = firebaseConfig.auth()
>>>>>>> 8728c855f51d72988fd9ce810d9edfe28deb7a5e
export default firebaseConfig