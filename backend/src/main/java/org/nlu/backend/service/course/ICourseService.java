package org.nlu.backend.service.course;

import java.util.List;

import org.nlu.backend.dto.request.course.*;
import org.nlu.backend.dto.response.course.*;

public interface ICourseService {
    List<CourseSummaryResponse> getAllCourses();

    CourseResponse createCourse(CourseCreationRequest request);

    CourseResponse updateCourse(Long id, CourseUpdateRequest request);

    void updateCourseStatus(Long id, CourseStatusUpdateRequest request);

    CourseResponse getCourseById(Long id);

    List<CourseSummaryResponse> filterCourses(CourseFilterRequest request);

    void deleteCourse(Long id);

    List<CourseSummaryResponse> getCoursesByCurrentUser();

    void approveCourse(Long id);

    void rejectCourse(Long id);

    List<CourseSummaryResponse> searchCourses(String keyword);
}
