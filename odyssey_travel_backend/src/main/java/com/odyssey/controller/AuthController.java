package com.odyssey.controller;


import com.odyssey.dto.LoginRequestDTO;
import jakarta.validation.*;
import com.odyssey.dto.UserCreateRequestDto;
import com.odyssey.dto.UserResponseDto;
import com.odyssey.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@RequestBody UserCreateRequestDto userCreateRequestDto) {
        System.out.println(userCreateRequestDto.toString());
        return  ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userCreateRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> loginUser( @RequestBody LoginRequestDTO loginRequestDTO) {
        return  ResponseEntity.status(HttpStatus.OK).body(authService.loginUser(loginRequestDTO));
    }

}
