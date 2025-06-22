package org.nlu.backend.repository;

import org.nlu.backend.entity.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    public Optional<OtpToken> findByEmailAndOtp(String email, String otp);
}
