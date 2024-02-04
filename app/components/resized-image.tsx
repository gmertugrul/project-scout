"use client";

import { ComponentProps } from "react";

type Props = ComponentProps<"img"> & {
  fit?: "crop" | "contain" | "scale-down" | "cover" | "pad";
};

export default function ResizedImage(props: Props) {
  if (props.src) {
    let u = new URL(props.src);

    if (u.hostname == process.env.NEXT_PUBLIC_BLOB_HOST) {
      let params = new URLSearchParams();

      if (props.width) params.set("width", props.width.toString());
      if (props.height) params.set("height", props.height.toString());
      if (props.fit) {
        params.set("fit", props.fit);
        params.set("gravity", "auto");
      }

      u.hostname = process.env.NEXT_PUBLIC_IMAGE_RESIZER ?? u.hostname;
      u.protocol = "https:";

      props.src = `${u.toString()}?${params.toString()}`;
    }
  }

  return <img {...props} />;
}
