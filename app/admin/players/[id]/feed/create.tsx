"use client";

import { Player } from "@/app/db/schema";
import { RichTextEditor } from "@/app/components/rteditor";
import { useState } from "react";
import { SubmitButton } from "@/app/components/forms.client";
import { useFormState } from "react-dom";
import { updatePlayerStats } from "@/app/admin/players/[id]/actions";
import { createPost } from "@/app/admin/players/[id]/feed/actions";

export function CreatePost({ player }: { player: Player }) {
  const [content, setContent] = useState("");
  const [state, formAction] = useFormState(createPost, null);

  return (
    <form className="card" action={formAction}>
      <input type="hidden" name="playerId" value={player.id} />
      <input type="hidden" name="content" value={content} />

      <div className="space-y-2">
        <h3 className="h3">Create new post</h3>

        <div>
          <RichTextEditor onChange={setContent} />
        </div>

        <div className="flex justify-end">
          <SubmitButton>Save Post</SubmitButton>
        </div>
      </div>
    </form>
  );
}
