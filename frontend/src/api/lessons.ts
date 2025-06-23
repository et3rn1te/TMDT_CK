import axios from 'axios';
import { 
    LessonCreationRequest, 
    LessonUpdateRequest, 
    LessonResponse,
    LessonSummaryResponse
} from '../types/lessonTypes';
import { ApiResponse } from '../types/commonTypes';

const API_URL = import.meta.env.VITE_API_URL;

// Hàm helper để thêm Authorization header
function getAuthHeaders() {
    const defaultHeaders: any = {
        'Content-Type': 'application/json',
    };
    const authData = localStorage.getItem('auth');
    if (authData) {
        try {
            const { token } = JSON.parse(authData);
            if (token) {
                return {
                    ...defaultHeaders,
                    'Authorization': `Bearer ${token}`,
                };
            }
        } catch (e) {
            console.error('Error parsing auth data from localStorage', e);
            localStorage.removeItem('auth');
        }
    }
    return defaultHeaders;
}

export const lessonApi = {
    // Get all lessons for a course
    getLessonsByCourseId: async (courseId: number): Promise<LessonSummaryResponse[]> => {
        const response = await axios.get<ApiResponse<LessonSummaryResponse[]>>(
            `${API_URL}/courses/${courseId}/lessons`,
            { headers: getAuthHeaders() }
        );
        return response.data.data || [];
    },

    // Get a specific lesson by ID
    getLessonById: async (courseId: number, lessonId: number): Promise<LessonResponse> => {
        const response = await axios.get<ApiResponse<LessonResponse>>(
            `${API_URL}/courses/${courseId}/lessons/${lessonId}`,
            { headers: getAuthHeaders() }
        );
        return response.data.data;
    },

    // Create a new lesson
    createLesson: async (courseId: number, lessonData: LessonCreationRequest): Promise<LessonResponse> => {
        const response = await axios.post<ApiResponse<LessonResponse>>(
            `${API_URL}/courses/${courseId}/lessons`,
            lessonData,
            { headers: getAuthHeaders() }
        );
        return response.data.data;
    },

    // Update an existing lesson
    updateLesson: async (courseId: number, lessonId: number, lessonData: LessonUpdateRequest): Promise<LessonResponse> => {
        const response = await axios.put<ApiResponse<LessonResponse>>(
            `${API_URL}/courses/${courseId}/lessons/${lessonId}`,
            lessonData,
            { headers: getAuthHeaders() }
        );
        return response.data.data;
    },

    // Delete a lesson
    deleteLesson: async (courseId: number, lessonId: number): Promise<void> => {
        await axios.delete(
            `${API_URL}/courses/${courseId}/lessons/${lessonId}`,
            { headers: getAuthHeaders() }
        );
    },

    // Reorder lessons
    reorderLessons: async (courseId: number, lessonIds: number[]): Promise<void> => {
        await axios.put(
            `${API_URL}/courses/${courseId}/lessons/reorder`,
            lessonIds,
            { headers: getAuthHeaders() }
        );
    }
}; 