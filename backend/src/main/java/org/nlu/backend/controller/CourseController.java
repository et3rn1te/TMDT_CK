package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.course.*;
import org.nlu.backend.dto.response.course.CourseResponse;
import org.nlu.backend.dto.response.course.CourseSummaryResponse;
import org.nlu.backend.service.course.ICourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final ICourseService courseService;

    //-------------- GET MAPPING --------------
    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getAllCourses() {
        return ResponseEntity.ok(ApiResponse.<List<CourseSummaryResponse>>builder()
                .data(courseService.getAllCourses())
                .build());
    }

    @GetMapping("/my-courses")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getMyCourses() {
        return ResponseEntity.ok(ApiResponse.<List<CourseSummaryResponse>>builder()
                .data(courseService.getCoursesByCurrentUser())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.<CourseResponse>builder()
                .data(courseService.getCourseById(id))
                .build());
    }

    //-------------- POST MAPPING --------------
    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(@RequestBody CourseCreationRequest request) {
        return ResponseEntity.ok(ApiResponse.<CourseResponse>builder()
                .data(courseService.createCourse(request))
                .build());
    }

    @PostMapping("/filter")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> filterCourses(@RequestBody CourseFilterRequest request) {
        return ResponseEntity.ok(ApiResponse.<List<CourseSummaryResponse>>builder()
                .data(courseService.filterCourses(request))
                .build());
    }

    //-------------- PUT MAPPING --------------
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(@PathVariable Long id, @RequestBody CourseUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.<CourseResponse>builder()
                .data(courseService.updateCourse(id, request))
                .build());
    }

    //-------------- PATCH MAPPING --------------
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateCourseStatus(@PathVariable Long id, @RequestBody CourseStatusUpdateRequest request) {
        courseService.updateCourseStatus(id, request);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<Void>> approveCourse(@PathVariable Long id) {
        courseService.approveCourse(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<Void>> rejectCourse(@PathVariable Long id) {
        courseService.rejectCourse(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    //-------------- DELETE MAPPING --------------
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }
}
