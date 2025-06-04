package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<CourseSummaryResponse>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/my-courses") //
    public ResponseEntity<List<CourseSummaryResponse>> getMyCourses() {
        // Logic trong service: Lấy ID người dùng hiện tại từ SecurityContext
        // và sau đó lọc các khóa học theo ID đó.
        return ResponseEntity.ok(courseService.getCoursesByCurrentUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    //-------------- POST MAPPING --------------
    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(@RequestBody CourseCreationRequest request) {
        return ResponseEntity.ok(courseService.createCourse(request));
    }

    @PostMapping("/filter")
    public ResponseEntity<List<CourseSummaryResponse>> filterCourses(@RequestBody CourseFilterRequest request) {
        return ResponseEntity.ok(courseService.filterCourses(request));
    }

    //-------------- PUT MAPPING --------------
    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(@PathVariable Long id, @RequestBody CourseUpdateRequest request) {
        return ResponseEntity.ok(courseService.updateCourse(id, request));
    }

    //-------------- PATCH MAPPING --------------
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateCourseStatus(@PathVariable Long id, @RequestBody CourseStatusUpdateRequest request) {
        courseService.updateCourseStatus(id, request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Void> approveCourse(@PathVariable Long id) {
        courseService.approveCourse(id); // Phương thức này sẽ thay đổi trạng thái khóa học
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Void> rejectCourse(@PathVariable Long id) {
        courseService.rejectCourse(id);
        return ResponseEntity.ok().build();
    }

    //-------------- DELETE MAPPING --------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }
}