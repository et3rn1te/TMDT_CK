// REQUEST
export interface LessonCreationRequest {
    title: string;
    description: string;
    videoUrl: string;
    fileUrl: string;
    order: number | null;
    courseId: number;
    isPreview: boolean;
}

export interface LessonUpdateRequest {
    title: string;
    description: string;
    videoUrl: string;
    fileUrl: string;
    order: number | null;
    isPreview: boolean;
}

// RESPONSE
export interface LessonSummaryResponse {
    id: number;
    title: string;
    order: number;
    isPreview: boolean;
}

export interface LessonResponse {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    fileUrl: string;
    order: number;
    courseId: number;
    isPreview: boolean;
    createdAt: string;
    updatedAt: string;
}