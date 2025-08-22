'use client';

import SubmitIdea from './SubmitIdea';
import IdeaList from './IdeaList';
import { useState } from 'react';

export default function Home() {
  const [refreshSignal, setRefreshSignal] = useState(0);
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-center font-sans">
      <header className="w-full max-w-2xl mx-auto text-center py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-lg">💡 Idea Generator</h1>
        <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">Share, vote, and discover the best ideas from the community.</p>
      </header>
      <section className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-10 border border-gray-200 backdrop-blur-md">
        <SubmitIdea onIdeaSubmitted={() => setRefreshSignal(s => s + 1)} />
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
