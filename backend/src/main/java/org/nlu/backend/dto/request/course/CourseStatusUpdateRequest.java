package org.nlu.backend.dto.request.course;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.entity.Course;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseStatusUpdateRequest {
    private Course.CourseStatus status;
}
