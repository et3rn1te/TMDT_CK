import axios from 'axios';
import { API_BASE_URL } from '../config';

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  roles: string[];
}

export interface UserUpdateRequest {
  fullName: string;
  phone: string;
  address: string;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axios.get(`${API_BASE_URL}/users/profile`, getAuthHeader());
  return response.data.data;
};

export const updateUserProfile = async (data: UserUpdateRequest): Promise<UserProfile> => {
  const response = await axios.put(`${API_BASE_URL}/users`, data, getAuthHeader());
  return response.data.data;
}; 