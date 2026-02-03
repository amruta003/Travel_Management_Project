package com.odyssey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.odyssey.entity.Status;
import com.odyssey.entity.TravelPackage;

@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {

	List<TravelPackage> findByStatus(Status status);

	List<TravelPackage> findByStatusAndAgent_ActiveTrue(Status status);

	List<TravelPackage> findByAgent_Id(Long agentId);

}
