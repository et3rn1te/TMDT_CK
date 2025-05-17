package org.nlu.backend.dto.request.course;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseFilterRequest {
    String keyword; // Search by title or description
    Long categoryId; // Filter by category
    Long levelId; // Filter by level (Beginner, Intermediate, Advanced)
    String status; // Filter by status: DRAFT, PUBLISHED, ARCHIVED, etc.

    // Filter by price range
    BigDecimal minPrice;
    BigDecimal maxPrice;

    Long sellerId; // Filter by course owner (seller)
    String sortBy; // Sorting field (e.g., price, title, createdAt...)
    String sortDirection; // Sorting direction: asc / desc
}
