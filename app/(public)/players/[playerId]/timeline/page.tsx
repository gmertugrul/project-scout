import { DateTime } from "@/app/lib/controls";
import { getGQL } from "@/app/lib/gql";
import { TimelineEntryFragment } from "@/app/lib/gql-sdk";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { PlayerHeader } from "../../player-header";
import { Entry } from "./entry";

export default async function PlayerOverall({
  params: { playerId },
}: {
  params: { playerId: string };
}) {
  const sdk = getGQL();

  const timeline = await sdk.playerTimeline({ id: playerId });

  if (!timeline.player?.data?.attributes?.timeline) {
    return notFound();
  }

  const entries = timeline.player.data.attributes?.timeline;

  return (
    <div className="card m-4">
      <PlayerHeader player={timeline.player.data} />

      <div className="space-y-4 divide-y divide-gray-200">
        {entries.map((e) => (
          <Entry entry={e!} key={e?.id} />
        ))}
      </div>
    </div>
  );
}
