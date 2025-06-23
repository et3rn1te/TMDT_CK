package org.nlu.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    JWT_ERROR(9998, "JWT Error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid message key", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1002, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003, "You do not have permission", HttpStatus.FORBIDDEN),

    EMAIL_EXISTED(1004, "Email already existed", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1005, "Email not existed", HttpStatus.NOT_FOUND),
    ROLE_EXISTED(1006, "Role already existed", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1007, "Role not existed", HttpStatus.NOT_FOUND),
    INVALID_PASSWORD(1008, "Invalid password", HttpStatus.BAD_REQUEST),
    LEVEL_EXISTED(1009, "Level already existed", HttpStatus.BAD_REQUEST),
    LEVEL_NOT_EXISTED(1010, "Level not existed", HttpStatus.NOT_FOUND),
    CATEGORY_EXISTED(1011, "Category already existed", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_EXISTED(1012, "Category not existed", HttpStatus.NOT_FOUND),
    COURSE_NOT_FOUND(1013, "Course not existed", HttpStatus.NOT_FOUND),
    COURSE_EXISTED(1014, "Course already existed", HttpStatus.NOT_FOUND),
    USER_NOT_FOUND(1015, "User not exist", HttpStatus.NOT_FOUND),
    ALREADY_ENROLLED(1016, "User already enrolled", HttpStatus.CONFLICT),
    ACCESS_DENIED(1017, "Access denied", HttpStatus.FORBIDDEN),
    INVALID_COURSE_STATUS(1018, "Invalid course status", HttpStatus.BAD_REQUEST),
    PERMISSION_DENIED(1019, "Permission denied", HttpStatus.FORBIDDEN),
    OTP_NOT_VALID(1020, "OTP not valid", HttpStatus.BAD_REQUEST),
    OTP_IS_USED(1021, "OTP is used", HttpStatus.BAD_REQUEST),
    OTP_IS_EXPIRY(10019, "OTP is no longer to used", HttpStatus.BAD_REQUEST),
    LESSON_NOT_FOUND(1022, "Lesson not found", HttpStatus.NOT_FOUND),
    INVALID_LESSON_ORDER(1023, "Invalid lesson order", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(1024, "Order not found", HttpStatus.NOT_FOUND),
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
