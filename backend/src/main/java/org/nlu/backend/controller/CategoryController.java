package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.category.CategoryCreationRequest;
import org.nlu.backend.dto.response.category.CategoryResponse;
import org.nlu.backend.service.category.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @PostMapping
    ResponseEntity<ApiResponse<CategoryResponse>> create
            (@RequestBody CategoryCreationRequest request) {
        return ResponseEntity.ok()
                .body(ApiResponse.<CategoryResponse>builder()
                        .data(categoryService.createCategory(request))
                        .build());
    }

    @GetMapping
    ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
        return ResponseEntity.ok()
                .body(ApiResponse.<List<CategoryResponse>>builder()
                        .data(categoryService.getAllCategories())
                        .build());
    }

    @GetMapping("/{categoryId}")
    ResponseEntity<ApiResponse<CategoryResponse>> getCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok()
                .body(ApiResponse.<CategoryResponse>builder()
                        .data(categoryService.getCategory(categoryId))
                        .build());
    }
    @DeleteMapping
    ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok()
                .body(ApiResponse.builder().build());
    }
}
