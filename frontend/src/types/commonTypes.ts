// src/types/commonTypes.ts

// Tương ứng với ApiResponse.java của bạn (nếu có)
export interface ApiResponse<T> {
  code?: number;
  message?: string;
  data: T; 
}

// Tương ứng với ErrorCode.java của bạn (nếu có)
export interface ErrorResponse {
  code: string; 
  message: string; 
}