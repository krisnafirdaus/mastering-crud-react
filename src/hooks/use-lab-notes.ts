"use client"

import { useEffect, useState, useCallback, use } from "react";
import { backendUrl } from "@/lib/backend" 
import type { LabNote } from "@/types/course-outline";

type UseLabNotesState = {
    notes: LabNote[];
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    saveNote: (input: { id?: number ; title: string; body: string }) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
}

export function useLabNotes(topicId: string): UseLabNotesState {
    const [notes, setNotes] = useState<LabNote[]>([]);
    const [status, setStatus] = useState<UseLabNotesState["status"]>("idle");
    const [error, setError] = useState<string | null>(null);

    const loadNotes = useCallback(async () => {
        if(!topicId){
            setNotes([]);
            setStatus("ready");
            return;
        }

        setStatus("loading");
        setError(null);

        try {
            const response = await fetch(backendUrl(`/api/notes?topicId=${encodeURIComponent(topicId)}`), {
                cache: "no-store",
            });

            if(!response.ok){
                throw new Error(`Unable to load notes (${response.status})`);
            }

            const payload = (await response.json()) as { notes: LabNote[] };
            setNotes(payload.notes);
            setStatus("ready");
        } catch (error) {
            setError((error as Error).message);
            setStatus("error");
        }
    }, [topicId]);

    useEffect(() => {
        void loadNotes();
    }, [loadNotes]);

    const saveNote = useCallback<UseLabNotesState["saveNote"]>(async ({ id, title, body }) => {
        const endpoint = id ? backendUrl(`/api/notes/${id}`) : backendUrl("/api/notes");

        const response = await fetch(endpoint, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ topic_id: topicId, title, body }),
        });

        if(!response.ok){
            throw new Error(`Unable to save note (${response.status})`);
        }

        await loadNotes();
    }, [loadNotes, topicId]);

    const deleteNote = useCallback<UseLabNotesState["deleteNote"]>(async (id) => {
            const response = await fetch(backendUrl(`/api/notes/${id}`), {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            });

            if(!response.ok){
                throw new Error(`Unable to delete note (${response.status})`);
            }
            
            await loadNotes(); 
        },
        [loadNotes]
    );

    return {
        notes,
        status,
        error,
        saveNote,
        deleteNote,
    };
}