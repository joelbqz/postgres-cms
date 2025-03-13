"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          // Redirigir al dashboard o página principal
          window.location.href = "/dashboard";
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  const handleSignUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name: email,
      },
      {
        onSuccess: () => {
          // Redirigir al dashboard o página principal
          window.location.href = "/dashboard";
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2">
        <Button onClick={handleSignIn}>Sign In</Button>
        <Button variant="outline" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
