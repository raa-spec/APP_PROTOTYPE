"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to send reset link");
        return;
      }

      toast.success("Reset link sent to your email!");
      setIdentifier("");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">
            Forgot Password?
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Enter your email or mobile number to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. rahul@example.com or 9876543210"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition mt-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link →"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/login";
          }}
          className="w-full mt-4 py-2.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
        >
          ← Back to Login
        </button>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            💡 We'll send instructions to help you reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}