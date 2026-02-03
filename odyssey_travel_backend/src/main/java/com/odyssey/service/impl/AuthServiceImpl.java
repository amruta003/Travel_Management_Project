package com.odyssey.service.impl;

import com.odyssey.dto.LoginRequestDTO;
import com.odyssey.dto.UserCreateRequestDto;
import com.odyssey.dto.UserResponseDto;
import com.odyssey.entity.User;
import com.odyssey.repository.UserRepository;
import com.odyssey.service.AuthService;
import com.odyssey.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.Converters;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserResponseDto registerUser(UserCreateRequestDto userCreateRequestDto) {
        return userService.createUser(userCreateRequestDto);
    }

    @Override
    public UserResponseDto loginUser(LoginRequestDTO loginRequestDTO) {
        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid email or password")
                );

        if(!loginRequestDTO.getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        if (loginRequestDTO.getRole() != null && !user.getRole().equals(loginRequestDTO.getRole())) {
            throw new IllegalArgumentException("Incorrect role selected for this user");
        }

        if (!user.isActive()) {
            throw new IllegalArgumentException("User account is inactive or pending approval");
        }

        return modelMapper.map(user, UserResponseDto.class);
    }


}
