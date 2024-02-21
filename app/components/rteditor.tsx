"use client";

import { useEffect, useRef } from "react";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

export function RichTextEditor({
  defaultValue,
  onChange,
}: {
  defaultValue?: string;
  onChange?: (html: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const quill = useRef<any>();

  useEffect(() => {
    const load = async () => {
      const Quill = (await import("quill")).default;

      if (quill.current) return;

      const q = (quill.current = new Quill(ref.current!, {
        placeholder: "Enter text...",
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link", "image", "video"],
            [{ color: [] }, { background: [] }],
            ["clean"],
          ],
          clipboard: {
            matchVisual: false,
          },
        },
      }));

      q.root.innerHTML = defaultValue ?? "";

      q.on("text-change", function () {
        onChange?.(q.root.innerHTML);
      });

      ref.current!.classList.remove("hidden");
    };

    load();
  }, []);

  return (
    <div className="bg-white">
      <div ref={ref} className="hidden"></div>
    </div>
  );
}
