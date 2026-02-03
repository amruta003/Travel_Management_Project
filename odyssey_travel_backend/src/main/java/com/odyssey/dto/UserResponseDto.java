package com.odyssey.dto;

import com.odyssey.entity.Provider;

import com.odyssey.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private long id;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;

    private Provider provider;

    private boolean active;
}
