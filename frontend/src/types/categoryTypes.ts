// REQUEST
export interface CategoryCreationRequest {
    name: string;
    description: string;
}

// RESPONSE
export interface CategoryResponse {
    id: number;
    name: string;
    description: string;
}