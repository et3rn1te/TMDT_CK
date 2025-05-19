package org.nlu.backend.mapper;

import org.mapstruct.Mapper;
import org.nlu.backend.dto.request.level.LevelCreationRequest;
import org.nlu.backend.dto.response.level.LevelResponse;
import org.nlu.backend.entity.Level;

@Mapper(componentModel = "spring")
public interface LevelMapper {
    Level toLevel(LevelCreationRequest request);
    LevelResponse toLevelResponse(Level level);
}
