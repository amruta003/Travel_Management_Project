package com.odyssey.service;

import java.util.List;

import com.odyssey.dto.UserCreateRequestDto;
import com.odyssey.dto.UserResponseDto;
import com.odyssey.entity.Role;
import com.odyssey.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;


public interface UserService {

    List<UserResponseDto> getAllUsers();

    UserResponseDto createUser(UserCreateRequestDto userCreateRequestDto);

    UserResponseDto getUserById(Long userId);

	List<UserResponseDto> getUsersByRole(Role role);

    UserResponseDto updateUserStatus(Long userId, boolean active);

}
