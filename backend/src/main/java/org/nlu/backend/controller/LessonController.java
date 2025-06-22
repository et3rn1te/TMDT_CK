package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.lesson.LessonCreationRequest;
import org.nlu.backend.dto.request.lesson.LessonUpdateRequest;
import org.nlu.backend.dto.response.lesson.LessonResponse;
import org.nlu.backend.dto.response.lesson.LessonSummaryResponse;
import org.nlu.backend.service.lesson.ILessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses/{courseId}/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final ILessonService lessonService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<LessonSummaryResponse>>> getLessonsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.<List<LessonSummaryResponse>>builder()
                .data(lessonService.getLessonsByCourseId(courseId))
                .build());
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<LessonResponse>> getLessonById(
            @PathVariable Long courseId,
            @PathVariable Long lessonId
    ) {
        return ResponseEntity.ok(ApiResponse.<LessonResponse>builder()
                .data(lessonService.getLessonById(courseId, lessonId))
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LessonResponse>> createLesson(
            @PathVariable Long courseId,
            @RequestBody LessonCreationRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.<LessonResponse>builder()
                .data(lessonService.createLesson(courseId, request))
                .build());
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<LessonResponse>> updateLesson(
            @PathVariable Long courseId,
            @PathVariable Long lessonId,
            @RequestBody LessonUpdateRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.<LessonResponse>builder()
                .data(lessonService.updateLesson(courseId, lessonId, request))
                .build());
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(
            @PathVariable Long courseId,
            @PathVariable Long lessonId
    ) {
        lessonService.deleteLesson(courseId, lessonId);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    @PutMapping("/reorder")
    public ResponseEntity<ApiResponse<Void>> reorderLessons(
            @PathVariable Long courseId,
            @RequestBody List<Long> lessonIds
    ) {
        lessonService.reorderLessons(courseId, lessonIds);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }
} 