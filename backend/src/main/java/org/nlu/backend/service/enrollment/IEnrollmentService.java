package org.nlu.backend.service.enrollment;

import org.nlu.backend.dto.request.enrollment.CourseEnrollmentRequest;
import org.nlu.backend.dto.response.course.EnrolledCourseResponse;

import java.util.List;

public interface IEnrollmentService {
    void enrollCourse(Long userId, CourseEnrollmentRequest request);
    List<EnrolledCourseResponse> getEnrolledCourses();
}
