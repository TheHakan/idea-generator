"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-black">Privacy Policy</h1>
        <p className="mb-4 text-black">
          We respect your privacy. Your email and ideas are stored securely and are never shared with third parties except as required by law. You may request deletion of your data at any time by contacting support.
        </p>
        <p className="text-black">
          This policy may be updated from time to time. Continued use of the app constitutes acceptance of the latest version.
        </p>
      </div>
    </div>
  );
}
