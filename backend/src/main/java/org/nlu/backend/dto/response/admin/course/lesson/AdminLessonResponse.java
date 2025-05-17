package org.nlu.backend.dto.response.admin.course.lesson;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a course's details for the admin dashboard
public class AdminLessonResponse {
    private Long id;
    private String title;
    private Integer order;
    private String courseTitle;
    private Long courseId;
    private String createdBy;
}
