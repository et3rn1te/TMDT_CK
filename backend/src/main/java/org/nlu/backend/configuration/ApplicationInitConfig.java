package org.nlu.backend.configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.nlu.backend.entity.Role;
import org.nlu.backend.entity.User;
import org.nlu.backend.repository.RoleRepository;
import org.nlu.backend.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner2(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role role = Role.builder()
                        .name("ADMIN")
                        .build();
                roleRepository.save(role);
            }
            if (roleRepository.findByName("USER").isEmpty()) {
                Role role = Role.builder()
                        .name("USER")
                        .build();
                roleRepository.save(role);
            }
        };
    }

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
                Role adminRole = roleRepository.findByName("ADMIN")
                        .orElseThrow(() -> new RuntimeException("Role not found"));

                var roles = new HashSet<Role>();
                roles.add(adminRole);

                User user = User.builder()
                        .email("admin@admin.com")
                        .password(passwordEncoder.encode("admin"))
                        .fullName("admin")
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("admin user has been created with default password: admin, please change it");

            }
        };
    }

}
