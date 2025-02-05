"use client";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardData() {
  const { data: session, isPending, error } = authClient.useSession();
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
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
  console.log(session);
  console.log(session.user);
  console.log(session.user?.image);

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                  priority
                  unoptimized
                  loader={loaderProp}
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome, {session.user?.name}
              </h2>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Account Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{session.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
