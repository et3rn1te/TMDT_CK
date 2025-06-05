import {LevelResponse, LevelCreationRequest} from '../types/levelTypes.ts'; // Tạo các interface/type này nếu chưa có
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

export const levelApi = {
    // Tạo level mới
    createLevel: async (levelData: LevelCreationRequest): Promise<LevelResponse> => {
        const response = await fetch(`${API_BASE_URL}/levels`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(levelData),
        });
        const apiResponse = await handleApiResponse<ApiResponse<LevelResponse>>(response);
        return apiResponse.data;
    },

    // Lấy tất cả levels
    getAllLevels: async (): Promise<LevelResponse[]> => {
        const response = await fetch(`${API_BASE_URL}/levels`);
        const apiResponse = await handleApiResponse<ApiResponse<LevelResponse[]>>(response);
        return apiResponse.data;
    },

    // Lấy level theo ID
    getLevelById: async (levelId: number): Promise<LevelResponse> => {
        const response = await fetch(`${API_BASE_URL}/levels/${levelId}`);
        const apiResponse = await handleApiResponse<ApiResponse<LevelResponse>>(response);
        return apiResponse.data;
    },

    // Xóa level
    deleteLevel: async (levelId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/levels/${levelId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        await handleApiResponse<ApiResponse<void>>(response);
    },
};