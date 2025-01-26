import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});

export const auth = betterAuth({
    adapter: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseUrl: process.env.BETTER_AUTH_URL,
    providers: [],
    emailAndPassword: {  
        enabled: true,
        autoSignIn: false 
    },
    
    socialProviders: { 
      github: { 
          clientId: process.env.GITHUB_CLIENT_ID || "", 
          clientSecret: process.env.GITHUB_CLIENT_SECRET || "", 
      } 
  }, 
  

});

export const { handler } = auth;
