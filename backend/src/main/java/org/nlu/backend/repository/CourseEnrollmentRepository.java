package org.nlu.backend.repository;

import org.nlu.backend.entity.CourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Long> {
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}
