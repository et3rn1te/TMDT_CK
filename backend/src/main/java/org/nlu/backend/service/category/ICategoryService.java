package org.nlu.backend.service.category;

import org.nlu.backend.dto.request.category.CategoryCreationRequest;
import org.nlu.backend.dto.response.category.CategoryResponse;

import java.util.List;

public interface ICategoryService {
    public CategoryResponse createCategory(CategoryCreationRequest request);
    public CategoryResponse getCategory(Long id);
    public List<CategoryResponse> getAllCategories();
    public void deleteCategory(Long id);
}
