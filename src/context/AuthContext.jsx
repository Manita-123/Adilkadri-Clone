import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const STORAGE_KEY = "user_info";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setError("Failed to load user");
      }
    }

    setLoading(false);
  }, []);

  // Signup - frontend only
  function signup(formData) {
    setLoading(true);
    setError(null);

    try {
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "user",
      };

      setUser(userData);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(userData)
      );

      toast.success("Account created successfully! 👋");

      return userData;
    } catch (err) {
      const errorMsg = err.message || "Registration failed";

      setError(errorMsg);
      toast.error(errorMsg);

      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Login - frontend only

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  function login(email, password) {
  setLoading(true);
  setError(null);

  try {
    let userData;

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      userData = {
        id: 1,
        name: "Admin",
        email: email,
        role: "admin",
      };
    } else {
      userData = {
        id: Date.now(),
        name: email.split("@")[0],
        email: email,
        role: "user",
      };
    }

    setUser(userData);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(userData)
    );

    toast.success("Login successful! 👋");

    return userData;

  } finally {
    setLoading(false);
  }
}

  // Logout
  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);

    toast.warning("Logged out");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}