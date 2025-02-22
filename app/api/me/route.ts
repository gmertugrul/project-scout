import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getSessionUser(cookies()));
}
