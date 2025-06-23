package org.nlu.backend.dto.request.course;

import lombok.Data;

@Data
public class CourseReviewRequest {
    Long courseId;
    Long userId;
    Integer rating;
    String comment;
}
