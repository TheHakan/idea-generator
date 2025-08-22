'use client';

import SubmitIdea from './SubmitIdea';
import IdeaList from './IdeaList';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import TopNav from './TopNav';
import { FaPlus } from 'react-icons/fa';

export default function Home() {
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const [showModal, setShowModal] = useState(false);
  // Smooth modal open/close with ESC key
  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showModal]);
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col font-sans">
      <TopNav user={user} onSignOut={handleSignOut} />
      <div className={showModal ? 'blur-sm pointer-events-none select-none transition-all duration-200' : 'transition-all duration-200'}>
        <header className="w-full max-w-2xl mx-auto text-center py-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-lg">💡 Idea Generator</h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">Share, vote, and discover the best ideas from the community.</p>
        </header>
        <section className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-10 border border-gray-200 backdrop-blur-md relative">
          {!user && (
            <div className="text-center text-gray-600 mb-4">Sign in or register to submit and upvote ideas.</div>
          )}
          {user && (
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Submit Idea"
                onClick={() => setShowModal(true)}
              >
                <FaPlus size={22} />
              </button>
            </div>
          )}
          <div className="border-t border-gray-200 pt-8">
            <IdeaList refreshSignal={refreshSignal} />
          </div>
        </section>
        <footer className="w-full text-center text-gray-400 text-sm mt-10 pb-4">
          Built with <span className="text-blue-500 font-semibold">Next.js</span> & <span className="text-green-600 font-semibold">Supabase</span>
        </footer>
      </div>
      {user && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity animate-fadeIn" style={{animation: 'fadeIn 0.2s'}}>
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative scale-95 opacity-0 animate-modalIn"
            style={{animation: 'modalIn 0.18s cubic-bezier(.4,2,.6,1) forwards'}}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Submit a New Idea</h2>
            <SubmitIdea
              autoFocus
              onIdeaSubmitted={() => {
                setRefreshSignal(s => s + 1);
                setShowModal(false);
              }}
            />
          </div>
          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}
