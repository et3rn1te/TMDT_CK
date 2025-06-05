import {CategoryResponse, CategoryCreationRequest} from '../types/categoryTypes.ts'; // Tạo các interface/type này nếu chưa có
import {ApiResponse} from '../types/commonTypes.ts'; // Import ApiResponse type
import {API_BASE_URL} from '../config';

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

export const categoryApi = {
    // Tạo danh mục mới
    createCategory: async (categoryData: CategoryCreationRequest): Promise<CategoryResponse> => {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(categoryData),
        });
        const apiResponse = await handleApiResponse<ApiResponse<CategoryResponse>>(response);
        return apiResponse.data;
    },

    // Lấy tất cả danh mục
    getAllCategories: async (): Promise<CategoryResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const apiResponse = await handleApiResponse<ApiResponse<CategoryResponse[]>>(response);
        return apiResponse.data;
    },

    // Lấy danh mục theo ID
    getCategoryById: async (categoryId: number): Promise<CategoryResponse> => {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
        const apiResponse = await handleApiResponse<ApiResponse<CategoryResponse>>(response);
        return apiResponse.data;
    },

    // Xóa danh mục
    deleteCategory: async (categoryId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        await handleApiResponse<ApiResponse<void>>(response);
    },
};