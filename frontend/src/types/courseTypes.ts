import {SellerResponse} from './userTypes';
import {LessonSummaryResponse} from "./lessonTypes.ts";
import {CategoryResponse} from "./categoryTypes.ts";
import {LevelResponse} from "./levelTypes.ts";

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
    thumbnailUrl: string;
}

export interface CourseUpdateRequest {
    title: string;
    description: string;
    price: number;
    discountPrice: number | null;
    categoryId: number;
    levelId: number;
    thumbnailUrl: string;
}

export interface CourseStatusUpdateRequest {
    status: CourseStatus;
}

export interface CourseFilterRequest {
    keyword: string;
    categoryId: number;
    levelIds: number[];
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
    levelName: string;
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
    category: CategoryResponse;
    level: LevelResponse;
    seller: SellerResponse;
    status: string;
    lessons: LessonSummaryResponse[];
    thumbnailUrl: string;
    videoUrl: string;
}

export interface EnrolledCourse {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: string;
    instructorName: string;
    enrollmentDate: string;
    progress: number;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
