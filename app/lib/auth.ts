import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import type { User } from "next-auth";

// Extend the Session and JWT types to include our custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      displayName: string | null;
      language: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    username: string;
    displayName?: string;
    language?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    displayName?: string;
    language?: string;
  }
}

// Define the shape of our Prisma User model including the language field
interface PrismaUser {
  id: string;
  username: string;
  passwordHash: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      // We need to include req parameter for NextAuth typing but we don't use it
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Find user by username
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          // If user doesn't exist, return null
          if (!user) {
            return null;
          }

          // Compare password with hash
          const isPasswordValid = await compare(
            credentials.password,
            user.passwordHash
          );

          // If password is invalid, return null
          if (!isPasswordValid) {
            return null;
          }

          // Return user object that conforms to the User type
          return {
            id: user.id.toString(),
            name: user.displayName || user.username,
            email: user.email || undefined,
            image: user.avatarUrl || undefined,
            // Custom properties for JWT
            username: user.username,
            displayName: user.displayName || undefined,
            // Use proper typing for the language property
            language: (user as PrismaUser).language || "english",
          } as User;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Add user info to token when signing in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.displayName = user.displayName;
        token.language = user.language;
      }

      // Handle session update (from useSession().update())
      if (trigger === "update" && session) {
        try {
          // Use raw query to get language field to avoid TypeScript issues
          const result = await prisma.$queryRaw<PrismaUser[]>`
            SELECT id, username, "displayName", language 
            FROM "User" 
            WHERE id = ${token.id as string}
          `;

          const freshUser =
            Array.isArray(result) && result.length > 0 ? result[0] : null;

          if (freshUser) {
            token.displayName = freshUser.displayName || undefined;
            token.language = freshUser.language || "english";
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user info to session from token
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.displayName = token.displayName as string | null;
        session.user.language = (token.language as string) || "english";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
