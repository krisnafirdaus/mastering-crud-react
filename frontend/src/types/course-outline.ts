export type CourseTopic = {
    id: string;
    title: string;
    summary: string;
    focus: string;
}

export type CourseOutline = {
   title: string;
   subtitle: string;
   description: string;
   endpoint: string;
   studyLoop: string[];
   topics: CourseTopic[];
   checkpoints: string[];
}

export type LabNote = {
    id: number;
    topic_id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
}