// hooks/useAccount.ts
'use client';
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import axios from "axios";
import { useRouter } from "next/navigation";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Kx5orgPaWJBjtHHPL_DvQubSX5jIhJw",
  authDomain: "recipe-ver-2.firebaseapp.com",
  projectId: "recipe-ver-2",
  storageBucket: "recipe-ver-2.firebasestorage.app",
  messagingSenderId: "116234974979",
  appId: "1:116234974979:web:efbc41d6a9fa1ee7c05b36"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const provider = new GoogleAuthProvider();

export function useAccount() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const toggleMode = () => setIsSignup((prev) => !prev);

  

  const handleEmailAuth = async (
    email: string,
    password: string
  ): Promise<void> => {
    setError("");
    try {
      if (isSignup) {
        const response = await axios.post("http://localhost:8080/signup", {
          email,
          password,
        });
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const id_token = await userCred.user.getIdToken();
        const user = doc(db, "users", userCred.user.uid)
        const userSnapshot = await getDoc(user)
        var user_id;
        if (userSnapshot.exists()) {
          const data = userSnapshot.data()
          user_id = data['userId']
        }
        // const user_id = userCred.user.uid;
        localStorage.setItem("id_token", id_token);
        localStorage.setItem("user_id", user_id);
        // router.push(`/user/${user_id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("http://localhost:8080/google-login", {
        id_token: idToken,
      });
      const { id_token, user_id } = response.data;
      localStorage.setItem("id_token", id_token);
      localStorage.setItem("user_id", user_id);
      // router.push(`/user/${user_id}`);
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed");
    }
  };

  const handleLogout = async () => {
    signOut(auth)
    localStorage.removeItem("id_token")
    localStorage.removeItem("user_id")
  }

  return {
    user,
    isSignup,
    error,
    handleEmailAuth,
    handleGoogleSignIn,
    toggleMode,
    setError,
    router,
    handleLogout
  };
}
