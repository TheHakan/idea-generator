"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function FeedbackPage() {
  const [type, setType] = useState("feature");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    if (!message.trim()) {
      setStatus("Please enter your feedback.");
      return;
    }
    const { error } = await supabase.from("feedback").insert([{ type, message }]);
    setStatus(error ? error.message : "Thank you for your feedback!");
    if (!error) setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-100">
  <nav className="w-full flex items-center px-8 py-4">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            <FaHome className="text-xl" />
            Home
          </Link>
        </div>
        <div className="flex gap-2 justify-end">
          <Link href="/auth/login" className="text-blue-600 font-semibold px-4 py-2 hover:underline">Sign In</Link>
          <Link href="/auth/register" className="text-green-600 font-semibold px-4 py-2 hover:underline">Register</Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-black mb-2">Feedback & Reports</h2>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold border ${type === 'feature' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
              onClick={() => setType('feature')}
            >
              Add Feature
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold border ${type === 'report' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-red-500'}`}
              onClick={() => setType('report')}
            >
              Report
            </button>
          </div>
          <textarea
            className="border p-2 w-full text-black placeholder-black rounded"
            rows={5}
            placeholder={type === 'feature' ? 'Describe the feature you want...' : 'Describe the issue or bug...'}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
            type="submit"
          >
            Submit
          </button>
          {status && <p className="text-center text-black mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
