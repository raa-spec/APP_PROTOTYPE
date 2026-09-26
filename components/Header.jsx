"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header({ user }) {
  const userName = user?.name || "Rahul Sharma";

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-xl font-bold">
        {/* ================= LEFT: LOGO ================= */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          {/* Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-sm sm:h-10 sm:w-10">
            <span className="text-base font-bold text-white sm:text-xl">
              Q
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
          {/* App Name */}
          <div className="min-w-0">
            <h1 className="text-sm font-bold leading-tight text-gray-900 sm:text-lg">
              QueueEase
            </h1>

            <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
              Customer Booking App
            </p>
          </div>
        </Link>

      <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2">
  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>

  <span className="text-sm font-medium text-indigo-700">
    {user?.name || "Rahul Sharma"}
  </span>

  <button
    type="button"
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="text-sm font-medium text-gray-500 hover:text-red-500 transition"
  >
    Logout
  </button>
</div>

      </div>
    </header>
  );
}