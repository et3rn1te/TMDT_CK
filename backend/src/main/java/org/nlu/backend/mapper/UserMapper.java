package org.nlu.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.nlu.backend.dto.request.UserCreationRequest;
import org.nlu.backend.dto.response.UserResponse;
import org.nlu.backend.dto.response.course.SellerResponse;
import org.nlu.backend.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "fullName", target = "fullName")
    @Mapping(source = "email", target = "email")
    SellerResponse toSellerResponse(User user);
}
