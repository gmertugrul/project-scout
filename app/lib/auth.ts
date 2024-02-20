import {
  ipos,
  nftBalances,
  nftContracts,
  players,
  User,
  users,
} from "@/app/db/schema";
import { getDb } from "@/app/db";
import { NotLoggedInError } from "@/app/lib/errors";
import { cache } from "react";
import { jwtVerify } from "jose";
import { createClient } from "@/app/lib/supabase/server";
import { type cookies } from "next/headers";
import { getFirst } from "@/app/lib/helpers";
import { eq, sql } from "drizzle-orm";

export async function signOutSessionUser(
  cookieStore: ReturnType<typeof cookies>,
) {
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut({ scope: "local" });
}

const getSessionUserImpl = cache(async (email: string, externalId: string) => {
  const db = await getDb();

  let user = await db.query.users.findFirst({
    where: eq(users.externalId, externalId),
  });

  if (user) {
    return user;
  }

  user = await db
    .insert(users)
    .values({
      email,
      externalId,
      creditBalance: "10000",
      role: "admin",
    })
    .onConflictDoUpdate({
      target: users.externalId,
      set: { email },
    })
    .returning()
    .then(getFirst);

  if (user) {
    let playersToAdd = await db
      .select({ nftContract: nftContracts.id })
      .from(players)
      .innerJoin(nftContracts, eq(nftContracts.playerId, players.id))
      .leftJoin(ipos, eq(ipos.nftContractId, nftContracts.id))
      .where(
        sql`(${ipos.status} = null or ${ipos.status} <> 'active') and ${nftContracts.isTradable}`,
      );

    for (let p of playersToAdd) {
      await db.insert(nftBalances).values({
        nftContractId: p.nftContract,
        userId: user.id,
        balance: BigInt((Math.random() * 10) | 0),
      });
    }
  }

  return user;
});

const getJwtUser = cache(async (token: string) => {
  try {
    const data = await jwtVerify(
      token,
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
});

export async function getSessionUser(
  cookieStore: ReturnType<typeof cookies>,
): Promise<User | undefined> {
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();

  if (!session.error && session.data.session?.access_token) {
    return await getJwtUser(session.data.session.access_token);
  }
}
