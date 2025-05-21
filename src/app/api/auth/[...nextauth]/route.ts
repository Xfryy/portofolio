import NextAuth, { 
  NextAuthOptions,
  User as NextAuthUser,
  Account
} from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await User.findOne({ email: credentials.email });

          if (!user || !user?.password) {
            return null;
          }

          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
            image: user.image
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {    async signIn({ user, account }: { 
      user: NextAuthUser, 
      account: Account | null
    }){
      try {
        await dbConnect();
        
        if (account?.provider === 'google') {
          const existingUser = await User.findOne({ 
            $or: [
              { email: user.email },
              { providerId: account.providerAccountId }
            ]
          });

          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              username: user.name || user.email?.split('@')[0],
              image: user.image,
              provider: 'google',
              providerId: account.providerAccountId
            });
            user.id = newUser._id.toString();
            return true;
          }

          if (existingUser.provider !== 'google') {
            return false;
          }
          
          user.id = existingUser._id.toString();
          if (user.name && user.name !== existingUser.username || user.image !== existingUser.image) {
            await User.findByIdAndUpdate(existingUser._id, {
              username: user.name,
              image: user.image
            });
          }
          return true;
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.sub!;
        try {
          await dbConnect();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dbUser = await User.findById(token.sub).lean() as any;
          if (dbUser) {
            session.user.username = dbUser.username || null;
            session.user.provider = dbUser.provider || null;
            session.user.image = dbUser.image || null;
          }
        } catch (error) {
          console.error('Error in session callback:', error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }: { 
      token: JWT;
      user?: NextAuthUser;
      account?: Account | null;
    }) {
      if (user) {
        token.sub = user.id;
      }
      if (account) {
        token.provider = account.provider;
        token.providerId = account.providerAccountId;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
