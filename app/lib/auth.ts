import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
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

          // Return user object without password
          return {
            id: user.id.toString(),
            username: user.username,
            displayName: user.displayName || null,
            language: user.language || "chinese",
          };
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
        // If session is updated, fetch fresh user data
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            username: true,
            displayName: true,
            language: true,
          },
        });

        if (freshUser) {
          token.displayName = freshUser.displayName;
          token.language = freshUser.language;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user info to session from token
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.displayName = (token.displayName as string) || null;
        session.user.language = (token.language as string) || "chinese";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
