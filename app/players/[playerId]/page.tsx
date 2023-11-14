import { NavLink } from "@/app/lib/controls";
import { PlayerHeader } from "../player-header";

export default async function Player({
  params: { playerId },
}: {
  params: { playerId: string };
}) {
  return (
    <div className="card m-4">
      <PlayerHeader />
    </div>
  );
}
