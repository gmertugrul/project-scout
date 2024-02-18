"use server";

import { idSchema } from "@/app/lib/helpers";
import { getUser } from "@/app/lib/auth";
import { getDb } from "@/app/db";
import { starredPlayers } from "@/app/db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleStar(formData: FormData) {
  const fields = idSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const user = await getUser();

  if (!user) {
    return { error: "You are not authenticated" };
  }

  const db = await getDb();

  const current = await db.query.starredPlayers.findFirst({
    where: sql`${starredPlayers.userId} = ${user.id} and ${starredPlayers.playerId} = ${fields.data.id}`,
  });

  if (current)
    await db
      .delete(starredPlayers)
      .where(
        sql`${starredPlayers.userId} = ${user.id} and ${starredPlayers.playerId} = ${fields.data.id}`,
      );
  else
    await db
      .insert(starredPlayers)
      .values({ playerId: fields.data.id, userId: user.id });

  revalidatePath("/");

  return { starred: !current };
}
