import Link from "next/link";

export default function Header({ user }) {
  const userName = user?.name || "Rahul Sharma";

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

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

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex shrink-0 items-center gap-2">

          {/* ================= USER NAME BUTTON ================= */}
          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-indigo-100
              bg-indigo-50
              px-2.5
              py-2
              transition
              hover:bg-indigo-100
              sm:px-3
            "
          >
            {/* Online Status */}
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

            {/* User Name */}
            <span className="max-w-[90px] truncate text-xs font-semibold text-indigo-700 sm:max-w-[140px] sm:text-sm">
              {userName}
            </span>
          </button>

          {/* ================= LOGOUT BUTTON ================= */}
          <Link
            href="/api/auth/signout"
            className="
              rounded-full
              border
              border-gray-200
              bg-white
              px-3
              py-2
              text-xs
              font-medium
              text-gray-500
              transition
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-500
              sm:px-4
              sm:text-sm
            "
          >
            Logout
          </Link>

        </div>
      </div>
    </header>
  );
}