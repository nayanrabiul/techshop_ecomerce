import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import mysql from "mysql2";
import User from "../../../models/User";
import Connection from "../../../utils/db";

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
        // var Connection = mysql.createConnection({
        //   host: "127.0.0.1",
        //   port: "3306",
        //   user: "root",
        //   database: "ecomerce",
        // });

        // Connection.connect(function (err) {
        //   if (err) throw err;
        //   console.log("connected!");
        // });
        var user = Connection.query("SELECT * FROM `users` WHERE email=?", [
          credentials.email,
        ]);
        user = user[0];

        console.log(user, "user,36");
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
