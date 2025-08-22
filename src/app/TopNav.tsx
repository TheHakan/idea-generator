"use client";
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function TopNav({ user, onSignOut }: { user: User | null, onSignOut: () => void }) {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-extrabold text-blue-700 tracking-tight hover:opacity-80 transition">💡 IdeaGen</Link>
        <Link href="/about" className="text-gray-600 font-semibold px-3 py-1 rounded hover:bg-blue-50 transition">About</Link>
        <Link href="/feedback" className="text-gray-600 font-semibold px-3 py-1 rounded hover:bg-blue-50 transition">Feedback & Reports</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/terms" className="text-gray-500 text-sm hover:underline">Terms</Link>
        <Link href="/privacy" className="text-gray-500 text-sm hover:underline">Privacy</Link>
        {!user && (
          <>
            <Link
              href="/auth/login"
              className="text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-green-600 font-semibold px-4 py-2 rounded hover:bg-green-50 transition"
            >
              Register
            </Link>
          </>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">{user.email}</span>
            <button
              className="text-red-500 font-semibold px-4 py-2 rounded hover:bg-red-50 transition"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
