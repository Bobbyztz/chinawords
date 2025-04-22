import "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}
