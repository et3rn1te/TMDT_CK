package org.nlu.backend.dto.request.course;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseCreationRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;

    private Long categoryId; // category's id of the course
    private Long levelId; // level's id of the course
    private Long sellerId; // seller's id of the course

    private String thumbnailUrl;
}
