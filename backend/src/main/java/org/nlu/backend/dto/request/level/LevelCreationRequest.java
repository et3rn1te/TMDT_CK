package org.nlu.backend.dto.request.level;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LevelCreationRequest {
    String name;
    String description;

}