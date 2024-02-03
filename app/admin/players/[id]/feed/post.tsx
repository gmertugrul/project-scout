"use client";

import { type Post } from "@/app/db/schema";
import { deletePost, updatePost } from "@/app/admin/players/[id]/feed/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { RichTextEditor } from "@/app/components/rteditor";

export function PostDetail({ post }: { post: Post }) {
  const [editing, setEditing] = useState<string | null>(null);

  const [, deleteAction] = useFormState(deletePost, null);
  const [state, updateAction] = useFormState(updatePost, null);

  useEffect(() => {
    if (state) setEditing(null);
  }, [state]);

  return (
    <div className="card">
      <div className="flex items-center mb-2">
        <span className="text-muted text-sm">
          {post.createdAt.toLocaleString()}
        </span>

        <form className="ml-auto flex items-center gap-2">
          <input type="hidden" name="id" value={post.id} />
          {editing !== null ? (
            <>
              <input type="hidden" name="content" value={editing} />
              <button formAction={updateAction} className="btn-text">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="btn-text"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(post.content)}
              className="btn-text"
            >
              Edit
            </button>
          )}
          <button formAction={deleteAction} className="btn-text">
            Delete
          </button>
        </form>
      </div>
      {editing !== null ? (
        <RichTextEditor defaultValue={editing} onChange={setEditing} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      )}
    </div>
  );
}
