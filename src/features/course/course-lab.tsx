'use client';

import Link from "next/link";
import { useState } from "react";
import { CourseProgressProvider, useCourseProgress } from "@/context/course-progress-context";
import { useCourseOutline } from "@/hooks/use-course-outline";
import { useLabNotes } from "@/hooks/use-lab-notes";

function LoadingState() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-12">
      <div className="rounded-[2rem] border border-white/60 bg-white/75 px-8 py-10 text-center shadow-[0_24px_60px_rgba(21,19,18,0.08)] backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-teal-700">
          Loading from Laravel
        </p>
        <p className="mt-3 text-lg text-stone-700">Preparing the React lab interface.</p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-12">
      <div className="max-w-xl rounded-[2rem] border border-rose-200 bg-rose-50 px-8 py-10 text-center shadow-[0_24px_60px_rgba(21,19,18,0.08)]">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-rose-700">
          Backend unavailable
        </p>
        <p className="mt-3 text-lg text-rose-900">{message}</p>
      </div>
    </div>
  );
}

function CourseDashboard({
  outline,
}: {
  outline: NonNullable<ReturnType<typeof useCourseOutline>["outline"]>;
}) {
  const {
    activeTopicId,
    completedTopicIds,
    notes,
    progress,
    setActiveTopicId,
    toggleCompletedTopic,
    setNotes,
    resetProgress,
  } = useCourseProgress();
  const { notes: backendNotes, status: notesStatus, error: notesError, saveNote, deleteNote } =
    useLabNotes(activeTopicId);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const activeTopic = outline.topics.find((topic) => topic.id === activeTopicId) ?? outline.topics[0];

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_30px_80px_rgba(21,19,18,0.12)] backdrop-blur-xl">
        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
              Live outline from {outline.endpoint}
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
                Next.js x Laravel lab
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
                {outline.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
                {outline.subtitle}. {outline.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-medium text-stone-700">
              <span className="rounded-full bg-stone-100 px-4 py-2">Progress {progress}%</span>
              <span className="rounded-full bg-stone-100 px-4 py-2">Completed {completedTopicIds.length}/{outline.topics.length}</span>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-full bg-stone-950 px-4 py-2 text-white transition hover:bg-stone-800"
              >
                Reset lab
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {outline.studyLoop.map((step, index) => (
                <div key={step} className="rounded-3xl border border-stone-200 bg-white px-4 py-5 shadow-sm">
                  <p className="text-sm font-semibold text-teal-700">Step {index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-stone-200 bg-stone-950 p-6 text-stone-50 shadow-[0_24px_50px_rgba(21,19,18,0.18)]">
            <p className="text-sm uppercase tracking-[0.24em] text-stone-400">Active topic</p>
            <h2 className="mt-3 text-2xl font-semibold">{activeTopic.title}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-300">{activeTopic.summary}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Focus</p>
              <p className="mt-2 text-sm leading-6 text-stone-100">{activeTopic.focus}</p>
            </div>
            <p className="mt-6 text-sm leading-6 text-stone-300">
              Use the checklist below to mark what you have practiced and keep your notes in one place.
            </p>
          </aside>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_60px_rgba(21,19,18,0.08)] backdrop-blur-xl md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Context checklist
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-stone-950">Practice the shared state flow</h3>
            </div>
            <div className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
              {progress}% complete
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {outline.topics.map((topic) => {
              const isActive = topic.id === activeTopicId;
              const isCompleted = completedTopicIds.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  className={`rounded-3xl border px-5 py-4 transition ${
                    isActive
                      ? "border-teal-500 bg-teal-50"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTopicId(topic.id)}
                      className="flex-1 text-left"
                    >
                      <p className="text-lg font-semibold text-stone-950">{topic.title}</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{topic.summary}</p>
                    </button>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isCompleted ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-600"}`}>
                      {isCompleted ? "Done" : "Open"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleCompletedTopic(topic.id)}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 transition hover:border-stone-300"
                    >
                      {isCompleted ? "Mark as in progress" : "Mark as done"}
                    </button>
                    <Link
                      href={`/topics/${topic.id}`}
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 transition hover:text-teal-800"
                    >
                      Open detail
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_60px_rgba(21,19,18,0.08)] backdrop-blur-xl md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              Custom hook notes
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-stone-950">Persist your reflections</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              The note field below is backed by a reusable local storage hook, so your thoughts survive refreshes.
            </p>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Write your own pattern notes here..."
              className="mt-6 min-h-36 w-full rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-teal-500 focus:bg-white"
            />

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
              Stored locally via custom hook
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_60px_rgba(21,19,18,0.08)] backdrop-blur-xl md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Laravel CRUD integration
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-stone-950">
              Save remote note for {activeTopic.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              This form posts to Laravel and reloads notes for the active topic.
            </p>

            <form
              key={activeTopicId}
              className="mt-5 space-y-3"
              onSubmit={async (event) => {
                event.preventDefault();

                if (!formTitle.trim() || !formBody.trim()) {
                  setRequestError("Title and note body are required.");
                  return;
                }

                setRequestError(null);

                try {
                  await saveNote({
                    id: editingId ?? undefined,
                    title: formTitle.trim(),
                    body: formBody.trim(),
                  });
                  setEditingId(null);
                  setFormTitle("");
                  setFormBody("");
                } catch (error) {
                  setRequestError(
                    error instanceof Error ? error.message : "Unable to save note.",
                  );
                }
              }}
            >
              <input
                value={formTitle}
                onChange={(event) => setFormTitle(event.target.value)}
                placeholder="Short note title"
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-teal-500"
              />
              <textarea
                value={formBody}
                onChange={(event) => setFormBody(event.target.value)}
                placeholder="What did you learn from this topic?"
                className="min-h-28 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-teal-500"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  {editingId ? "Update note" : "Create note"}
                </button>
                {editingId ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormTitle("");
                      setFormBody("");
                    }}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </form>

            {requestError ? (
              <p className="mt-3 text-sm text-rose-700">{requestError}</p>
            ) : null}

            {notesError ? (
              <p className="mt-3 text-sm text-rose-700">{notesError}</p>
            ) : null}

            <div className="mt-5 space-y-3">
              {notesStatus === "loading" ? (
                <p className="text-sm text-stone-600">Loading topic notes...</p>
              ) : null}

              {notesStatus === "ready" && backendNotes.length === 0 ? (
                <p className="text-sm text-stone-600">No saved notes for this topic yet.</p>
              ) : null}

              {backendNotes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-2xl border border-stone-200 bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-950">{note.title}</h4>
                      <p className="mt-1 text-xs text-stone-500">
                        Updated {new Date(note.updated_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(note.id);
                          setFormTitle(note.title);
                          setFormBody(note.body);
                          setRequestError(null);
                        }}
                        className="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-700 transition hover:border-stone-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await deleteNote(note.id);

                            if (editingId === note.id) {
                              setEditingId(null);
                              setFormTitle("");
                              setFormBody("");
                            }
                          } catch (error) {
                            setRequestError(
                              error instanceof Error
                                ? error.message
                                : "Unable to delete note.",
                            );
                          }
                        }}
                        className="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium text-rose-700 transition hover:border-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{note.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function CourseLab() {
  const state = useCourseOutline();

  if (state.status === "loading") {
    return <LoadingState />;
  }

  if (state.status === "error") {
    return <ErrorState message={state.error} />;
  }

  return (
    <CourseProgressProvider topics={state.outline.topics}>
      <CourseDashboard outline={state.outline} />
    </CourseProgressProvider>
  );
}