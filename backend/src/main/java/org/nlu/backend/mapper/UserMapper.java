package org.nlu.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.nlu.backend.dto.request.UserCreationRequest;
import org.nlu.backend.dto.response.UserResponse;
import org.nlu.backend.dto.response.user.SellerResponse;
import org.nlu.backend.entity.Role;
import org.nlu.backend.entity.User;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "fullName", target = "fullName")
    @Mapping(source = "email", target = "email")
    SellerResponse toSellerResponse(User user);

    // Role -> String
    default Set<String> mapRolesToStrings(Set<Role> roles) {
        if (roles == null) {
            return null;
        }
        return roles.stream()
                .map(Role::getName) // Giả định Role entity có phương thức getName()
                .collect(Collectors.toSet());
    }
}
