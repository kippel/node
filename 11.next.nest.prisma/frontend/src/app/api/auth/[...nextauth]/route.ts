import { Backend_URL } from "@/lib/Constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CreadentialsProvider from "next-auth/providers/credentials";



export const authOptions: NextAuthOptions = {
    providers: [
        CreadentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials, req){

                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                console.log("red")
                
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                const res = await fetch( `${backendUrl}/api/auth/login`,{
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                    },
                });
                console.log(res)
                console.log("wwwwwwwwwww")
                if (res.status  == 401){
                    console.log(res.statusText);
                    console.log("dddd")
                    return;
                }

                const user = await res.json();
                console.log(user)
                console.log("kkkkkkkkkkkk")
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user}){
            console.log({token, user});
            if (user) return { ...token, ...user};

            return token;
        },
        async session({token, session}){
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
    pages: {
      signIn: '/'
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};