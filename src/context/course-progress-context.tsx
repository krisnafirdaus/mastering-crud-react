'use client';

import { createContext, useContext, useMemo } from "react";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { CourseTopic } from "@/types/course-outline";

type CourseProgressContextValue = {
  activeTopicId: string;
  completedTopicIds: string[];
  notes: string;
  progress: number;
  setActiveTopicId: (topicId: string) => void;
  toggleCompletedTopic: (topicId: string) => void;
  setNotes: (notes: string) => void;
  resetProgress: () => void;
};

const CourseProgressContext = createContext<CourseProgressContextValue | null>(
  null,
);

type CourseProgressProviderProps = {
  topics: CourseTopic[];
  children: React.ReactNode;
};

export function CourseProgressProvider({
  topics,
  children,
}: CourseProgressProviderProps) {
  const firstTopicId = topics[0]?.id ?? "";
  const [activeTopicId, setActiveTopicId] = useLocalStorageState(
    "react-lab-active-topic",
    firstTopicId,
  );
  const [completedTopicIds, setCompletedTopicIds] = useLocalStorageState<string[]>(
    "react-lab-completed-topics",
    [],
  );
  const [notes, setNotes] = useLocalStorageState("react-lab-notes", "");
  const effectiveActiveTopicId = activeTopicId || firstTopicId;

  const progress = useMemo(() => {
    if (!topics.length) {
      return 0;
    }

    return Math.round((completedTopicIds.length / topics.length) * 100);
  }, [completedTopicIds.length, topics.length]);

  const value = useMemo<CourseProgressContextValue>(
    () => ({
      activeTopicId: effectiveActiveTopicId,
      completedTopicIds,
      notes,
      progress,
      setActiveTopicId,
      toggleCompletedTopic(topicId: string) {
        setCompletedTopicIds((current) =>
          current.includes(topicId)
            ? current.filter((value) => value !== topicId)
            : [...current, topicId],
        );
      },
      setNotes,
      resetProgress() {
        setCompletedTopicIds([]);
        setNotes("");
        setActiveTopicId(firstTopicId);
      },
    }),
    [completedTopicIds, effectiveActiveTopicId, firstTopicId, notes, progress, setActiveTopicId, setCompletedTopicIds, setNotes],
  );

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);

  if (!context) {
    throw new Error("useCourseProgress must be used inside CourseProgressProvider.");
  }

  return context;
}