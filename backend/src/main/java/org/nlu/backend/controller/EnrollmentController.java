package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
//    private final IEnrollmentService enrollmentService;
//
//    //-------------- GET MAPPING --------------
//    @GetMapping("/my-courses")
//    @PreAuthorize("hasRole('USER')") // Chỉ người dùng có vai trò USER mới có thể xem khóa học đã đăng ký của họ
//    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getMyEnrolledCourses() {
//        // Lấy ID người dùng hiện tại từ SecurityContextHolder
//        List<CourseSummaryResponse> enrolledCourses = enrollmentService.getEnrolledCoursesByCurrentUser();
//        return ResponseEntity.ok()
//                .body(ApiResponse.<List<CourseSummaryResponse>>builder()
//                        .data(enrolledCourses)
//                        .message("Lấy danh sách khóa học đã đăng ký thành công")
//                        .build());
//    }
//
//    @GetMapping("/{enrollmentId}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')") // USER chỉ được xem đăng ký của họ, ADMIN xem tất cả
//    public ResponseEntity<ApiResponse<EnrollmentResponse>> getEnrollmentById(@PathVariable Long enrollmentId) {
//        EnrollmentResponse response = enrollmentService.getEnrollmentDetails(enrollmentId);
//        return ResponseEntity.ok()
//                .body(ApiResponse.<EnrollmentResponse>builder()
//                        .data(response)
//                        .message("Lấy chi tiết đăng ký thành công")
//                        .build());
//    }
//
//    //-------------- POST MAPPING --------------
//
//    @PostMapping
//    @PreAuthorize("hasRole('USER')") // Chỉ người dùng có vai trò USER mới có thể đăng ký
//    public ResponseEntity<ApiResponse<Void>> enrollInCourse(@RequestBody EnrollmentRequest request) {
//        // Lấy ID người dùng hiện tại từ SecurityContextHolder
//        // Bạn cần một cách để lấy ID của user đã đăng nhập, ví dụ:
//        // String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
//        // Long currentUserId = userService.findIdByEmail(currentUserEmail); // Cần phương thức này trong UserService
//
//        // Hoặc nếu UserDetails là một entity User của bạn:
//        // User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        // Long currentUserId = currentUser.getId();
//
//        enrollmentService.enrollInCourse(request.getCourseId()); // Truyền courseId và userId (tự lấy trong service)
//        return ResponseEntity.ok()
//                .body(ApiResponse.<Void>builder()
//                        .message("Đăng ký khóa học thành công")
//                        .build());
//    }
//
//    //-------------- GET MAPPING --------------
//    //-------------- DELETE MAPPING --------------
//    @DeleteMapping("/{enrollmentId}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')") // USER chỉ được hủy đăng ký của họ, ADMIN hủy tất cả
//    public ResponseEntity<ApiResponse<Void>> cancelEnrollment(@PathVariable Long enrollmentId) {
//        enrollmentService.cancelEnrollment(enrollmentId);
//        return ResponseEntity.ok()
//                .body(ApiResponse.<Void>builder()
//                        .message("Hủy đăng ký khóa học thành công")
//                        .build());
//    }

}



