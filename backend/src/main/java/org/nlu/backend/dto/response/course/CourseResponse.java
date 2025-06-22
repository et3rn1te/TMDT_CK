package org.nlu.backend.dto.response.course;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.response.category.CategoryResponse;
import org.nlu.backend.dto.response.lesson.LessonSummaryResponse;
import org.nlu.backend.dto.response.level.LevelResponse;
import org.nlu.backend.dto.response.user.SellerResponse;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a course's details
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String thumbnailUrl;
    private CategoryResponse category;
    private LevelResponse level;
    private SellerResponse seller;
    private String status;
    private List<LessonSummaryResponse> lessons;
}
