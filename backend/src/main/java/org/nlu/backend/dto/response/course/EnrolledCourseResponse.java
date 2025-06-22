package org.nlu.backend.dto.response.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.nlu.backend.entity.Course;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrolledCourseResponse {
    private Long id;
    private String title;
    private String description;
    private String thumbnail;
    private BigDecimal price;
    private String instructorName;
    private LocalDateTime enrollmentDate;
    private Double progress;
    private Course.CourseStatus status;
} 