package org.nlu.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.nlu.backend.dto.request.course.CourseCreationRequest;
import org.nlu.backend.dto.request.course.CourseStatusUpdateRequest;
import org.nlu.backend.dto.request.course.CourseUpdateRequest;
import org.nlu.backend.dto.response.admin.AdminCourseResponse;
import org.nlu.backend.dto.response.course.CourseResponse;
import org.nlu.backend.dto.response.course.CourseSummaryResponse;
import org.nlu.backend.entity.Course;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, LessonMapper.class, CategoryMapper.class, LevelMapper.class})
public interface CourseMapper {

    // CREATE
    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(source = "levelId", target = "level.id")
    @Mapping(source = "sellerId", target = "seller.id")
    @Mapping(target = "status", constant = "DRAFT")
    Course toCourse(CourseCreationRequest request);

    // UPDATE
    void updateCourseFromRequest(CourseUpdateRequest request, @MappingTarget Course course);

    // UPDATE STATUS
    void updateCourseStatusFromRequest(CourseStatusUpdateRequest request, @MappingTarget Course course);

    // ENTITY → RESPONSE
    @Mapping(source = "category", target = "category")
    @Mapping(source = "level", target = "level")
    @Mapping(source = "seller", target = "seller")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "lessons", target = "lessons")
    CourseResponse toCourseResponse(Course course);

    // ENTITY → SUMMARY RESPONSE
    @Mapping(source = "seller.fullName", target = "sellerName")
    @Mapping(source = "category.name", target = "categoryName")
    CourseSummaryResponse toCourseSummaryResponse(Course course);

    // ENTITY → ADMIN RESPONSE
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "level.name", target = "levelName")
    @Mapping(source = "seller", target = "seller")
    AdminCourseResponse toAdminCourseResponse(Course course);

    // Optional: list mapping
    List<CourseSummaryResponse> toCourseSummaryResponses(List<Course> courses);

    List<CourseResponse> toCourseResponses(List<Course> courses);
}

