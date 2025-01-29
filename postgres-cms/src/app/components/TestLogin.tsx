"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function TestLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(
    null
  );

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      setDebugInfo(null);

      console.log("🔍 Starting login attempt...");

      const response = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            console.log("📤 Request initiated:", { email });
            setDebugInfo((prev) => ({ ...prev, requestStarted: true }));
          },
          onSuccess: (session) => {
            console.log("✅ Login successful:", session);
            setDebugInfo((prev) => ({ ...prev, session }));
            router.push("/dashboard");
          },
          onError: (ctx) => {
            console.error("❌ Login failed:", {
              error: ctx.error,
              code: ctx.error.code,
              message: ctx.error.message,
              stack: ctx.error.stack,
            });
            setError(ctx.error.message);
            setDebugInfo((prev) => ({ ...prev, error: ctx.error }));
          },
        }
      );

      console.log("📥 Auth response:", response);
      setDebugInfo((prev) => ({ ...prev, response }));
    } catch (error) {
      console.error("💥 Unexpected error:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setDebugInfo((prev) => ({ ...prev, unexpectedError: error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Test Login</h2>
      <div className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Loading..." : "Test Login"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-500 rounded">{error}</div>
        )}

        {debugInfo && (
          <div className="mt-8 p-4 bg-gray-50 rounded">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
