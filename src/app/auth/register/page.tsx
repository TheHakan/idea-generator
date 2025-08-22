"use client";
import AuthForm from '../../AuthForm';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <nav className="w-full flex items-center px-8 py-4">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
          <FaHome className="text-xl" />
          Home
        </Link>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
