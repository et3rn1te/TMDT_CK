import axios from 'axios';
import { CourseReview } from '../types/courseTypes';
import { API_BASE_URL } from '../config';

const API_URL = API_BASE_URL;

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

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
export const reviewsApi = {
  // Get all reviews
  getAllReviews: async (): Promise<CourseReview[]> => {
    try {
      const response = await axios.get<ApiResponse<CourseReview[]>>(`${API_URL}/reviews`, {headers: getAuthHeaders()});
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      throw error;
    }
  },

  // Get reviews by course ID
  getReviewsByCourse: async (courseId: number): Promise<CourseReview[]> => {
    try {
      const response = await axios.get<CourseReview[]>(`${API_URL}/reviews/course/${courseId}`,{headers: getAuthHeaders()});
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for course ${courseId}:`, error);
      throw error;
    }
  },

  // Get average rating for a course
  getAverageRating: async (courseId: number): Promise<number> => {
    try {
      const response = await axios.get<number>(`${API_URL}/reviews/course/${courseId}/average`,{headers: getAuthHeaders()});
      return response.data;
    } catch (error) {
      console.error(`Error fetching average rating for course ${courseId}:`, error);
      throw error;
    }
  },

  // Create or update a review
  submitReview: async (reviewData: {
    courseId: number;
    userId: number;
    rating: number;
    comment: string;
  }): Promise<CourseReview> => {
    try {
      const response = await axios.post<ApiResponse<CourseReview>>(`${API_URL}/reviews`, reviewData, {headers: getAuthHeaders()});
      return response.data.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }
}; 