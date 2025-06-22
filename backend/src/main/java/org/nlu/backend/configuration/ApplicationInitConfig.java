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
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean(name = "applicationRunner1")
    ApplicationRunner applicationRunner1(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role role = Role.builder()
                        .name("ADMIN")
                        .build();
                roleRepository.save(role);
            }
            if (roleRepository.findByName("STUDENT").isEmpty()) {
                Role role = Role.builder()
                        .name("STUDENT")
                        .build();
                roleRepository.save(role);
            }
            if (roleRepository.findByName("SELLER").isEmpty()) {
                Role role = Role.builder()
                        .name("SELLER")
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
    @DependsOn("applicationRunner1")
    ApplicationRunner applicationRunner2(UserRepository userRepository, RoleRepository roleRepository) {
        var roles = new HashSet<Role>();
        return args -> {
            if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
                Role adminRole = roleRepository.findByName("ADMIN")
                        .orElseThrow(() -> new RuntimeException("Role not found"));

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
            if (userRepository.findByEmail("seller@seller.com").isEmpty()) {
                Role sellerRole = roleRepository.findByName("SELLER")
                        .orElseThrow(() -> new RuntimeException("Role not found"));

                roles.add(sellerRole);

                User user = User.builder()
                        .email("seller@seller.com")
                        .password(passwordEncoder.encode("seller"))
                        .fullName("seller")
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("seller user has been created with default password: seller, please change it");

            }
        };
    }

}
