package org.nlu.backend.dto.response.lesson;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a list of lessons in a course
public class LessonSummaryResponse {
    private Long id;
    private String title;
    private Integer order;
}
