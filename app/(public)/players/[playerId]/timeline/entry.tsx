"use client";

import { DateTime } from "@/app/lib/controls";
import { TimelineEntryFragment } from "@/app/lib/gql-sdk";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function Entry({ entry }: { entry: TimelineEntryFragment }) {
  return (
    <div className="flex flex-col pt-4">
      <span className="text-xs font-medium text-gray-500">
        <DateTime date={entry.posted_on} timeStyle="short" />
      </span>

      <div className="leading-6 space-y-1 text-sm mt-3">
        <BlocksRenderer
          blocks={{
            paragraph: ({ children }) => <p>{children}</p>,
            image: ({ image }) => (
              <img
                className="w-full md:w-auto max-w-full"
                src={image.url}
                alt={image.alternativeText ?? "Image"}
              />
            ),
          }}
          content={entry.content || []}
        />
      </div>
    </div>
  );
}
