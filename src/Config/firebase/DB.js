import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth, signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  query,
  where
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBqZTZ-zGYy_RyrrpINIZyORoaooonV-t0",
    authDomain: "olx-react-9be0c.firebaseapp.com",
    projectId: "olx-react-9be0c",
    storageBucket: "olx-react-9be0c.appspot.com",
    messagingSenderId: "125034455751",
    appId: "1:125034455751:web:a11dd52a09e041713794e2",
    measurementId: "G-M6H9MFK0XX"
  };

  
  
  
  const SignupFirebase = async (userInfo) => {
    const { email, password, username } = userInfo;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
    await addUserToDB(userCredential.user.uid, username, email);
  };

function signinFirebase(loginEmail, loginPassword) {
  return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
}
const addUserToDB = async (uid, username, email) => {
  const userProfile = {
    username: username.toLowerCase(),
    email: email.toLowerCase(),
  };

  return setDoc(doc(db, "users", uid), userProfile);
};

const app = initializeApp(firebaseConfig);
export async function logout() {
  return await signOut(auth)
}


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);















export {
  SignupFirebase,
  addDoc,
  addUserToDB,
  collection,
  createUserWithEmailAndPassword,
  doc,
  getAuth,
  getDoc,
  getDocs,
  getDownloadURL,
  ref,
  setDoc,
  signinFirebase,
  uploadBytes,
  query,
  where
};