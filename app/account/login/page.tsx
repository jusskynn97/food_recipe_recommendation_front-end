"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react"
import { useAccount } from "@/hooks/useAccount";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    user,
    isSignup,
    error,
    handleEmailAuth,
    handleGoogleSignIn,
    toggleMode,
    router
  } = useAccount();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEmailAuth(email, password);
  };

  if (user!=null) router.push('/')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isSignup ? "Sign Up" : "Log In"}
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={handleGoogleSignIn}
        >
          <Mail></Mail>
          Sign in with Google
        </Button>
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button className="text-[#f26950] ml-1 underline underline-offset-4" onClick={toggleMode}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </Card>
    </div>
  );
}
