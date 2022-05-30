import { NextApiRequest,NextApiResponse } from "next"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    // CredentialProvider({
    //     name: "credentials",
    //     credentials: {
    //       username: {
    //         label: "Email",
    //         type: "text",
    //         placeholder: "johndoe@test.com",
    //       },
    //       password: { label: "Password", type: "password" },
    //     },
    //     authorize: (credentials) => {
    //       // database look up
    //       if (
    //         credentials.username === "john" &&
    //         credentials.password === "test"
    //       ) {
    //         return {
    //           id: 2,
    //           name: "John",
    //           email: "johndoe@test.com",
    //         };
    //       }
  
    //       // login failed
    //       return null;
    //     },
    //   }),
  ]


  return await NextAuth(req, res, {
    providers,secret: process.env.GOOGLE_SECRET
  })
}