"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";


import Link from 'next/link';

export default function AuthForm({ onAuth, mode = 'signin' }: { onAuth?: () => void, mode?: 'signin' | 'register' }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(mode === 'register');
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setIsRegister(mode === 'register');
  }, [mode]);

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (isRegister) {
      if (!accepted) {
        setMessage("You must accept the Terms of Service and Privacy Policy to register.");
        return;
      }
      const { error } = await supabase.auth.signUp({ email, password });
      if (!error) {
        setMessage("Registration successful! Redirecting to home...");
        setTimeout(() => router.push('/'), 1000);
      } else {
        setMessage(error.message);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        setMessage("Signed in! Redirecting to home...");
        setTimeout(() => router.push('/'), 1000);
        if (onAuth) onAuth();
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/90 rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">{isRegister ? "Register" : "Sign In"}</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full text-black placeholder-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full text-black placeholder-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {isRegister && (
          <label className="flex items-center text-black text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={e => setAccepted(e.target.checked)}
              className="mr-2"
              required
            />
            I accept the
            <Link href="/terms" className="underline text-blue-600 mx-1" target="_blank">Terms of Service</Link>
            and
            <Link href="/privacy" className="underline text-blue-600 mx-1" target="_blank">Privacy Policy</Link>
          </label>
        )}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          type="submit"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>
      </form>
      <button
        className="mt-4 text-blue-500 hover:underline w-full"
        type="button"
        onClick={() => {
          if (isRegister) {
            router.push('/auth/login');
          } else {
            router.push('/auth/register');
          }
        }}
      >
        {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
      </button>
      {message && <p className="mt-4 text-center text-black">{message}</p>}
    </div>
  );
}
