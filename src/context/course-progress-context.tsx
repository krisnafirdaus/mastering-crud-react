"use client"

import { createContext, useContext, useMemo } from "react"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import type { CourseTopic } from "@/types/course-outline"

type CourseProgressContextValue = {
    activeTopicId: string;
    completeTopicIds: string[];
    notes: string;
    progress: number;
    setActiveTopicId: (id: string) => void;
    toggleCompleteTopicId: (id: string) => void;
    setNotes: (notes: string) => void;
    resetProgress: () => void;
}

const CourseProgressContext = createContext<CourseProgressContextValue | null>(null);

type CourseProgressProviderProps = {
    topics: CourseTopic[];
    children: React.ReactNode;
}

export function CourseProgressProvider({ topics, children }: CourseProgressProviderProps){
    const firstTopicId = topics[0]?.id ?? "";
    const [activeTopicId, setActiveTopicId] = useLocalStorageState<string>("react-lab-active-topic", firstTopicId);
    const [completeTopicIds, setCompleteTopicIds] = useLocalStorageState<string[]>("react-lab-completed-topics", []);
    const [notes, setNotes] = useLocalStorageState<string>("react-lab-notes", "");
    const effectiveActiveTopicId = activeTopicId || firstTopicId;

    const progress = useMemo(() => {
        if(!topics.length){
            return 0;
        }

        return Math.round((completeTopicIds.length / topics.length) * 100);
    }, [completeTopicIds.length, topics.length]);

    const value = useMemo<CourseProgressContextValue>(() => ({
        activeTopicId: effectiveActiveTopicId,
        completeTopicIds,
        notes,
        progress,
        setActiveTopicId,
        toggleCompleteTopicId: (topicId: string) => {
            setCompleteTopicIds(current =>
                current.includes(topicId)
                    ? current.filter(id => id !== topicId)
                    : [...current, topicId]
            );
        },
        setNotes,
        resetProgress: () => {
            setCompleteTopicIds([]);
            setNotes("");
            setActiveTopicId
        },
    }), [completeTopicIds, effectiveActiveTopicId, firstTopicId, notes, progress, setActiveTopicId, setCompleteTopicIds, setNotes]);

    return (
        <CourseProgressContext.Provider value={value}>
            {children}
        </CourseProgressContext.Provider>
    )
}

export function useCourseProgress(){
    const context = useContext(CourseProgressContext);

    if(!context){
        throw new Error("useCourseProgress must be used within a CourseProgressProvider");
    }

    return context;
}
    


