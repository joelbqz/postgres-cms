import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    secret: process.env.BETTER_AUTH_SECRET!,
    baseUrl: "http://localhost:3000",
    basePath: "/api/auth",
    debug: true,
    emailAndPassword: {
        enabled: true,
        debug: true,
    }
});

prisma.$connect()
  .then(() => {
    console.log('✅ Prisma connected successfully');
    
    return prisma.user.findMany();
  })
  .then(users => {
    console.log('✅ Database query successful, found', users.length, 'users');
  })
  .catch(e => {
    console.error('❌ Database error:', e);
    process.exit(1); 
  });

export const { handler } = auth;
