package com.odyssey.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.odyssey.dto.BookingRequestDTO;
import com.odyssey.dto.BookingResponseDto;
import com.odyssey.dto.CompanionDTO;
import com.odyssey.entity.Booking;
import com.odyssey.entity.BookingStatus;
import com.odyssey.entity.Payment;
import com.odyssey.entity.TravelPackage;
import com.odyssey.entity.User;
import com.odyssey.entity.TravellersDetails;
import com.odyssey.repository.BookingRepository;
import com.odyssey.repository.PaymentRepository;
import com.odyssey.repository.TravelPackageRepository;
import com.odyssey.repository.UserRepository;
import com.odyssey.repository.TravellersDetailsRepository;
import com.odyssey.service.BookingService;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TravelPackageRepository travelPackageRepository;

	@Autowired
	private TravellersDetailsRepository travellersDetailsRepository;

	@Override
	public void createBooking(BookingRequestDTO bookingRequest) {
		User user = userRepository.findById(bookingRequest.getUserId())
				.orElseThrow(() -> new RuntimeException("User not found"));

		// 2. Get Package
		TravelPackage travelPackage = travelPackageRepository.findById(bookingRequest.getPackageId())
				.orElseThrow(() -> new RuntimeException("Package not found"));

		// 3. Create Booking
		Booking booking = new Booking();
		booking.setUser(user);
		booking.setTravelPackage(travelPackage);
		booking.setTravelDate(bookingRequest.getTravelDate());
		booking.setTravelers(bookingRequest.getTravelers());
		booking.setBookingStatus(BookingStatus.CONFIRMED);

		// New Fields
		booking.setContactFullName(bookingRequest.getContactFullName());
		booking.setContactEmail(bookingRequest.getContactEmail());
		booking.setContactNumber(bookingRequest.getContactNumber());
		booking.setSpecialRequest(bookingRequest.getSpecialRequest());

		bookingRepository.save(booking);

		// 4. Save Travellers (Companions)
		if (bookingRequest.getCompanions() != null) {
			bookingRequest.getCompanions().forEach(companionDto -> {
				TravellersDetails companion = new TravellersDetails();
				companion.setFullName(companionDto.getFullName());
				companion.setAge(companionDto.getAge());
				companion.setGender(companionDto.getGender());
				companion.setRelation(companionDto.getRelation());
				companion.setBooking(booking);
				travellersDetailsRepository.save(companion);
			});
		}

		// 5. Create Payment
		Payment payment = new Payment();
		payment.setAmount(bookingRequest.getTotalAmount());
		payment.setPaymentStatus("PAID");
		payment.setBooking(booking);

		booking.setPayment(payment); // Set bidirectional relationship

		paymentRepository.save(payment);
	}

	@Override
	public List<BookingResponseDto> getAllBookings(Long userId) {
		List<Booking> bookings = bookingRepository.findByUser_Id(userId);

		return bookings.stream().map(booking -> {
			BookingResponseDto dto = new BookingResponseDto();
			dto.setBookingId(booking.getBookingId());
			dto.setPackageTitle(booking.getTravelPackage().getTitle());
			// Assuming there's a booking date field or using travelDate as placeholder if
			// not present
			// booking.getBookingDate() if exists, else travelDate
			dto.setTravelDate(booking.getTravelDate());
			dto.setStatus(booking.getBookingStatus());
			dto.setTravelers(booking.getTravelers());
			if (booking.getPayment() != null) {
				dto.setTotalAmount(booking.getPayment().getAmount());
			}

			// Get contact details
			dto.setContactFullName(booking.getContactFullName());
			dto.setContactEmail(booking.getContactEmail());
			dto.setContactNumber(booking.getContactNumber());
			dto.setSpecialRequest(booking.getSpecialRequest());

			// Map companions
			List<CompanionDTO> companions = booking.getCompanionDetails().stream().map(c -> {
				CompanionDTO cDto = new CompanionDTO();
				cDto.setFullName(c.getFullName());
				cDto.setAge(c.getAge());
				cDto.setGender(c.getGender());
				cDto.setRelation(c.getRelation());
				return cDto;
			}).collect(Collectors.toList());

			dto.setCompanions(companions);
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public List<BookingResponseDto> getAgentBookings(Long agentId) {
		List<Booking> bookings = bookingRepository.findByTravelPackage_Agent_Id(agentId);

		return bookings.stream().map(booking -> {
			BookingResponseDto dto = new BookingResponseDto();
			dto.setBookingId(booking.getBookingId());
			dto.setPackageTitle(booking.getTravelPackage().getTitle());
			dto.setTravelDate(booking.getTravelDate());
			dto.setStatus(booking.getBookingStatus());
			dto.setTravelers(booking.getTravelers());
			if (booking.getPayment() != null) {
				dto.setTotalAmount(booking.getPayment().getAmount());
			}
			dto.setContactFullName(booking.getContactFullName());
			dto.setContactEmail(booking.getContactEmail());
			dto.setContactNumber(booking.getContactNumber());
			dto.setSpecialRequest(booking.getSpecialRequest());

			List<CompanionDTO> companions = booking.getCompanionDetails().stream().map(c -> {
				CompanionDTO cDto = new CompanionDTO();
				cDto.setFullName(c.getFullName());
				cDto.setAge(c.getAge());
				cDto.setGender(c.getGender());
				cDto.setRelation(c.getRelation());
				return cDto;
			}).collect(Collectors.toList());

			dto.setCompanions(companions);
			return dto;
		}).collect(Collectors.toList());
	}

}
