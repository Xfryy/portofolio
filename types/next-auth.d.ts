import { DefaultSession } from 'next-auth'
import { DefaultUser } from 'next-auth'


declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      username?: string;
      provider?: string;
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    username?: string;
    provider?: 'manual' | 'google';
    providerId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
    providerId?: string;
  }
}
