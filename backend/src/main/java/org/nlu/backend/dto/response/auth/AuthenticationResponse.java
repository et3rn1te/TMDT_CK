package org.nlu.backend.dto.response.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.response.UserResponse;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    boolean authenticated;
    UserResponse user;
}
