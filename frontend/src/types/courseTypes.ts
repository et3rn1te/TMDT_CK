import { SellerResponse } from './userTypes';

export enum CourseStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
    PENDING_APPROVAL = 'PENDING_APPROVAL',
    REJECTED = 'REJECTED',
}

// REQUEST

export interface CourseCreationRequest {
    title: string;
    description: string;
    price: number;
    discountPrice: number | null;
    categoryId: number;
    levelId: number;
    sellerId: number;
}

export interface CourseUpdateRequest{
    title: string;
    description: string;
    price: number;
    discountPrice: number | null;
    categoryId: number;
    levelId: number;
    sellerId: number;
}

export interface CourseStatusUpdateRequest {
    status: CourseStatus;
}

export interface CourseFilterRequest{
    keyword: string;
    categoryId: number;
    levelId: number;
    minPrice: number;
    maxPrice: number;
    sellerId: number;
    sortBy: string;
    sortDirection: string;
}

// RESPONSE

export interface CourseSummaryResponse {
    id: number;
    title: string;
    price: number;
    discountPrice: number | null;
    thumbnailUrl: string;
    sellerName: string;
    categoryName: string;
    status: string;
}

export interface CourseResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPrice: number | null;
    categoryName: string;
    levelName: string;
    seller: SellerResponse;
    status: string;
    lessons: LessonSummaryResponse[];
}

export interface LessonSummaryResponse {
    id: number;
    title: string;
    order: number;
}