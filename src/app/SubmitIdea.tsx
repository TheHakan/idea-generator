'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';


interface SubmitIdeaProps {
  onIdeaSubmitted?: () => void;
  autoFocus?: boolean;
}

export default function SubmitIdea({ onIdeaSubmitted, autoFocus }: SubmitIdeaProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus title input when modal opens
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('ideas').insert([
      { title, description, is_private: isPrivate }
    ]);
    setLoading(false);
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
        ref={inputRef}
        className="border p-2 w-full text-black placeholder-black"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        disabled={loading}
      />
      <textarea
        className="border p-2 w-full text-black placeholder-black"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        disabled={loading}
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
      <button className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Idea'}
      </button>
      {message && <p className={`text-sm ${message.includes('submitted') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </form>
  );
}