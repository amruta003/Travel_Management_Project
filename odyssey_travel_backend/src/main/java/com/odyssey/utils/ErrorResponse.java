package com.odyssey.utils;

public record ErrorResponse(
        String message,
        int status
) {
}
