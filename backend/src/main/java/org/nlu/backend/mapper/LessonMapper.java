package org.nlu.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.nlu.backend.dto.request.lesson.LessonCreationRequest;
import org.nlu.backend.dto.response.lesson.LessonResponse;
import org.nlu.backend.dto.response.lesson.LessonSummaryResponse;
import org.nlu.backend.entity.Lesson;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    @Mapping(target = "course.id", source = "courseId")
    Lesson toLesson(LessonCreationRequest request);

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.title", target = "courseTitle")
    LessonResponse toLessonResponse(Lesson lesson);

    LessonSummaryResponse toLessonSummaryResponse(Lesson lesson);
}
