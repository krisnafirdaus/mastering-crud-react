"use client"

import { useEffect, useState } from "react";
import { fetchCourseOutline } from "@/lib/fetch-course-outline" 
import type { CourseOutline } from "@/types/course-outline";

type OutlineState =
  | { status: "loading"; outline: null; error: null }
  | { status: "ready"; outline: CourseOutline; error: null }
  | { status: "error"; outline: null; error: string };

export function useCourseOutline() {
    const [state, setState] = useState<OutlineState>({ status: "loading", outline: null, error: null });

    useEffect(() => {
        const controller = new AbortController();

        async function loadOutline() {
            try {
                const outline = await fetchCourseOutline({ signal: controller.signal });
                setState({ status: "ready", outline, error: null });
            } catch (error) {
                if(controller.signal.aborted){
                    return;
                }

                setState({ status: "error", outline: null, error: (error as Error).message });
            }
        }

        void loadOutline();

        return () => controller.abort();
    }, []);

    return state;

}