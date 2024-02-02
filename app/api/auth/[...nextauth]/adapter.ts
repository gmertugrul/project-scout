import { Adapter } from "next-auth/adapters";
import { db } from "@/app/db";
import { accounts, sessions, users, verificationTokens } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";

export function pgDrizzleAdapter(): Adapter {
  return {
    async createUser(data) {
      return await db
        .insert(users)
        .values({ ...data, id: crypto.randomUUID() })
        .returning()
        .then((res) => res[0] ?? null)
    },
    async getUser(data) {
      return await db
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0] ?? null)
    },
    async getUserByEmail(data) {
      return await db
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0] ?? null)
    },
    async createSession(data) {
      return await db
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0])
    },
    async getSessionAndUser(data) {
      return await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null)
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.")
      }

      return await db
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0])
    },
    async updateSession(data) {
      return await db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0])
    },
    async linkAccount(rawAccount) {
      return stripUndefined(
        await db
          .insert(accounts)
          .values(rawAccount)
          .returning()
          .then((res) => res[0])
      )
    },
    async getUserByAccount(account) {
      const dbAccount =
        (await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider)
            )
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null

      return dbAccount?.users ?? null
    },
    async deleteSession(sessionToken) {
      await db
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null)
    },
    async createVerificationToken(token) {
      return await db
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0])
    },
    async useVerificationToken(token) {
      try {
        return await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          )
          .returning()
          .then((res) => res[0] ?? null)
      } catch (err) {
        throw new Error("No verification token found.")
      }
    },
    async deleteUser(id) {
      await db
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => res[0] ?? null)
    },
    async unlinkAccount(account) {
      const { type, provider, providerAccountId, userId } = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .returning()
        .then((res) => res[0] ?? null)

      return { provider, type, providerAccountId, userId }
    },
  }
}

type NonNullableProps<T> = {
  [P in keyof T]: null extends T[P] ? never : P
}[keyof T]

export function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
  const result = {} as T
  for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key]
  return result
}
