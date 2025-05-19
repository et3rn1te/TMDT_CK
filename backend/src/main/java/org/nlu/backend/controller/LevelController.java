package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.level.LevelCreationRequest;
import org.nlu.backend.dto.response.level.LevelResponse;
import org.nlu.backend.service.level.LevelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/levels")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LevelController {
    LevelService levelService;

    @PostMapping
    ResponseEntity<ApiResponse<LevelResponse>> create(@RequestBody LevelCreationRequest request) {
        return ResponseEntity.ok()
                .body(ApiResponse.<LevelResponse>builder()
                        .data(levelService.createLevel(request))
                        .build());
    }

    @GetMapping
    ResponseEntity<ApiResponse<List<LevelResponse>>> getLevels() {
        return ResponseEntity.ok()
                .body(ApiResponse.<List<LevelResponse>>builder()
                        .data(levelService.getAllLevels())
                        .build());
    }

    @GetMapping("/{levelId}")
    ResponseEntity<ApiResponse<LevelResponse>> getLevel(@PathVariable Long levelId) {
        return ResponseEntity.ok()
                .body(ApiResponse.<LevelResponse>builder()
                        .data(levelService.getLevel(levelId))
                        .build());
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long levelId) {
        levelService.deleteLevel(levelId);
        return ResponseEntity.ok()
                .body(ApiResponse.<Void>builder().build());
    }

}
