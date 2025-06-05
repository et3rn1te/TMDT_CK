package org.nlu.backend.dto.response.lesson;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a lesson's details
public class LessonResponse {
    private Long id;
    private String title;
    private Integer order;
    private String description;
    private String videoUrl;
    private String fileUrl;
    private Long courseId;
    private String courseTitle;  // optional
    private boolean isPreview;
}
