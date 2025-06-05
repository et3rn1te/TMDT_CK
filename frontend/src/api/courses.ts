import {
    CourseCreationRequest,
    CourseResponse,
    CourseSummaryResponse,
    CourseUpdateRequest
} from '../types/courseTypes.ts'; // Import các interface/type cần thiết
import {ApiResponse} from '../types/commonTypes.ts'; // Import ApiResponse type
import {API_BASE_URL} from '../config';

// Hàm helper để xử lý phản hồi API chung
async function handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
}

// Hàm helper để thêm Authorization header
function getAuthHeaders() {
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const authData = localStorage.getItem('auth');
    if (authData) {
        try {
            const {token} = JSON.parse(authData);
            if (token) {
                return {
                    ...defaultHeaders,
                    'Authorization': `Bearer ${token}`,
                };
            }
        } catch (e) {
            console.error("Error parsing auth data from localStorage", e);
            localStorage.removeItem('auth');
        }
    }
    return defaultHeaders;
}

export const courseApi = {
    // Lấy tất cả khóa học (thường dành cho Admin hoặc trang duyệt công khai)
    getAllCourses: async (): Promise<CourseSummaryResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/courses`);
        const apiResponse = await handleApiResponse<ApiResponse<CourseSummaryResponse[]>>(response);
        return apiResponse.data || [];
    },

    // Tạo khóa học mới
    createCourse: async (courseData: CourseCreationRequest): Promise<CourseResponse> => {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(courseData),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseResponse>>(response);
        return apiResponse.data;
    },

    // Cập nhật khóa học
    updateCourse: async (id: number, courseData: CourseUpdateRequest): Promise<CourseResponse> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(courseData),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseResponse>>(response);
        return apiResponse.data;
    },

    // Lấy chi tiết khóa học theo ID
    getCourseById: async (id: number): Promise<CourseResponse> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            headers: getAuthHeaders(),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseResponse>>(response);
        return apiResponse.data;
    },

    // Lấy danh sách khóa học của người bán hiện tại
    getMyCourses: async (): Promise<CourseSummaryResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/courses/my-courses`, {
            headers: getAuthHeaders(),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseSummaryResponse[]>>(response);
        return apiResponse.data || [];
    },

    // Xóa khóa học
    deleteCourse: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        await handleApiResponse<ApiResponse<void>>(response);
    },
};
