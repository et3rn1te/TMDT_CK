package org.nlu.backend.service.level;

import org.nlu.backend.dto.request.level.LevelCreationRequest;
import org.nlu.backend.dto.response.level.LevelResponse;

import java.util.List;

public interface ILevelService {
    public LevelResponse createLevel(LevelCreationRequest request);
    public LevelResponse getLevel(Long id);
    public List<LevelResponse> getAllLevels();
    public void deleteLevel(Long id);
}
