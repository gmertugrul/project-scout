import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound } from "next/navigation";
import { BuySell } from "@/app/(public)/players/components";

export default async function SellPlayer({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <>
      <div className="card">Hede</div>
    </>
  );
}
