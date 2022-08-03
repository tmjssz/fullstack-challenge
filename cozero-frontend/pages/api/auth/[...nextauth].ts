import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { BACKEND_URL } from "../../../constants/backend.constants";



export default NextAuth({
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const url = `${BACKEND_URL}auth/login`;
        console.log('Authorizing...');

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json"
          }
        })

        const user = await res.json();


        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      }
    }),

  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the  access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return Promise.resolve(token)
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return Promise.resolve(session)
    }
  }

})