import { notFound } from "next/navigation";
import { PlayerEditor } from "./editor";
import { getPlayer } from "@/app/db/getters";
import { idSchema } from "@/app/lib/helpers";

export default async function PlayerAdmin({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <div>
      <PlayerEditor player={player} />
    </div>
  );
}
