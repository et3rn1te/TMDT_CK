package org.nlu.backend.service.course;

import jakarta.persistence.criteria.Predicate;
import lombok.*;
import org.nlu.backend.dto.request.course.*;
import org.nlu.backend.dto.response.course.*;
import org.nlu.backend.entity.Course;
import org.nlu.backend.mapper.CourseMapper;
import org.nlu.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService implements ICourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Override
    public List<CourseSummaryResponse> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courseMapper.toCourseSummaryResponses(courses);
    }

    @Override
    public CourseResponse createCourse(CourseCreationRequest request) {
        Course course = courseMapper.toCourse(request);
        course = courseRepository.save(course);
        return courseMapper.toCourseResponse(course);
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseUpdateRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        courseMapper.updateCourseFromRequest(request, course);
        course = courseRepository.save(course);
        return courseMapper.toCourseResponse(course);
    }

    @Override
    public void updateCourseStatus(Long id, CourseStatusUpdateRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        courseMapper.updateCourseStatusFromRequest(request, course);
        courseRepository.save(course);
    }

    @Override
    @Transactional(readOnly = true)
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return courseMapper.toCourseResponse(course);
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public List<CourseSummaryResponse> filterCourses(CourseFilterRequest request) {
        Specification<Course> spec = buildCourseSpecification(request);
        List<Course> courses = courseRepository.findAll(spec);
        return courseMapper.toCourseSummaryResponses(courses);
    }

    // Hàm này sẽ xây dựng điều kiện filter từ request
    private Specification<Course> buildCourseSpecification(CourseFilterRequest request) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if (request.getKeyword() != null && !request.getKeyword().isEmpty()) {
                String keyword = "%" + request.getKeyword().toLowerCase() + "%";
                predicate = cb.and(predicate, cb.or(
                        cb.like(cb.lower(root.get("title")), keyword),
                        cb.like(cb.lower(root.get("description")), keyword)
                ));
            }
            if (request.getCategoryId() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("category").get("id"), request.getCategoryId()));
            }
            if (request.getLevelId() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("level").get("id"), request.getLevelId()));
            }
            if (request.getStatus() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("status"), request.getStatus()));
            }
            if (request.getMinPrice() != null) {
                predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
            }
            if (request.getMaxPrice() != null) {
                predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
            }
            if (request.getSellerId() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("seller").get("id"), request.getSellerId()));
            }
            // Có thể bổ sung sortBy, sortDirection nếu cần

            return predicate;
        };
    }
}