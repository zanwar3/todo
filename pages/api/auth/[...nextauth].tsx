import { NextApiRequest,NextApiResponse } from "next"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const gi:any=process.env.GOOGLE_ID
  const gs:any=process.env.GOOGLE_SECRET
  const providers = [
    GoogleProvider({
        clientId: gi,
        clientSecret: gs,
    })
  ]


  return await NextAuth(req, res, {
    providers,secret: process.env.GOOGLE_SECRET
  })
}