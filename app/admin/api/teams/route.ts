import { getDb } from "@/app/db";
import { teams } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  var db = await getDb();

  var teamList = await db.query.teams.findMany({
    orderBy: [teams.name],
  });

  return NextResponse.json(teamList);
}
