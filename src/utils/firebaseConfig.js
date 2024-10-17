//? Import required SDKs from firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuciiCWxqoX_hywelDtxCfZGq7yLzdktk",
  authDomain: "my-project-c5480.firebaseapp.com",
  projectId: "my-project-c5480",
  storageBucket: "my-project-c5480.appspot.com",
  messagingSenderId: "814297864078",
  appId: "1:814297864078:web:63b450f8c7a8bbfd8736df",
  measurementId: "G-T6FNJC7RFC",
};

//? Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage()

//? Export to use all over the app
export { 
  auth,
  db,
  storage
}
