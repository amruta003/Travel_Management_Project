package com.odyssey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.odyssey.dto.BookingRequestDTO;
import com.odyssey.service.BookingService;
import com.odyssey.dto.BookingResponseDto;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@PostMapping
	public ResponseEntity<String> createBooking(@RequestBody BookingRequestDTO dto) {

		bookingService.createBooking(dto);
		return ResponseEntity.ok("Booking and Payment Successful");
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<BookingResponseDto>> getUserBookings(
			@PathVariable Long userId) {
		return ResponseEntity.ok(bookingService.getAllBookings(userId));
	}

	@GetMapping("/agent/{agentId}")
	public ResponseEntity<List<BookingResponseDto>> getAgentBookings(
			@PathVariable Long agentId) {
		return ResponseEntity.ok(bookingService.getAgentBookings(agentId));
	}
}
