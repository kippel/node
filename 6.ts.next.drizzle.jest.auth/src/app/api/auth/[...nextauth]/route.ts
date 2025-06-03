import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/db/db"
import { users } from "@/db/schema"
import { eq } from 'drizzle-orm';
import bcrypt from "bcryptjs"


const handler = NextAuth({
    providers: [
      CredentialsProvider({
          name: 'credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith"},
            password: { label: "Password", type: "password", placeholder: "********" }
          },
          async authorize(credentials, req) {
            //const user = { id : "1", name: "j smith", email: "john@gmail.com"};
            ///console.log(credentials)
            const result = await db.select().from(users)
                .where(eq(users.email, credentials?.email))
                .get();
            ///console.log(result)
            if (!result) throw new Error("Invalid")
            
            const passwordM = await bcrypt.compare(credentials!.password, result.password)  
            if (!passwordM) throw new Error("Invalid")
            
            return {
              id: result.id,
              user: result.name
            }; // user;
          },
      }),
    ],
    callbacks: {
      jwt({account, token, user, profile, session}){
        /*
        console.log({
          account,
          token,
          user,
          profile
        })
        */
        if (user) token.user = user;
        //console.log(user)
        //console.log("ddddddddddd")
        return token
      },
      session({session, token}){
        //console.log({session, token})
        session.user = token.user as any;
        return session;
      },
    },
    pages: {
      signIn: '/login'
    },
    
});

export { handler as GET, handler as POST }