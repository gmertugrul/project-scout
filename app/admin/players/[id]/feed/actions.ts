"use server";

import { getDb } from "@/app/db";
import { PostInsert, posts } from "@/app/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { idSchema } from "@/app/lib/helpers";

const createPostSchema = z.object({
  playerId: z.coerce.number().int().nonnegative(),
  content: z.string(),
});

export async function createPost(_: any, formData: FormData) {
  "use server";

  const fields = createPostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let postData: PostInsert = {
    playerId: fields.data.playerId,
    content: fields.data.content,
  };

  let db = await getDb();

  let post = await db.insert(posts).values(postData).returning();

  revalidatePath(`/admin/players/${fields.data.playerId}/feed`);

  return { post: post[0] };
}

const updatePostSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
  content: z.string(),
});

export async function updatePost(_: any, formData: FormData) {
  "use server";

  const fields = updatePostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let db = await getDb();

  let post = await db
    .update(posts)
    .set({ content: fields.data.content })
    .where(eq(posts.id, fields.data.id))
    .returning();

  if (post[0]) revalidatePath(`/admin/players/${post[0].playerId}/feed`);

  return { post: post[0] };
}

export async function deletePost(_: any, formData: FormData) {
  const fields = idSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let db = await getDb();

  let post = await db
    .delete(posts)
    .where(eq(posts.id, fields.data.id))
    .returning();

  if (post[0]) revalidatePath(`/admin/players/${post[0].playerId}/feed`);

  return { success: true };
}
