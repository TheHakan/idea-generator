"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-black">About Idea Generator</h1>
        <p className="mb-4 text-black">
          <b>Idea Generator</b> is a community-driven idea board built with Next.js and Supabase. It allows users to submit new ideas, upvote their favorites, and see the top-ranked ideas in real time. The platform is designed to foster creativity and collaboration.
        </p>
        <ul className="list-disc pl-6 mb-4 text-black">
          <li>Submit and share your ideas with the community</li>
          <li>Upvote the best ideas to help them rise to the top</li>
          <li>Browse public ideas or keep your ideas private</li>
          <li>Sign in/register securely with email and password</li>
          <li>Give feedback or report issues directly from the app</li>
        </ul>
        <p className="text-black">
          This project is open source and built for learning, prototyping, and community engagement. Contributions and feedback are welcome!
        </p>
      </div>
    </div>
  );
}
