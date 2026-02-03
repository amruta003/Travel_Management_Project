package com.odyssey.service;

import java.util.List;

import com.odyssey.dto.BookingRequestDTO;
import com.odyssey.dto.BookingResponseDto;

public interface BookingService {

	void createBooking(BookingRequestDTO bookingRequest);
    
	List<BookingResponseDto> getAllBookings(Long userId);

	List<BookingResponseDto> getAgentBookings(Long agentId);

}
