package org.nlu.backend.service.lesson;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.request.lesson.LessonCreationRequest;
import org.nlu.backend.dto.request.lesson.LessonUpdateRequest;
import org.nlu.backend.dto.response.lesson.LessonResponse;
import org.nlu.backend.dto.response.lesson.LessonSummaryResponse;
import org.nlu.backend.entity.Course;
import org.nlu.backend.entity.Lesson;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.mapper.LessonMapper;
import org.nlu.backend.repository.CourseRepository;
import org.nlu.backend.repository.LessonRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonService implements ILessonService {
    LessonRepository lessonRepository;
    CourseRepository courseRepository;
    LessonMapper lessonMapper;

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    public List<LessonSummaryResponse> getLessonsByCourseId(Long courseId) {
        Course course = getCourseAndValidateAccess(courseId);
        return course.getLessons().stream()
                .map(lessonMapper::toLessonSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    public LessonResponse getLessonById(Long courseId, Long lessonId) {
        Course course = getCourseAndValidateAccess(courseId);
        Lesson lesson = course.getLessons().stream()
                .filter(l -> l.getId().equals(lessonId))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        return lessonMapper.toLessonResponse(lesson);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    @Transactional
    public LessonResponse createLesson(Long courseId, LessonCreationRequest request) {
        Course course = getCourseAndValidateAccess(courseId);
        
        // Set the order to be the last if not specified
        if (request.getOrder() == null) {
            request.setOrder(course.getLessons().size() + 1);
        }
        
        Lesson lesson = lessonMapper.toLesson(request);
        lesson.setCourse(course);
        
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toLessonResponse(lesson);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    @Transactional
    public LessonResponse updateLesson(Long courseId, Long lessonId, LessonUpdateRequest request) {
        Course course = getCourseAndValidateAccess(courseId);
        Lesson lesson = course.getLessons().stream()
                .filter(l -> l.getId().equals(lessonId))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        // Update lesson fields
        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setVideoUrl(request.getVideoUrl());
        lesson.setFileUrl(request.getFileUrl());
        lesson.setOrder(request.getOrder());
        lesson.setPreview(request.isPreview());

        lesson = lessonRepository.save(lesson);
        return lessonMapper.toLessonResponse(lesson);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    @Transactional
    public void deleteLesson(Long courseId, Long lessonId) {
        Course course = getCourseAndValidateAccess(courseId);
        Lesson lesson = course.getLessons().stream()
                .filter(l -> l.getId().equals(lessonId))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        lessonRepository.delete(lesson);
        
        // Reorder remaining lessons
        List<Lesson> remainingLessons = course.getLessons().stream()
                .filter(l -> !l.getId().equals(lessonId))
                .collect(Collectors.toList());
        
        for (int i = 0; i < remainingLessons.size(); i++) {
            remainingLessons.get(i).setOrder(i + 1);
        }
        
        lessonRepository.saveAll(remainingLessons);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    @Transactional
    public void reorderLessons(Long courseId, List<Long> lessonIds) {
        Course course = getCourseAndValidateAccess(courseId);
        
        // Validate that all lessons belong to the course
        if (lessonIds.size() != course.getLessons().size() || 
            !course.getLessons().stream().map(Lesson::getId).collect(Collectors.toSet())
                .containsAll(lessonIds)) {
            throw new AppException(ErrorCode.INVALID_LESSON_ORDER);
        }

        // Update order for each lesson
        for (int i = 0; i < lessonIds.size(); i++) {
            Long lessonId = lessonIds.get(i);
            int finalI = i;
            course.getLessons().stream()
                    .filter(l -> l.getId().equals(lessonId))
                    .findFirst()
                    .ifPresent(lesson -> lesson.setOrder(finalI + 1));
        }

        courseRepository.save(course);
    }

    private Course getCourseAndValidateAccess(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        
        // Access validation will be handled by @PreAuthorize
        return course;
    }
} 