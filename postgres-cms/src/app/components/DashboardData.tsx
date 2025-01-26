"use client";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardData() {
  const { data: session, isPending, error } = authClient.useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Failed to load session: {error.message}
      </div>
    );
  }

  if (!session) {
    redirect("/");
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl mb-4">Welcome, {session.user?.name}</h2>
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
