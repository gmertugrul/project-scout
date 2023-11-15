import { DateTime } from "@/app/lib/controls";
import { getGQL } from "@/app/lib/gql";
import { TimelineEntryFragment } from "@/app/lib/gql-sdk";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import { PlayerHeader } from "../../player-header";

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

async function Entry({ entry }: { entry: TimelineEntryFragment }) {
  const processedContent = await remark()
    .use(html)
    .process(entry.text ?? "");

  const contentHtml = processedContent.toString();

  return (
    <div className="flex flex-col pt-4">
      <span className="text-xs font-medium text-gray-500">
        <DateTime date={entry.posted_on} timeStyle="short" />
      </span>

      <div
        className="leading-6 text-sm mt-3 markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      ></div>
    </div>
  );
}
