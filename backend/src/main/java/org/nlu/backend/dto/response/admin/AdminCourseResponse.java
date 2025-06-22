package org.nlu.backend.dto.response.admin;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.response.user.SellerResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a course's details for the admin dashboard
public class AdminCourseResponse {
    private Long id;
    private String title;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String sellerEmail;
    private String categoryName;
    private String levelName;
    private String status;
    private SellerResponse seller;
    private LocalDateTime createdAt;
}
