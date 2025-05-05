package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "levels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer levelId;

    @Column(nullable = false)
    private String name;

    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();
}
