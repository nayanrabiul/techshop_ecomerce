import axios from "axios";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        var user = await axios.get(
          `https://techshopapi.imnayan.xyz/api/auth/nextauth?email=${credentials.email}`
        );
        user = user.data;

        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin == "true" ? true : false,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
