package com.odyssey.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.odyssey.dto.TravelPackageDto;
import com.odyssey.entity.Status;
import com.odyssey.entity.TravelPackage;

public interface TravelPackageService {

    TravelPackage findPackageById(Long id);

    // for admin
    List<TravelPackage> getAllPackages();

    // admin will approve travel packages
    List<TravelPackage> getPackagesByStatus(Status status);

    // user will be able to see only approved and active agents travel packages
    List<TravelPackage> getPackagesByStatusAndAgentActive(Status status);

    // agent will be able to see only their travel packages
    List<TravelPackage> getPackagesByAgentId(Long agentId);

    Optional<TravelPackage> getPackageById(Long id);

    // for updating approved status
    void updatePackageStatus(Long id, String status);

    // for saving travel package
	void savePackage(TravelPackageDto travelpackage, String imageUrl);

}
