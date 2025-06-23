import {
    CourseSummaryResponse,
    CourseResponse,
    CourseCreationRequest,
    CourseUpdateRequest,
    CourseStatusUpdateRequest,
    CourseFilterRequest,
    EnrolledCourse
} from '../types/courseTypes.ts'; // Tạo các interface/type này nếu chưa có
import { EnrolledCourse } from '../types/courseTypes';
import {ApiResponse} from "../types/commonTypes.ts";
import {API_BASE_URL} from '../config';
import axios from 'axios';

// Hàm helper để xử lý phản hồi API
async function handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
}

// Hàm helper để thêm Authorization header (tùy chọn)
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
    // Lấy tất cả khóa học
    getAllCourses: async (): Promise<CourseSummaryResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/courses`);
        const apiResponse = await handleApiResponse<ApiResponse<CourseSummaryResponse[]>>(response)
        return apiResponse.data;
    },

    // Lấy chi tiết khóa học theo ID
    getCourseById: async (id: number): Promise<CourseResponse> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`);
        const apiResponse = await handleApiResponse<ApiResponse<CourseResponse>>(response)
        return apiResponse.data;
    },

    // Tạo khóa học mới (yêu cầu xác thực và quyền)
    createCourse: async (courseData: CourseCreationRequest): Promise<CourseResponse> => {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: getAuthHeaders(), // Thêm auth header
            body: JSON.stringify(courseData),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseResponse>>(response)
        return apiResponse.data;
    },

    // Cập nhật khóa học (yêu cầu xác thực và quyền)
    updateCourse: async (id: number, courseData: CourseUpdateRequest): Promise<CourseResponse> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(courseData),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseResponse>>(response)
        return apiResponse.data;
    },

    // Cập nhật trạng thái khóa học (yêu cầu xác thực và quyền)
    updateCourseStatus: async (id: number, statusData: CourseStatusUpdateRequest): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(statusData),
        });
        await handleApiResponse<void>(response);
    },

    // Xóa khóa học (yêu cầu xác thực và quyền)
    deleteCourse: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        await handleApiResponse<void>(response);
    },

    // Lọc khóa học
    filterCourses: async (filter: CourseFilterRequest): Promise<CourseSummaryResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/courses/filter`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(filter),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseSummaryResponse[]>>(response)
        return apiResponse.data;
    },

    // Lấy khóa học của người bán hiện tại
    getMyCourses: async (): Promise<CourseSummaryResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/courses/my-courses`, {
            headers: getAuthHeaders(),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CourseSummaryResponse[]>>(response)
        return apiResponse.data;
    },

    // Phê duyệt khóa học (chỉ ADMIN)
    approveCourse: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}/approve`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
        });
        await handleApiResponse<void>(response);
    },

    // Từ chối khóa học (chỉ ADMIN)
    rejectCourse: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/courses/${id}/reject`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
        });
        await handleApiResponse<void>(response);
    },

    // Tìm kiếm khóa học theo từ khóa
    searchCourses: async (keyword: string = ''): Promise<CourseSummaryResponse[]> => {
        const params = new URLSearchParams();
        if (keyword) {
            params.append('keyword', keyword);
        }
        const queryString = params.toString();
        const url = `${API_BASE_URL}/courses/search${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        const apiResponse = await handleApiResponse<ApiResponse<CourseSummaryResponse[]>>(response);
        return apiResponse.data;
    },

    getEnrolledCourses: async () => {
        const response = await fetch(`${API_BASE_URL}/enrollments/enrolled-courses`, {
            headers: getAuthHeaders(),
        });
        const apiResponse = await handleApiResponse<ApiResponse<EnrolledCourse[]>>(response);
        return apiResponse;
    },
    
    // Kiểm tra trạng thái thanh toán khóa học
    checkPaymentStatus: async (courseId: number, userId: number): Promise<boolean> => {
        const response = await fetch(`${API_BASE_URL}/payment/check-status/${courseId}?userId=${userId}`);
        const apiResponse = await handleApiResponse<ApiResponse<boolean>>(response);
        return apiResponse.data;
    },
};