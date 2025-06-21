package org.nlu.backend.dto.response.course;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.response.category.CategoryResponse;

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
    private String thumbnailUrl;
    private String levelName;
    private String sellerName;
    private String categoryName;
    private String status;
}
