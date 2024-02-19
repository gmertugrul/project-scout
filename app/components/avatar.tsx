"use client";

import { useEffect, useRef } from "react";

const trans =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export function Avatar(props: {
  src?: string;
  className?: string;
  name?: string | null;
  isRectangle?: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;

    const onerror = () => {
      img.onerror = null;

      if (props.name != null) {
        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name)}`;
      } else {
        img.src = trans;
      }
    };

    img.onerror = onerror;

    img.onload = () => {
      img.onload = null;
      img.classList.remove("bg-gray-200");
    };

    if (props.src) img.src = props.src;
    else onerror();
  }, [props.name, props.src]);

  return (
    <div
      className={`relative bg-gray-200 ${props.isRectangle ? "rounded-xl" : "rounded-full"} overflow-hidden`}
    >
      <img
        ref={imgRef}
        className={`relative bg-gray-200 ${props.className} z-10`}
        src={trans}
        alt={props.name ?? "Avatar"}
      />
    </div>
  );
}
