package org.nlu.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
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
