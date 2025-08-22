'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SubmitIdea({ onIdeaSubmitted }: { onIdeaSubmitted?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('ideas').insert([
      { title, description, is_private: isPrivate }
    ]);
    setMessage(error ? error.message : 'Idea submitted!');
    if (!error) {
      setTitle('');
      setDescription('');
      setIsPrivate(false);
      if (onIdeaSubmitted) onIdeaSubmitted();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full text-black placeholder-black"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full text-black placeholder-black"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      {/* <label className="flex items-center text-black">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={e => setIsPrivate(e.target.checked)}
          className="accent-black"
        />
        <span className="ml-2">Private</span>
      </label> */}
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        Submit Idea
      </button>
      {message && <p className="text-black">{message}</p>}
    </form>
  );
}