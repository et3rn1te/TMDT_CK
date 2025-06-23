package org.nlu.backend.dto.response.course;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ComplaintResponse {
    private Long id;
    private Long courseId;
    private Long userId;
    private String userName;
    private String content;
    private String courseTitle;
    private String sellerName;
    private String status;
    private LocalDateTime createdAt;
}

