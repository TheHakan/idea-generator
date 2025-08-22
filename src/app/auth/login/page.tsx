"use client";
import AuthForm from '../../AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <AuthForm mode="signin" />
    </div>
  );
}
