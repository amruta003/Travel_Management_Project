package com.odyssey.service.impl;

import java.util.List;

import com.odyssey.dto.UserCreateRequestDto;
import com.odyssey.dto.UserResponseDto;
import com.odyssey.entity.Provider;
import com.odyssey.entity.Role;
import com.odyssey.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.odyssey.entity.User;
import com.odyssey.repository.UserRepository;
import com.odyssey.service.UserService;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserResponseDto createUser(UserCreateRequestDto userCreateRequestDto) {

        if (userCreateRequestDto.getEmail() == null ) {
            throw new IllegalArgumentException("Email is required");
        }

        if (userRepository.existsByEmail(userCreateRequestDto.getEmail())) {
            throw new IllegalArgumentException("User already exists");
        }

        User user = modelMapper.map(userCreateRequestDto, User.class);
        user.setProvider(Provider.LOCAL);
        user.setActive(true);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponseDto.class);
    }

    @Override
    public List<UserResponseDto> getUsersByRole(Role role) {
        return userRepository.findByRole(role).stream()
                .map( user -> modelMapper.map(user, UserResponseDto.class))
                .toList();
    }

    @Override
    public UserResponseDto updateUserStatus(Long userId, boolean active) {
        User user = userRepository.findById(userId).orElseThrow(() -> new
                ResourceNotFoundException("User not found "+userId));
        user.setActive(active);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponseDto.class);
    }

    @Override
    public UserResponseDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found "+userId));

        return modelMapper.map(user, UserResponseDto.class);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map( user -> modelMapper.map(user, UserResponseDto.class))
                .toList();
    }

}
