package org.nlu.backend.service.course.enrollment;

import org.nlu.backend.dto.request.course.enrollment.CourseEnrollmentRequest;

public interface IEnrollmentService {
    void enrollCourse(Long userId, CourseEnrollmentRequest request);
}
