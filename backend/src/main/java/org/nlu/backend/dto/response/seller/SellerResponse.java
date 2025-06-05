package org.nlu.backend.dto.response.seller;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

// When to use : return a seller's details of the course
public class SellerResponse {
    private Long id;
    private String fullName;
    private String email;
}
