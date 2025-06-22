package org.nlu.backend.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.nlu.backend.dto.request.auth.AuthenticationRequest;
import org.nlu.backend.dto.request.auth.ForgotPasswordRequest;
import org.nlu.backend.dto.request.auth.NewPasswordRequest;
import org.nlu.backend.dto.response.auth.AuthenticationResponse;
import org.nlu.backend.dto.response.UserResponse;
import org.nlu.backend.dto.response.auth.ForgotPasswordResponse;
import org.nlu.backend.entity.OtpToken;
import org.nlu.backend.entity.User;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.mapper.UserMapper;
import org.nlu.backend.repository.OtpTokenRepository;
import org.nlu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Random;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    OtpTokenRepository otpTokenRepository;
    EmailService emailService;
    private final UserMapper userMapper;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGN_KEY;

    @NonFinal
    @Value("${valid-duration}")
    protected long VALID_DURATION;

    public AuthenticationResponse authenicate(AuthenticationRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated)
            throw new AppException(ErrorCode.INVALID_PASSWORD);

        var token = generateToken(user);

        UserResponse userResponse = userMapper.toUserResponse(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .user(userResponse)
                .build();
    }


    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);

        MACVerifier verifier = new MACVerifier(SIGN_KEY.getBytes());

        //check date
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        // verified
        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    public String generateToken(User user) {
        //header
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        //claimset
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("org.nlu.english_course")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();

        //object
        SignedJWT signedJWT = new SignedJWT(jwsHeader, jwtClaimsSet);

        try {
            signedJWT.sign(new MACSigner(SIGN_KEY.getBytes()));
            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.JWT_ERROR);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
            });
        }
        return stringJoiner.toString();
    }

    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        String otp = String.format("%06d", new Random().nextInt(999999)); // generate OTP

        OtpToken token = OtpToken.builder()
                .email(user.getEmail())
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .used(false)
                .build();
        otpTokenRepository.save(token);

        emailService.sendMail(request.getEmail(), "Mã OTP đặt lại mật khẩu",
                "Mã OTP của bạn là: " + otp + " có hiệu lực trong 5 phút!");

        return ForgotPasswordResponse.builder()
                .message("Email sent")
                .build();
    }

    public String verifyOtp(String email, String otp) {
        OtpToken otpToken = otpTokenRepository.findByEmailAndOtp(email, otp)
                .orElseThrow(() -> new AppException(ErrorCode.OTP_NOT_VALID));

        if (otpToken.isUsed())
            throw new AppException(ErrorCode.OTP_IS_USED);

        if (otpToken.getExpiryTime().isBefore(LocalDateTime.now()))
            throw new AppException(ErrorCode.OTP_IS_EXPIRY);

        otpToken.setUsed(true);
        otpTokenRepository.save(otpToken);

        return otpToken.getEmail();
    }

    public UserResponse newPassword(NewPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }
}
