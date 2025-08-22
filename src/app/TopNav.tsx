"use client";
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function TopNav({ user, onSignOut }: { user: User | null, onSignOut: () => void }) {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-transparent">
      <div>
        <Link href="/feedback" className="text-gray-600 font-semibold px-4 py-2 hover:underline">Feedback & Reports</Link>
      </div>
      {!user && (
        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/auth/login"
            className="text-blue-600 font-semibold px-4 py-2 hover:underline"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="text-green-600 font-semibold px-4 py-2 hover:underline"
          >
            Register
          </Link>
        </div>
      )}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">{user.email}</span>
          <button
            className="text-red-500 font-semibold px-4 py-2 hover:underline"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
