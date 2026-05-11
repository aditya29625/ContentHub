import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication logic
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Aditya Singh",
            email: "user@example.com",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/signup";
      
      if (!isLoggedIn && !isPublicPage) {
        return false; // Redirect to login
      }
      return true;
    },
  },
});
