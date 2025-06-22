import axios from 'axios';
import { API_BASE_URL } from '../config';

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/verify-otp?email=${email}&otp=${otp}`);
  return response.data;
};

export const resetPassword = async (email: string, newPassword: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/new-password`, {
    email,
    newPassword
  });
  return response.data;
};

export interface LogoutRequest {
  token: string;
}

export const logout = async (token: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`, { token });
  return response.data;
}; 