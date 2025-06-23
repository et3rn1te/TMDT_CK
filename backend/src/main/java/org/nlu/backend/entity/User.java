package org.nlu.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString(exclude = {"roles"})
@EqualsAndHashCode(exclude = {"roles"})
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String fullName;

    @Column(unique = true, nullable = false)
    String email;

    @Column(nullable = false)
    String password;

    String phone;

    String address;

    @Column(name = "google_id", unique = true)
    String googleId;

    @Column(name = "is_verified", nullable = false)
    boolean isVerified;

    @Column(name = "reset_password_token")
    String resetPasswordToken;

    @Column(name = "reset_password_expires")
    LocalDateTime resetPasswordExpires;

    @ManyToMany(fetch = FetchType.EAGER)
    Set<Role> roles;
}
