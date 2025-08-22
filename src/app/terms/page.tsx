"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-black">Terms of Service</h1>
        <p className="mb-4 text-black">
          By using this app, you agree to abide by all applicable laws and regulations. You must not use the app for any unlawful or abusive purposes. The app is provided as-is, without warranty. We reserve the right to update these terms at any time.
        </p>
        <p className="text-black">
          For questions, contact the site administrator.
        </p>
      </div>
    </div>
  );
}
