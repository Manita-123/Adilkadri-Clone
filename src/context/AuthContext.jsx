import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { getAuth } from "firebase/auth";

import { auth } from "../utils/firebase";

import { app } from "../utils/firebase"

const authen = getAuth(app);
console.log(authen);


export const AuthContext = createContext(null);

const STORAGE_KEY = "user_info";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const normalizeUser = (firebaseUser) => {
  if (!firebaseUser) return null;

  const email = firebaseUser.email?.trim().toLowerCase() || "";

  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
    email: firebaseUser.email,
    phone: firebaseUser.phoneNumber || "",
    role: email === ADMIN_EMAIL ? "admin" : "user",
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const nextUser = normalizeUser(firebaseUser);
      setUser(nextUser);

      if (nextUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signup(formData) {
    try {
      setError(null);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (formData.name) {
        await updateProfile(userCredential.user, {
          displayName: formData.name,
        });
      }

      const nextUser = normalizeUser(userCredential.user);
      setUser(nextUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      toast.success("Account created successfully!");
      return nextUser;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    }
  }

  async function login(email, password) {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const nextUser = normalizeUser(userCredential.user);

      setUser(nextUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      toast.success("Login successful!");
      return nextUser;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    }
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}