package org.nlu.backend.controller;

import java.util.List;

import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.course.CourseReviewRequest;
import org.nlu.backend.dto.response.course.CourseReviewResponse;
import org.nlu.backend.service.course.CourseReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class CourseReviewController {
    private final CourseReviewService courseReviewService;

    @PostMapping
    public ResponseEntity<ApiResponse<CourseReviewResponse>> createReview(@RequestBody CourseReviewRequest request) {
        ApiResponse<CourseReviewResponse> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage("Success");
        response.setData(courseReviewService.createOrUpdateReview(request));
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseReviewResponse>>> getAllReviews() {
        ApiResponse<List<CourseReviewResponse>> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage("Success");
        response.setData(courseReviewService.getAllReviews());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{courseId}")
    public List<CourseReviewResponse> getReviews(@PathVariable Long courseId) {
        return courseReviewService.getReviewsByCourse(courseId);
    }

    @GetMapping("/course/{courseId}/average")
    public Double getAverage(@PathVariable Long courseId) {
        return courseReviewService.getAverageRating(courseId);
    }
}

