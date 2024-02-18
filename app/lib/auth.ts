import { User, users } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { NotLoggedInError } from "@/app/lib/errors";
import { cache } from "react";

export const getUser = cache(getUserImpl);

async function getUserImpl(): Promise<User | undefined> {
  const db = await getDb();

  return db.query.users.findFirst({
    orderBy: [users.id],
  });
}

export async function requireUser(): Promise<User> {
  const user = await getUser();

  if (!user) {
    throw new NotLoggedInError();
  }

  return user;
}
