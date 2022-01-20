// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcPvw-K_5ynHVI-k4EFYZUINgxJmg5GPo",

  authDomain: "chatapp-74897.firebaseapp.com",

  databaseURL: "https://chatapp-74897-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "chatapp-74897",

  storageBucket: "chatapp-74897.appspot.com",

  messagingSenderId: "66706900986",

  appId: "1:66706900986:web:c39462760c05730a4bc643"


};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const database = getDatabase(app);

export { db, storage, database }
export default firebase