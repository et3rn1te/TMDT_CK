package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.request.course.CourseReviewRequest;
import org.nlu.backend.dto.response.course.CourseReviewResponse;
import org.nlu.backend.service.course.CourseReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class CourseReviewController {
    private final CourseReviewService service;

    @PostMapping
    public CourseReviewResponse submitReview(@RequestBody CourseReviewRequest request) {
        return service.createOrUpdateReview(request);
    }

    @GetMapping("/course/{courseId}")
    public List<CourseReviewResponse> getReviews(@PathVariable Long courseId) {
        return service.getReviewsByCourse(courseId);
    }

    @GetMapping("/course/{courseId}/average")
    public Double getAverage(@PathVariable Long courseId) {
        return service.getAverageRating(courseId);
    }
}

