"use server";

import { getDb } from "@/app/db";
import { TeamInsert, teams } from "@/app/db/schema";
import { countryCodes } from "@/app/lib/countries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTeamSchema = z.object({
  name: z.string().min(1).max(256),
});

export async function createTeam(_: any, formData: FormData) {
  "use server";

  const fields = createTeamSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let teamData: TeamInsert = {
    name: fields.data.name,
  };

  let db = await getDb();
  let team = await db.insert(teams).values(teamData).returning();

  return { team: team[0] };
}

const updateTeamSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
  name: z.string().min(1).max(256),
  abbreviation: z.string().min(1).max(10).optional(),
  countryCode: z.enum(countryCodes).optional(),
});

export async function updateTeam(_: any, formData: FormData) {
  "use server";

  const fields = updateTeamSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let teamData: TeamInsert = {
    name: fields.data.name,
    abbreviation: fields.data.abbreviation,
    countryCode: fields.data.countryCode,
  };

  let db = await getDb();

  let team = await db
    .update(teams)
    .set(teamData)
    .where(eq(teams.id, fields.data.id))
    .returning();

  revalidatePath(`/admin/teams`);

  return { team: team[0] };
}
