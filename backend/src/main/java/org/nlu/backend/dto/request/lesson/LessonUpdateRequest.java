package org.nlu.backend.dto.request.lesson;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonUpdateRequest {
    private String title;
    private Integer order;
    private String description;
    private String videoUrl;
    private String fileUrl;
    private boolean isPreview;
}
