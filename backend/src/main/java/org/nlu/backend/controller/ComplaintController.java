package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.request.course.ComplaintRequest;
import org.nlu.backend.dto.response.course.ComplaintResponse;
import org.nlu.backend.service.course.ComplaintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {
    private final ComplaintService complaintService;

    @PostMapping
    public ComplaintResponse createComplaint(@RequestBody ComplaintRequest request) {
        return complaintService.submitComplaint(request);
    }

    @GetMapping("/course/{courseId}")
    public List<ComplaintResponse> getComplaints(@PathVariable Long courseId) {
        return complaintService.getComplaintsByCourse(courseId);
    }
}
