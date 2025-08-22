'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaArrowUp } from 'react-icons/fa';

export default function IdeaList({ refreshSignal }: { refreshSignal?: number }) {
  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    fetchIdeas();
    // eslint-disable-next-line
  }, [refreshSignal]);

  const fetchIdeas = async () => {
    const { data } = await supabase
      .from('ideas')
      .select('*')
      .eq('is_private', false)
      .order('votes', { ascending: false });
    setIdeas(data || []);
  };

  const upvote = async (id: number) => {
    // Optimistically update UI
    setIdeas(prevIdeas =>
      prevIdeas.map(idea =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
    // Update in database
    const { error } = await supabase.rpc('upvote_idea', { idea_id: id });
    if (error) {
      // Revert if error
      setIdeas(prevIdeas =>
        prevIdeas.map(idea =>
          idea.id === id ? { ...idea, votes: idea.votes - 1 } : idea
        )
      );
      alert('Failed to upvote: ' + error.message);
    } else {
      // Optionally, re-fetch to sync with DB
      fetchIdeas();
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
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded shadow flex items-center gap-2"
              onClick={() => upvote(idea.id)}
              title="Upvote"
            >
              <FaArrowUp className="text-white" />
              Upvote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}