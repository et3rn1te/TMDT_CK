package org.nlu.backend.dto.request.course;


import lombok.Data;

@Data
public class ComplaintRequest {
    private Long courseId;
    private Long userId;
    private String content;
    private String title;
    private String description;
}


