package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.RoleRequest;
import org.nlu.backend.dto.response.RoleResponse;
import org.nlu.backend.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {

    RoleService roleService;

    @PostMapping
    ResponseEntity<ApiResponse<RoleResponse>> createRole(@RequestBody RoleRequest request) {
        ApiResponse apiResponse = ApiResponse.builder()
                .data(roleService.createRole(request))
                .build();

        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping
    String test() {
        return "test";
    }

}
