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
export default firebaseConfig