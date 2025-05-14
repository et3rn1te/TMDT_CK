package org.nlu.backend.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.request.RoleRequest;
import org.nlu.backend.dto.response.RoleResponse;
import org.nlu.backend.entity.Role;
import org.nlu.backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {

    RoleRepository roleRepository;

    public RoleResponse createRole(RoleRequest request) {
        if (roleRepository.existsByName(request.getName())) {
            throw new RuntimeException("Role existed");
        }

        Role role = new Role();
        role.setName(request.getName());
        Role role1 = roleRepository.save(role);

        return RoleResponse.builder()
                .id(role1.getId())
                .name(role1.getName())
                .build();
    }

}
