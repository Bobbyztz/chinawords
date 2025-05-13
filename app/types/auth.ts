import "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    displayName?: string;
    language?: string;
  }

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
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    displayName?: string;
    language?: string;
  }
}
