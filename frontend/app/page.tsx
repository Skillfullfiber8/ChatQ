"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              ChatQ Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              AI-powered WhatsApp support system
            </p>
          </div>

          <button
            className="
              bg-green-600
              hover:bg-green-700
              px-5
              py-3
              rounded-xl
              font-semibold
            "
          >
            WhatsApp Connected
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#1a1d29] p-6 rounded-2xl">
            <h2 className="text-gray-400 text-sm">
              Chats Today
            </h2>

            <p className="text-4xl font-bold mt-3">
              47
            </p>
          </div>

          <div className="bg-[#1a1d29] p-6 rounded-2xl">
            <h2 className="text-gray-400 text-sm">
              Pending Reviews
            </h2>

            <p className="text-4xl font-bold mt-3 text-yellow-400">
              12
            </p>
          </div>

          <div className="bg-[#1a1d29] p-6 rounded-2xl">
            <h2 className="text-gray-400 text-sm">
              AI Resolved
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-400">
              83%
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Link href="/reviews">

            <div
              className="
                bg-[#1a1d29]
                p-8
                rounded-2xl
                hover:bg-[#232838]
                transition
                cursor-pointer
              "
            >
              <h2 className="text-2xl font-bold mb-3">
                Review Queue
              </h2>

              <p className="text-gray-400">
                Approve AI-generated pricing,
                courier and payment replies.
              </p>
            </div>

          </Link>

          <div
            className="
              bg-[#1a1d29]
              p-8
              rounded-2xl
            "
          >
            <h2 className="text-2xl font-bold mb-3">
              Business Settings
            </h2>

            <p className="text-gray-400">
              Configure prompts, products,
              pricing and automation rules.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}