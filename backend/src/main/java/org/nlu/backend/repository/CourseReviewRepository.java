package org.nlu.backend.repository;

import org.nlu.backend.entity.CourseReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CourseReviewRepository extends JpaRepository<CourseReview, Long> {
    List<CourseReview> findByCourseId(Long courseId);
    Optional<CourseReview> findByCourseIdAndUserId(Long courseId, Long userId);

    @Query("SELECT AVG(r.rating) FROM CourseReview r WHERE r.course.id = :courseId")
    Double findAverageRatingByCourseId(Long courseId);
}