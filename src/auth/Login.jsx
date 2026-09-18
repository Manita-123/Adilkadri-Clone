import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef(null);
  const errRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Focus email input when page loads
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Clear error when user changes input
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrMsg("");

    if (!email || !password) {
      setErrMsg("Please enter both email and password.");
      return;
    }

    try {
      // Frontend-only login
      const userData = login(email, password);

      console.log("Logged in user:", userData);
      console.log("User role:", userData.role);

      // Redirect according to role
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);

      setErrMsg(
        err?.message || "Login failed. Please try again."
      );

      errRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* Error Message */}
        {errMsg && (
          <div
            ref={errRef}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
            tabIndex="-1"
          >
            <strong className="font-bold">Error! </strong>
            <span>{errMsg}</span>
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-1"
          >
            Email
          </label>

          <input
            id="email"
            ref={userRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-1"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between mb-4">

          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-amber-700 hover:underline"
          >
            Forgot?
          </Link>

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-700 text-white font-bold py-2 px-4 rounded hover:bg-amber-800 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-amber-700 hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}
