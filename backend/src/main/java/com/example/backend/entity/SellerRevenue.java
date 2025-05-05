package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "seller_revenue")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerRevenue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer revenueId;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(nullable = false)
    private BigDecimal amount;

    private LocalDateTime createdAt = LocalDateTime.now();
}