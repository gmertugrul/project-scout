import { NextRequest, NextResponse } from "next/server";
import { signOutSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  await signOutSessionUser(cookies());

  revalidatePath("/");

  const home = request.nextUrl.clone();
  home.pathname = "/";

  return NextResponse.redirect(home);
}
