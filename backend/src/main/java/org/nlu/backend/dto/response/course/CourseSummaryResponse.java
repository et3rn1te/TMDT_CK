package org.nlu.backend.dto.response.course;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a list of courses
public class CourseSummaryResponse {
    private Long id;
    private String title;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Long categoryId;
    private String thumbnailUrl; // Keep empty for now
    private String sellerName;
    private String categoryName;
    private String status;
}
