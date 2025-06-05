package org.nlu.backend.dto.response.level;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LevelResponse {
    private Long id;
    private String name;
    private String description;
}