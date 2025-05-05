package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lessonId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer lessonOrder;

    private String description;

    private String videoUrl;

    private String fileUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();
}