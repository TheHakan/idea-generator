'use client';

import SubmitIdea from './SubmitIdea';
import IdeaList from './IdeaList';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import TopNav from './TopNav';

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col font-sans">
      <TopNav user={user} onSignOut={handleSignOut} />
      <header className="w-full max-w-2xl mx-auto text-center py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-lg">💡 Idea Generator</h1>
        <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">Share, vote, and discover the best ideas from the community.</p>
      </header>
      <section className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-10 border border-gray-200 backdrop-blur-md">
        {!user && (
          <div className="text-center text-gray-600 mb-4">Sign in or register to submit and upvote ideas.</div>
        )}
        {user && <SubmitIdea onIdeaSubmitted={() => setRefreshSignal(s => s + 1)} />}
        <div className="border-t border-gray-200 pt-8">
          <IdeaList refreshSignal={refreshSignal} />
        </div>
      </section>
      <footer className="w-full text-center text-gray-400 text-sm mt-10 pb-4">
        Built with <span className="text-blue-500 font-semibold">Next.js</span> & <span className="text-green-600 font-semibold">Supabase</span>
      </footer>
    </main>
  );
}
