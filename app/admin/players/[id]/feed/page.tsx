import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound } from "next/navigation";
import { getDb } from "@/app/db";
import { posts } from "@/app/db/schema";
import { desc, eq } from "drizzle-orm";
import { CreatePost } from "@/app/admin/players/[id]/feed/create";
import { PostDetail } from "@/app/admin/players/[id]/feed/post";

export default async function Newsfeed({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  const db = await getDb();

  const postList = await db.query.posts.findMany({
    where: eq(posts.playerId, player.id),
    orderBy: [desc(posts.createdAt)],
  });

  return (
    <div className="flex flex-col gap-4">
      <CreatePost player={player} />

      {postList.map((p) => (
        <PostDetail post={p} key={p.id} />
      ))}
    </div>
  );
}
