package com.odyssey.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.odyssey.dto.TravelPackageDto;
import com.odyssey.entity.Status;
import com.odyssey.entity.TravelPackage;
import com.odyssey.service.TravelPackageService;

@RestController
@RequestMapping("/api/packages")
public class TravelPackageController {

	@Autowired
	private TravelPackageService travelService;

	@Autowired
	private Cloudinary cloudinary;

	private final ObjectMapper objectmapper = new ObjectMapper();

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> createPackage(@RequestPart("data") String travelPackage,
			@RequestPart("image") MultipartFile image) {
		System.out.println("DATA = " + travelPackage);
		System.out.println("FILE = " + image.getOriginalFilename());
		TravelPackageDto travelpackage;
		try {
			// Convert JSON string to DTO
			travelpackage = objectmapper.readValue(travelPackage, TravelPackageDto.class);

			// Upload image to Cloudinary
			Map uploadResult = cloudinary.uploader().upload(
					image.getBytes(),
					ObjectUtils.asMap(
							"folder", "odyssey/packages",
							"resource_type", "image"));

			// Get Cloudinary URL
			String imageUrl = (String) uploadResult.get("secure_url");
			System.out.println("Cloudinary URL: " + imageUrl);

			travelService.savePackage(travelpackage, imageUrl);
			return ResponseEntity.ok("Package submitted for admin approval");
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.status(500).body("Error: " + e.getMessage());
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<TravelPackage> getTravelPackageById(@PathVariable Long id) {
		TravelPackage travelPackage = travelService.findPackageById(id);
		return ResponseEntity.ok(travelPackage);
	}

	@GetMapping("/agent/{agentId}")
	public ResponseEntity<List<TravelPackage>> getPackagesByAgentId(@PathVariable Long agentId) {
		return ResponseEntity.ok(travelService.getPackagesByAgentId(agentId));
	}

	@GetMapping
	public ResponseEntity<List<TravelPackage>> getAllApprovedPackages() {
		// Only show Approved packages from Active Agents
		return ResponseEntity.ok(travelService.getPackagesByStatusAndAgentActive(Status.APPROVED));
	}

	@GetMapping("/admin/pending")
	public ResponseEntity<List<TravelPackage>> getPendingPackages() {
		return ResponseEntity.ok(travelService.getPackagesByStatus(Status.PENDING));
	}

	@PostMapping("/{id}/status/{status}")
	public ResponseEntity<String> updatePackageStatus(@PathVariable Long id, @PathVariable String status) {
		travelService.updatePackageStatus(id, status);
		return ResponseEntity.ok("Status updated: " + status);
	}

	@GetMapping("/{imageUrl}")
	public ResponseEntity<String> getPackageImage(@PathVariable Long id) {
		TravelPackage pkg = travelService.findPackageById(id);
		return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_JPEG)
				.body(pkg.getImageUrl());
	}

}
