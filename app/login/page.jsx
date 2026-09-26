 
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier: formData.identifier,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.warn("Invalid email/phone or password");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("Login successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.success("Google login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* Header */}
        <div className="text-center mb-6">

      

          <h2 className="text-2xl font-black text-slate-900">
            Welcome to QueueEase
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Book tokens for yourself, children, or elderly family members
          </p>

        </div>

        {/* Login / Signup Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-semibold">

          <button
            type="button"
            className="flex-1 py-2 rounded-lg bg-white shadow-sm text-indigo-600 font-bold"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/signup";
            }}
            className="flex-1 py-2 rounded-lg text-slate-600 hover:text-indigo-600 transition"
          >
            Create Account
          </button>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email / Mobile */}
          <div>

            <label
              htmlFor="identifier"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Email or Mobile Number
            </label>

            <input
              id="identifier"
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com or 9876543210"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition mt-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login to Continue →"}
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
          <span className="text-lg">G</span>

          <span>
            Continue with Google
          </span>
        </button>

        {/* Bottom Information */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">

          <p className="text-xs text-slate-400">
            💡 Login to book tokens and manage your appointments.
          </p>

        </div>

      </div>

    </div>
  );
}
