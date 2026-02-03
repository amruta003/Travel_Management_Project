package com.odyssey.service;

import com.odyssey.dto.LoginRequestDTO;
import com.odyssey.dto.UserCreateRequestDto;
import com.odyssey.dto.UserResponseDto;

public interface AuthService {

    public UserResponseDto registerUser(UserCreateRequestDto userCreateRequestDto);

    public UserResponseDto loginUser(LoginRequestDTO loginRequestDTO);
}
