'use client';

import { useCallback, useEffect, useState } from "react";
import { backendUrl } from "@/lib/backend";
import type { LabNote } from "@/types/course-outline";

type UseLabNotesResult = {
  notes: LabNote[];
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  saveNote: (input: { id?: number; title: string; body: string }) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
};

export function useLabNotes(topicId: string): UseLabNotesResult {
  const [notes, setNotes] = useState<LabNote[]>([]);
  const [status, setStatus] = useState<UseLabNotesResult["status"]>("idle");
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    if (!topicId) {
      setNotes([]);
      setStatus("ready");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(
        backendUrl(`/api/lab-notes?topic_id=${encodeURIComponent(topicId)}`),
      );

      if (!response.ok) {
        throw new Error(`Unable to load notes (${response.status}).`);
      }

      const payload = (await response.json()) as LabNote[];
      setNotes(payload);
      setStatus("ready");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load notes.",
      );
      setStatus("error");
    }
  }, [topicId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadNotes();
  }, [loadNotes]);

  const saveNote = useCallback<UseLabNotesResult["saveNote"]>(
    async ({ id, title, body }) => {
      const endpoint = id
        ? backendUrl(`/api/lab-notes/${id}`)
        : backendUrl("/api/lab-notes");

      const response = await fetch(endpoint, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          topic_id: topicId,
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error(`Unable to save note (${response.status}).`);
      }

      await loadNotes();
    },
    [loadNotes, topicId],
  );

  const deleteNote = useCallback<UseLabNotesResult["deleteNote"]>(
    async (id) => {
      const response = await fetch(backendUrl(`/api/lab-notes/${id}`), {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Unable to delete note (${response.status}).`);
      }

      await loadNotes();
    },
    [loadNotes],
  );

  return {
    notes,
    status,
    error,
    saveNote,
    deleteNote,
  };
}