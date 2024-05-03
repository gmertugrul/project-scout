"use client";

import { DateTime } from "@/app/lib/controls";
import { type Post } from "@/app/db/schema";

export function Entry({ entry }: { entry: Post }) {
  return (
    <div className="flex flex-col pt-4">
      <span className="text-xs font-medium text-gray-500">
        <DateTime date={entry.createdAt} timeStyle="short" />
      </span>

      <div className="leading-6 space-y-1 text-sm mt-3">
        <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>
      </div>
    </div>
  );
}
