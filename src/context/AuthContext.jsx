import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const STORAGE_KEY = "user_info";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore login after refresh
  useEffect(() => {

    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoading(false);

  }, []);

  // =========================
  // SIGNUP
  // =========================

  function signup(formData) {

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

    toast.success("Account created successfully!");

    return userData;
  }


  // LOGIN
  function login(email, password) {

    setLoading(true);
    setError(null);

    try {

      let userData;

      // ADMIN LOGIN
      if (
        email === ADMIN_EMAIL?.trim() &&
        password === ADMIN_PASSWORD
      ) {

        userData = {
          id: "admin-1",
          name: "Admin",
          email: email,
          role: "admin",
        };

      }

      // USER LOGIN
      else {

        console.log("👤 USER LOGIN");

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

      toast.success("Login successful!");

      return userData;

    } catch (err) {

      setError(err.message);
      toast.error("Login failed");

      throw err;

    } finally {

      setLoading(false);

    }
  }


  // LOGOUT
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
        signup,
        login,
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
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}