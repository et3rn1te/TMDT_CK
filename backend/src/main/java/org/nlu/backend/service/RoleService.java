package org.nlu.backend.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.request.RoleRequest;
import org.nlu.backend.dto.response.RoleResponse;
import org.nlu.backend.entity.Role;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {

    RoleRepository roleRepository;

    public RoleResponse createRole(RoleRequest request) {
        if (roleRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROLE_EXISTED);
        }

        Role role = new Role();
        role.setName(request.getName());
        Role role1 = roleRepository.save(role);

        return RoleResponse.builder()
                .id(role1.getId())
                .name(role1.getName())
                .build();
    }

    public List<RoleResponse> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        List<RoleResponse> roleResponses = new ArrayList<>();
        for (Role role : roles) {
            RoleResponse r = RoleResponse.builder()
                    .name(role.getName())
                    .build();
            roleResponses.add(r);
        }
        return roleResponses;
    }

}
