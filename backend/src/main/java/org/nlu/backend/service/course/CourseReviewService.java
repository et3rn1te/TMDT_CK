package org.nlu.backend.service.course;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.request.course.CourseReviewRequest;
import org.nlu.backend.dto.response.course.CourseReviewResponse;
import org.nlu.backend.entity.Course;
import org.nlu.backend.entity.CourseReview;
import org.nlu.backend.entity.User;
import org.nlu.backend.repository.CourseRepository;
import org.nlu.backend.repository.CourseReviewRepository;
import org.nlu.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseReviewService {
    private final CourseReviewRepository reviewRepo;
    private final UserRepository userRepo;
    private final CourseRepository courseRepo;

    public CourseReviewResponse createOrUpdateReview(CourseReviewRequest request) {
        User user = userRepo.findById(request.getUserId()).orElseThrow();
        Course course = courseRepo.findById(request.getCourseId()).orElseThrow();

        Optional<CourseReview> existing = reviewRepo.findByCourseIdAndUserId(course.getId(), user.getId());

        CourseReview review = existing.orElse(CourseReview.builder()
                .user(user)
                .course(course)
                .build());

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        CourseReview saved = reviewRepo.save(review);
        return mapToResponse(saved);
    }

    public List<CourseReviewResponse> getReviewsByCourse(Long courseId) {
        return reviewRepo.findByCourseId(courseId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public Double getAverageRating(Long courseId) {
        return Optional.ofNullable(reviewRepo.findAverageRatingByCourseId(courseId)).orElse(0.0);
    }

    private CourseReviewResponse mapToResponse(CourseReview r) {
        return CourseReviewResponse.builder()
                .id(r.getId())
                .courseId(r.getCourse().getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getFullName())
                .userAvatar("https://randomuser.me/api/portraits/men/32.jpg")
                .rating(r.getRating())
                .comment(r.getComment())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
