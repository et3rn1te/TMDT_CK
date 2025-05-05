package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "assignment_submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer submissionId;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String fileUrl;

    private LocalDateTime submissionDate = LocalDateTime.now();
}
