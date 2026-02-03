package com.odyssey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.odyssey.entity.TravellersDetails;

@Repository
public interface TravellersDetailsRepository extends JpaRepository<TravellersDetails, Long> {
}
