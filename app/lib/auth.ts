import { User, users } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { NotLoggedInError } from "@/app/lib/errors";
import { cache } from "react";
import { jwtVerify } from "jose";
import { createClient } from "@/app/lib/supabase/server";
import { type cookies } from "next/headers";
import { getFirst } from "@/app/lib/helpers";

export async function signOutSessionUser(
  cookieStore: ReturnType<typeof cookies>,
) {
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut({ scope: "local" });
}

const getSessionUserImpl = cache(async (email: string, externalId: string) => {
  const db = await getDb();

  return await db
    .insert(users)
    .values({
      email,
      externalId,
      creditBalance: "1000",
      role: "admin",
    })
    .onConflictDoUpdate({
      target: users.externalId,
      set: { email },
    })
    .returning()
    .then(getFirst);
});

export async function getSessionUser(
  cookieStore: ReturnType<typeof cookies>,
): Promise<User | undefined> {
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (!session.error && session.data.session?.access_token) {
    try {
      const data = await jwtVerify(
        session.data.session.access_token,
        new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!),
      );

      if (
        data.payload.sub &&
        "email" in data.payload &&
        typeof data.payload.email == "string"
      ) {
        return getSessionUserImpl(data.payload.email, data.payload.sub);
      }
    } catch {}
  }
}
