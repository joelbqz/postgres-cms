"use client";
import { signIn } from "@/lib/auth-client";

export function GitHubLogin() {
  const handleSignIn = async () => {
    console.log("Signing in with GitHub");
    await signIn();
  };

  return (
    <button
      className="bg-stone-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      onClick={handleSignIn}
    >
      Sign in with GitHub
    </button>
  );
}

export default GitHubLogin;
