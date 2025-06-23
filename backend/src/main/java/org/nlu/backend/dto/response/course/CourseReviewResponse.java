package org.nlu.backend.dto.response.course;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CourseReviewResponse {
    private Long id;
    private Long courseId;
    private Long userId;
    private String userName;
    private String userAvatar;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}