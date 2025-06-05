package org.nlu.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.nlu.backend.dto.request.category.CategoryCreationRequest;
import org.nlu.backend.dto.response.category.CategoryResponse;
import org.nlu.backend.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryCreationRequest request);

    @Mapping(source = "id", target = "id")
    CategoryResponse toCategoryResponse(Category category);

}
