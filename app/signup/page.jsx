
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password
    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Don't send confirmPassword to backend
      const signupData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      console.log("Signup response:", data);

      /*
       * Backend should generate an OTP
       * and send it to the user's email.
       */

      toast.success("OTP has been sent to your email.");

      sessionStorage.setItem("signupPassword", formData.password);
      // Redirect to OTP verification page
      window.location.href =
        `/verify-otp?email=${encodeURIComponent(formData.email)}`;

    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* Header */}
        <div className="text-center mb-6">

          <h2 className="text-2xl font-black text-slate-900">
            Create your Account
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Book tokens for yourself, children, or elderly family members
          </p>

        </div>

        {/* Login / Signup Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-semibold">

          <button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            className="flex-1 py-2 rounded-lg text-slate-600 hover:text-indigo-600 transition"
          >
            Login
          </button>

          <button
            type="button"
            className="flex-1 py-2 rounded-lg bg-white shadow-sm text-indigo-600 font-bold"
          >
            Create Account
          </button>

        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Your Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g. rahul@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Mobile Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition mt-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending OTP..."
              : "Create Account & Continue →"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">

          <div className="flex-1 border-t border-slate-200"></div>

          <span className="px-3 text-xs text-slate-400">
            OR
          </span>

          <div className="flex-1 border-t border-slate-200"></div>

        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:bg-slate-100 disabled:cursor-not-allowed"
        >
          <span className="text-lg font-bold">
            G
          </span>

          <span>
            Continue with Google
          </span>
        </button>

        {/* Bottom Information */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">

          <p className="text-xs text-slate-400">
            💡 We'll send an OTP to your email to verify your account.
          </p>

        </div>

      </div>

    </div>
  );
}







