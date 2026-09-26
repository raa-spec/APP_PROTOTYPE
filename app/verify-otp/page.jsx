"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

export default function VerifyOTP() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.warn("Please enter a valid 6-digit OTP");
      return;
    }

    const password = sessionStorage.getItem("signupPassword");

    if (!password) {
      toast.error("Signup session expired. Please login manually.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.success(data.message || "Invalid OTP");
        setLoading(false);
        return;
      }

      const loginResult = await signIn("credentials", {
        identifier: email,
        password: password,
        redirect: false,
      });

      sessionStorage.removeItem("signupPassword");

      if (loginResult?.error) {
        toast.success("Email verified, but automatic login failed.");
        router.push("/login");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-3">
            ✉️
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Verify Your Email
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            We've sent a 6-digit OTP to
          </p>

          <p className="text-sm font-bold text-indigo-600 mt-1 break-all">
            {email}
          </p>
        </div>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Enter OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter 6-digit OTP"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-center text-lg font-bold tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying & Logging in..." : "Verify OTP →"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            ← Back to Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}