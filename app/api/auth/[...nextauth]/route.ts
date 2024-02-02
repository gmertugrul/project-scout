import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import { pgDrizzleAdapter } from "@/app/api/auth/[...nextauth]/adapter";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: pgDrizzleAdapter(),
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};

let auth = NextAuth(authOptions)

export { auth as GET, auth as POST };
