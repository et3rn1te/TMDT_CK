package org.nlu.backend.service.course;

import jakarta.persistence.criteria.Predicate;
import lombok.*;
import org.nlu.backend.dto.request.course.*;
import org.nlu.backend.dto.response.course.*;
import org.nlu.backend.entity.Course;
import org.nlu.backend.entity.User;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.mapper.CourseMapper;
import org.nlu.backend.repository.CourseRepository;
import org.nlu.backend.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService implements ICourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final UserRepository userRepository;

    @Override
    public List<CourseSummaryResponse> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courseMapper.toCourseSummaryResponses(courses);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public CourseResponse createCourse(CourseCreationRequest request) {
        Course course = courseMapper.toCourse(request);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentSellerEmail = authentication.getName();
        User seller = userRepository.findByEmail(currentSellerEmail)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)); // Lỗi này có thể xảy ra nếu token không hợp lệ hoặc user đã bị xóa
        course.setSeller(seller);

        course = courseRepository.save(course);
        return courseMapper.toCourseResponse(course);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public CourseResponse updateCourse(Long id, CourseUpdateRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        // Kiểm tra quyền: ADMIN có thể sửa bất kỳ khóa học nào, SELLER chỉ sửa khóa học của mình
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            // Nếu không phải ADMIN, kiểm tra xem có phải là SELLER sở hữu khóa học không
            String currentSellerEmail = authentication.getName();
            User seller = userRepository.findByEmail(currentSellerEmail)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            if (!course.getSeller().getId().equals(seller.getId())) {
                throw new AppException(ErrorCode.ACCESS_DENIED); // Cần định nghĩa lỗi này nếu chưa có
            }
        }

        courseMapper.updateCourseFromRequest(request, course);
        course = courseRepository.save(course);
        return courseMapper.toCourseResponse(course);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public void updateCourseStatus(Long id, CourseStatusUpdateRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        // Kiểm tra quyền: ADMIN có thể thay đổi trạng thái bất kỳ, SELLER chỉ thay đổi của mình
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            String currentSellerEmail = authentication.getName();
            User seller = userRepository.findByEmail(currentSellerEmail)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            if (!course.getSeller().getId().equals(seller.getId())) {
                throw new AppException(ErrorCode.ACCESS_DENIED);
            }
            // Logic đặc biệt cho SELLER: có thể không cho phép SELLER tự phê duyệt hoặc chuyển sang trạng thái APPROVED
            // Ví dụ: if (request.getStatus().equals("APPROVED") || request.getStatus().equals("REJECTED")) {
            //             throw new AppException(ErrorCode.PERMISSION_DENIED);
            //         }
        }

        courseMapper.updateCourseStatusFromRequest(request, course);
        courseRepository.save(course);
    }

    @Override
    @Transactional(readOnly = true)
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        return courseMapper.toCourseResponse(course);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        // Kiểm tra quyền: ADMIN có thể xóa bất kỳ khóa học nào, SELLER chỉ xóa khóa học của mình
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            String currentSellerEmail = authentication.getName();
            User seller = userRepository.findByEmail(currentSellerEmail)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            if (!course.getSeller().getId().equals(seller.getId())) {
                throw new AppException(ErrorCode.ACCESS_DENIED);
            }
        }
        courseRepository.delete(course); // Xóa entity để kiểm tra quyền sở hữu
    }

    @Override
    public List<CourseSummaryResponse> filterCourses(CourseFilterRequest request) {
        Specification<Course> spec = buildCourseSpecification(request);
        List<Course> courses = courseRepository.findAll(spec);
        return courseMapper.toCourseSummaryResponses(courses);
    }

    // --- Các phương thức mới theo yêu cầu ưu tiên ---

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')") // Đã có @PreAuthorize ở Controller, nhưng giữ ở đây để bảo vệ service
    public List<CourseSummaryResponse> getCoursesByCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Email của người dùng hiện tại

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Lấy tất cả khóa học mà người dùng này là seller
        List<Course> courses = courseRepository.findBySeller(currentUser);
        return courseMapper.toCourseSummaryResponses(courses);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')") // Chỉ ADMIN mới có quyền phê duyệt
    public void approveCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
        // Kiểm tra trạng thái hiện tại nếu cần (ví dụ: chỉ phê duyệt nếu đang ở trạng thái PENDING)
        if (!"PENDING".equals(course.getStatus())) { // Giả định trạng thái là String "PENDING"
            throw new AppException(ErrorCode.INVALID_COURSE_STATUS); // Cần định nghĩa lỗi này
        }
        course.setStatus(Course.CourseStatus.valueOf("APPROVED")); // Cập nhật trạng thái thành APPROVED
        courseRepository.save(course);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')") // Chỉ ADMIN mới có quyền từ chối
    public void rejectCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        // Kiểm tra trạng thái hiện tại nếu cần
        if (!"PENDING".equals(course.getStatus())) {
            throw new AppException(ErrorCode.INVALID_COURSE_STATUS);
        }
        course.setStatus(Course.CourseStatus.valueOf("REJECTED")); // Cập nhật trạng thái thành REJECTED
        courseRepository.save(course);
    }

    // Hàm này sẽ xây dựng điều kiện filter từ request
    private Specification<Course> buildCourseSpecification(CourseFilterRequest request) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if (request.getKeyword() != null && !request.getKeyword().isEmpty()) {
                String keyword = "%" + request.getKeyword().toLowerCase() + "%";
                predicate = cb.and(predicate, cb.or(
                        cb.like(cb.lower(root.get("title")), keyword),
                        cb.like(cb.lower(root.get("description")), keyword)
                ));
            }
            if (request.getCategoryId() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("category").get("id"), request.getCategoryId()));
            }
            if (request.getLevelId() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("level").get("id"), request.getLevelId()));
            }
            if (request.getStatus() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("status"), request.getStatus()));
            }
            if (request.getMinPrice() != null) {
                predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
            }
            if (request.getMaxPrice() != null) {
                predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
            }
            if (request.getSellerId() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("seller").get("id"), request.getSellerId()));
            }
            // Có thể bổ sung sortBy, sortDirection nếu cần

            return predicate;
        };
    }
}
