export interface SellerResponse {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
}

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  phone: string | null; 
  address: string | null;
}
