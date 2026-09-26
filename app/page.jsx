
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  // Check whether the user is logged in
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login
  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            WaitLess
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, {user?.name || "User"}
            </span>

            <Link
              href="/api/auth/signout"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to WaitLess 👋
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Manage appointments, queues and waiting time in one place.
        </p>

        <p className="mt-2 text-gray-500">
          Logged in as: {user?.email}
        </p>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Clinics */}
          <Link
            href="/services/clinics"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🏥</div>

            <h3 className="text-xl font-bold">
              Clinics
            </h3>

            <p className="mt-2 text-gray-600">
              Find clinics and manage doctor appointments.
            </p>
          </Link>

          {/* Diagnostic Labs */}
          <Link
            href="/services/diagnostic-labs"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🧪</div>

            <h3 className="text-xl font-bold">
              Diagnostic Labs
            </h3>

            <p className="mt-2 text-gray-600">
              Book diagnostic tests and manage your waiting time.
            </p>
          </Link>

          {/* Parlours */}
          <Link
            href="/services/parlours"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">💄</div>

            <h3 className="text-xl font-bold">
              Parlours
            </h3>

            <p className="mt-2 text-gray-600">
              Book beauty services and select available staff.
            </p>
          </Link>

          {/* Salons */}
          <Link
            href="/services/salons"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">✂️</div>

            <h3 className="text-xl font-bold">
              Salons
            </h3>

            <p className="mt-2 text-gray-600">
              Find salons, services and available staff.
            </p>
          </Link>

        </div>
      </section>
    </main>
  );
}

