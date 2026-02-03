package com.odyssey.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.odyssey.dto.TravelPackageDto;
import com.odyssey.entity.Status;
import com.odyssey.entity.TravelPackage;
import com.odyssey.entity.User;
import com.odyssey.repository.TravelPackageRepository;
import com.odyssey.repository.UserRepository;
import com.odyssey.service.TravelPackageService;

@Service
@Transactional
public class TravelPackageServiceImpl implements TravelPackageService {

	@Autowired
	private TravelPackageRepository travelRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public TravelPackage findPackageById(Long id) {
		return travelRepo.findById(id).orElseThrow(() -> new RuntimeException("Package not found"));
	}

	@Override
	public void savePackage(TravelPackageDto dto, String image) {
		// TODO Auto-generated method stub

		User agent = userRepo.findById(dto.getAgentId())
				.orElseThrow(() -> new RuntimeException("Agent not found with ID: " + dto.getAgentId()));
		 if (image == null || image.isEmpty()) {
	            throw new RuntimeException("Image is required");
	        }

	        
	            TravelPackage travelPackage = new TravelPackage();
	            travelPackage.setTitle(dto.getTitle());
	            travelPackage.setDescription(dto.getDescription());
	            travelPackage.setPrice(dto.getPrice());
            travelPackage.setDuration(dto.getDuration());
                travelPackage.setTotalTravellers(dto.getTotalTravellers());
	            travelPackage.setDestination(dto.getDestination());
	            travelPackage.setAgent(agent);
	            travelPackage.setImageUrl(image);
	            travelPackage.setStatus(Status.PENDING); // admin approval later


			travelRepo.save(travelPackage);

	}

	@Override
	public List<TravelPackage> getAllPackages() {
		// TODO Auto-generated method stub
		return travelRepo.findAll();
	}

	@Override
	public List<TravelPackage> getPackagesByStatusAndAgentActive(Status status) {
		return travelRepo.findByStatusAndAgent_ActiveTrue(status);
	}

	@Override
	public List<TravelPackage> getPackagesByAgentId(Long agentId) {
		return travelRepo.findByAgent_Id(agentId);
	}

	@Override
	public Optional<TravelPackage> getPackageById(Long id) {
		return travelRepo.findById(id);
	}

	@Override
	public void updatePackageStatus(Long id, String status) {
		TravelPackage pkg = travelRepo.findById(id).orElseThrow(() -> new RuntimeException("Package not found"));
		pkg.setStatus(Status.valueOf(status.toUpperCase()));
		travelRepo.save(pkg);
	}

	@Override
	public List<TravelPackage> getPackagesByStatus(Status status) {

		return travelRepo.findByStatus(status);
	}
}
