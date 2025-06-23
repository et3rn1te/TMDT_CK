package org.nlu.backend.service.course;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.request.course.ComplaintRequest;
import org.nlu.backend.dto.response.course.ComplaintResponse;
import org.nlu.backend.entity.Complaint;
import org.nlu.backend.entity.Course;
import org.nlu.backend.entity.User;
import org.nlu.backend.repository.ComplaintRepository;
import org.nlu.backend.repository.CourseRepository;
import org.nlu.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public ComplaintResponse submitComplaint(ComplaintRequest request) {
        Course course = courseRepository.findById(request.getCourseId()).orElseThrow();
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        Complaint complaint = Complaint.builder()
                .course(course)
                .user(user)
                .content(request.getContent())
                .status(Complaint.ComplaintStatus.PENDING)
                .build();

        return mapToResponse(complaintRepository.save(complaint));
    }

    public List<ComplaintResponse> getComplaintsByCourse(Long courseId) {
        return complaintRepository.findByCourseId(courseId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private ComplaintResponse mapToResponse(Complaint c) {
        return ComplaintResponse.builder()
                .id(c.getId())
                .courseId(c.getCourse().getId())
                .userId(c.getUser().getId())
                .userName(c.getUser().getFullName())
                .content(c.getContent())
                .courseTitle(c.getCourse().getTitle())
                .sellerName(c.getCourse().getSeller().getFullName())
                .status(c.getStatus().name())
                .createdAt(c.getCreatedAt())
                .build();
    }
}

