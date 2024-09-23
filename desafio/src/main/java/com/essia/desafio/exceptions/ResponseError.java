package com.essia.desafio.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ResponseError {

    private final String message;
    private final HttpStatus status;
    private final Integer statusCode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
    private final LocalDateTime time;

    private final String details;

    public ResponseError(String message, HttpStatus httpStatus, Integer statusCode, LocalDateTime time, String details) {
        this.message = message;
        this.status = httpStatus;
        this.statusCode = statusCode;
        this.time = time;
        this.details = details;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public String getDetails() {
        return details;
    }
}
