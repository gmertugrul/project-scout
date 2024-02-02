import { notFound } from "next/navigation";
import TeamsAdmin from "../page";
import { EditTeam } from "../editor";
import { getTeam } from "@/app/db/getters";
import { idSchema } from "@/app/lib/helpers";

export default async function TeamAdmin({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const team = await getTeam(id);

  if (!team) {
    return notFound();
  }

  return (
    <div>
      <EditTeam team={team} />
      <TeamsAdmin />
    </div>
  );
}
