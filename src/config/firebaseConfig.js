import firebase from "firebase/compat"

const firebaseConfig = {
    apiKey: "AIzaSyBuV1EMBAjKajhiBIZ1yfjw2G1v8MMRxkA",
    authDomain: "watchman-auth.firebaseapp.com",
    databaseURL: "https://watchman-auth-default-rtdb.firebaseio.com",
    projectId: "watchman-auth",
    storageBucket: "watchman-auth.appspot.com",
    messagingSenderId: "951107185072",
    appId: "1:951107185072:web:c80ec9f64945ccdc4ace75"
  };

  
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();


const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



  export const logout = () => {
    auth.signOut();
  }