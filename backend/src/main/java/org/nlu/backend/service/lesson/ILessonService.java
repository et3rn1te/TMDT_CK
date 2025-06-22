package org.nlu.backend.service.lesson;

import org.nlu.backend.dto.request.lesson.LessonCreationRequest;
import org.nlu.backend.dto.request.lesson.LessonUpdateRequest;
import org.nlu.backend.dto.response.lesson.LessonResponse;
import org.nlu.backend.dto.response.lesson.LessonSummaryResponse;

import java.util.List;

public interface ILessonService {
    List<LessonSummaryResponse> getLessonsByCourseId(Long courseId);
    
    LessonResponse getLessonById(Long courseId, Long lessonId);
    
    LessonResponse createLesson(Long courseId, LessonCreationRequest request);
    
    LessonResponse updateLesson(Long courseId, Long lessonId, LessonUpdateRequest request);
    
    void deleteLesson(Long courseId, Long lessonId);
    
    void reorderLessons(Long courseId, List<Long> lessonIds);
} 