import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import * as firestoreFunction from "firebase/firestore";
import { db } from "../../../firebase";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  adapter: FirebaseAdapter({
    db: db,
    ...firestoreFunction,
  }),

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signup",
  },
});
