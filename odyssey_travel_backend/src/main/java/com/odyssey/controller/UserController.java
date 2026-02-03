package com.odyssey.controller;

import java.util.List;


import com.odyssey.dto.UserCreateRequestDto;
import com.odyssey.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;


import com.odyssey.entity.Role;
import com.odyssey.entity.User;
import com.odyssey.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // create user api
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserCreateRequestDto userCreateRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.createUser(userCreateRequestDto));
    }

    // get all user api
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());

    }

    // get user by id api
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // UPDATE USER STATUS (BLOCK/UNBLOCK)
    @PutMapping("/{id}/block")
    public ResponseEntity<UserResponseDto> updateStatus(@PathVariable Long id, @RequestParam boolean blocked) {
        // blocked=true means active=false
        return ResponseEntity.ok(userService.updateUserStatus(id, !blocked));
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserResponseDto>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.getUsersByRole(Role.valueOf(role.toUpperCase())));
    }

    //for agent
    @PostMapping("/{id}/status/{active}")
    public ResponseEntity<String> updateUserStatus(@PathVariable Long id, @PathVariable boolean active) {
        userService.updateUserStatus(id, active);
        return ResponseEntity.ok("User status updated to: " + (active ? "ACTIVE" : "INACTIVE"));
    }
}
