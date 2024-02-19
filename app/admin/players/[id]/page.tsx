import { notFound } from "next/navigation";
import { PlayerEditor } from "./editor";
import { getPlayer } from "@/app/db/getters";
import { idSchema } from "@/app/lib/helpers";

export default async function PlayerAdmin({ params }: { params: any }) {
  const fields = idSchema.safeParse(params);

  if (!fields.success) {
    return notFound();
  }

  const player = await getPlayer(fields.data.id);

  if (!player) {
    return notFound();
  }

  return (
    <div>
      <PlayerEditor player={player} />
    </div>
  );
}
