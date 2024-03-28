import NextAuth from "next-auth/next";
import {NextAuthOptions} from "next-auth";
import {db} from "@/lib/db";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import {nanoid} from "nanoid";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({token, session}) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({token, user}) {
      if (!token.sub) return token;

      const existingUser = await db.user.findFirst({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) {
        token.id = user.id;
        return token;
      }

      if (!existingUser.username) {
        await db.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            username: nanoid(10),
          },
        });
      }

      return {
        id: existingUser.id,
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        picture: existingUser.image,
      };
    },
    redirect({url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
