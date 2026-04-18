import { backendUrl } from "./backend";
import type { CourseOutline } from "@/types/course-outline";

export async function fetchCourseOutline(init?: RequestInit): Promise<CourseOutline> {
    const response = await fetch(backendUrl("/api/course-outline"), {
       cache: "no-store",
       ...init,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch course outline: ${response.status}`);
    }

    return (await response.json()) as CourseOutline;

}