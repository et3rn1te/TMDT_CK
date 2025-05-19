package org.nlu.backend.service.level;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.request.level.LevelCreationRequest;
import org.nlu.backend.dto.response.level.LevelResponse;
import org.nlu.backend.entity.Level;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.mapper.LevelMapper;
import org.nlu.backend.repository.LevelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LevelService implements ILevelService{
    LevelRepository levelRepository;
    LevelMapper levelMapper;

    @Override
    public LevelResponse createLevel(LevelCreationRequest request) {
        if (levelRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.LEVEL_EXISTED);
        }
        Level level = levelMapper.toLevel(request);
        return levelMapper.toLevelResponse(levelRepository.save(level));
    }

    @Override
    public LevelResponse getLevel(Long id) {
        return levelMapper
                .toLevelResponse(levelRepository
                        .findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.LEVEL_NOT_EXISTED)));
    }

    @Override
    public List<LevelResponse> getAllLevels() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream().map(levelMapper::toLevelResponse).toList();
    }

    @Override
    public void deleteLevel(Long id) {
        levelRepository.deleteById(id);
    }
}
