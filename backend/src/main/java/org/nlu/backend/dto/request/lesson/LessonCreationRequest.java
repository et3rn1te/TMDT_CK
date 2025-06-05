package org.nlu.backend.dto.request.lesson;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonCreationRequest {
    private String title;
    private Integer order;
    private String description;
    private String videoUrl;
    private String fileUrl;
    private Long courseId;  // course's id the lesson belongs to
    private boolean isPreview;
}
