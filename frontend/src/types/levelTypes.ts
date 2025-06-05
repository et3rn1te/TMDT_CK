// REQUEST
export interface LevelCreationRequest {
    name: string;
    description: string;
}

// RESPONSE
export interface LevelResponse {
    id: number;
    name: string;
    description: string;
}