import axios from 'axios';
import { API_BASE_URL } from '../config';

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
export const getOrderByCourseAndUser = async (courseId: number, userId: number): Promise<any> => {
  const response = await axios.get(`${API_BASE_URL}/orders/check?courseId=${courseId}&userId=${userId}`, getAuthHeaders());
  return response.data.data;
};