import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Signup Form, 2: OTP Verification
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userEmail, setUserEmail] = useState(""); // Store email for OTP verification

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation helper
  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Name is required." });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email is required." });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage({ type: "error", text: "Invalid email format." });
      return false;
    }
    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return false;
    }
    if (!formData.phone.trim()) {
      setMessage({ type: "error", text: "Phone is required." });
      return false;
    }
    return true;
  };

  // ✅ Handle Signup Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };

      console.log("📝 Submitting signup:", payload); // ✅ DEBUG

      const result = await signup(payload);
      
      console.log("✅ Signup successful:", result); // ✅ DEBUG

      setUserEmail(formData.email); // Store email for OTP verification
      
      console.log("📍 Moving to step 2"); // ✅ DEBUG
      setStep(2); // Move to OTP verification step
      
      setMessage({ type: "success", text: "OTP sent to your email!" });
    } catch (err) {
      console.error("❌ Signup error:", err); // ✅ DEBUG
      setMessage({ 
        type: "error", 
        text: err.message || "Signup failed. Try again." 
      });
    } finally {
      setLoading(false);
    }
  };


  const API_URL = "http://localhost:5000";

  // ✅ Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!otp.trim()) {
      setMessage({ type: "error", text: "OTP is required." });
      return;
    }

    if (otp.length !== 6) {
      setMessage({ type: "error", text: "OTP must be 6 digits." });
      return;
    }

    setLoading(true);
    try {
      console.log("🔐 Verifying OTP:", { email: userEmail, otp }); // ✅ DEBUG

      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP verification failed");
      }

      const data = await response.json();
      console.log("✅ OTP verified:", data); // ✅ DEBUG

      setMessage({ type: "success", text: "Email verified successfully! 🎉" });
      toast.success("Registration complete!");

      // Redirect after success
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("❌ OTP error:", err); // ✅ DEBUG
      setMessage({ 
        type: "error", 
        text: err.message || "OTP verification failed" 
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      console.log("📧 Resending OTP to:", userEmail); // ✅ DEBUG

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: userEmail,
          password: formData.password,
          phone: formData.phone,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }

      setMessage({ type: "success", text: "OTP resent to your email!" });
      toast.success("OTP resent!");
    } catch (err) {
      console.error("❌ Resend error:", err); // ✅ DEBUG
      setMessage({ type: "error", text: "Failed to resend OTP" });
    } finally {
      setLoading(false);
    }
  };

  console.log("📊 Current step:", step); // ✅ DEBUG - Log current step

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-6 shadow-md w-full max-w-md rounded-xl"
        onSubmit={step === 1 ? handleSubmit : handleVerifyOtp}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-4">
          {step === 1 ? "Register" : "Verify Email"}
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-2 rounded text-sm ${
              message.type === "error" 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ✅ STEP 1: SIGNUP FORM */}
        {step === 1 && (
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                disabled={loading}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-2 rounded bg-amber-600 text-white font-semibold disabled:opacity-60 w-full hover:bg-amber-700 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 hover:underline font-semibold">
                Login here
              </Link>
            </p>
          </div>
        )}

        {/* ✅ STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center mb-4">
              <p className="text-gray-600">
                We sent an OTP to <strong>{userEmail}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-2">Enter the 6-digit OTP</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">OTP Code</label>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only allow numbers
                placeholder="000000"
                className="border rounded py-3 px-3 w-full text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-2 rounded bg-green-600 text-white font-semibold disabled:opacity-60 w-full hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="px-6 py-2 rounded bg-gray-300 text-gray-700 font-semibold disabled:opacity-60 w-full hover:bg-gray-400 transition"
            >
              Resend OTP
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setMessage({ type: "", text: "" });
              }}
              className="text-center text-amber-600 hover:underline text-sm mt-2"
            >
              Back to Signup
            </button>
          </div>
        )}
      </form>
    </div>
  );
}