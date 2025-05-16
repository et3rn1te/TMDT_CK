package org.nlu.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "lessons")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Lesson extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    Course course;

    @Column(nullable = false)
    String title;

    @Column(name = "lesson_order", nullable = false)
    Integer order;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(name = "video_url")
    String videoUrl;

    @Column(name = "file_url")
    String fileUrl;
}