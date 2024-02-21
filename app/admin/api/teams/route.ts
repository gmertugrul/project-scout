import { getDb } from "@/app/db";
import { teams } from "@/app/db/schema";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const user = await getSessionUser(cookies());
  const db = await getDb();

  const teamList = await db.query.teams.findMany({
    orderBy: [teams.name],
  });

  return NextResponse.json(teamList);
}
