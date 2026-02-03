package com.odyssey.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.odyssey.entity.Role;
import com.odyssey.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User getReferenceById(Long agentId);

	java.util.List<User> findByRole(Role role);
    Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);


}
