import { createAuthClient } from "better-auth/react";

if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL must be defined");
}

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
});


export const { useSession, signUp, signIn, signOut } = authClient;




