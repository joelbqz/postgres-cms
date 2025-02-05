"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function TestLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            console.log("Request started");
          },
          onSuccess: (ctx) => {
            console.log("Login successful", ctx);
            window.location.href = "/dashboard";
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        {isLoading ? "Loading..." : "Sign In"}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}
