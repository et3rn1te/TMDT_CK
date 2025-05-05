package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer assignmentId;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @Column(nullable = false)
    private String title;

    private String description;

    private String fileUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();
}