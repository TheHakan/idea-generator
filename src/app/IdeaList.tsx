'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaArrowUp } from 'react-icons/fa';

type User = {
  id: string;
  email?: string;
};

type Vote = {
  idea_id: number;
};

type Idea = {
  id: number;
  title: string;
  description: string;
  votes: number;
  is_private: boolean;
};

export default function IdeaList({ refreshSignal }: { refreshSignal: number }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userVotes, setUserVotes] = useState<number[]>([]);

  useEffect(() => {
    fetchIdeas();
    getUserAndVotes();
  }, [refreshSignal]);

  const getUserAndVotes = async () => {
    const { data: userData } = await supabase.auth.getUser();
    setUser(userData?.user ?? null);
    if (userData?.user) {
      const { data: votes } = await supabase
        .from('idea_votes')
        .select('idea_id')
        .eq('user_id', userData.user.id);
      setUserVotes((votes || []).map((v: Vote) => v.idea_id));
    } else {
      setUserVotes([]);
    }
  };

  const fetchIdeas = async () => {
    const { data } = await supabase
      .from('ideas')
      .select('*')
      .eq('is_private', false)
      .order('votes', { ascending: false });
    setIdeas(data || []);
  };

  const upvote = async (id: number) => {
    if (!user || userVotes.includes(id)) return;
    // Optimistically update UI
    setIdeas(prevIdeas =>
      prevIdeas.map(idea =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
    setUserVotes(prev => [...prev, id]);
    // Update in database (pass user_id)
    const { error } = await supabase.rpc('upvote_idea', { idea_id: id, user_id: user.id });
    if (error) {
      // Revert if error
      setIdeas(prevIdeas =>
        prevIdeas.map(idea =>
          idea.id === id ? { ...idea, votes: idea.votes - 1 } : idea
        )
      );
      setUserVotes(prev => prev.filter(vid => vid !== id));
      alert('Failed to upvote: ' + error.message);
    } else {
      // Optionally, re-fetch to sync with DB and votes
      fetchIdeas();
      getUserAndVotes();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-black">Top Ideas</h2>
      <ul>
        {ideas.map(idea => (
          <li key={idea.id} className="border p-4 mb-2 flex justify-between items-center bg-white/90">
            <div>
              <h3 className="font-semibold text-black">{idea.title}</h3>
              <p className="text-black">{idea.description}</p>
              <span className="text-sm text-gray-700">Votes: {idea.votes}</span>
            </div>
            {user && (
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded shadow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => upvote(idea.id)}
                title={userVotes.includes(idea.id) ? 'You already upvoted' : 'Upvote'}
                disabled={userVotes.includes(idea.id)}
              >
                <FaArrowUp className="text-white" />
                Upvote
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}