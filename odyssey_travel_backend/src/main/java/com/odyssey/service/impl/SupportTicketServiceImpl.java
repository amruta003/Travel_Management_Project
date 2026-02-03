package com.odyssey.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odyssey.dto.SupportTicketDTO;
import com.odyssey.dto.SupportTicketResponseDTO;
import com.odyssey.entity.Booking;
import com.odyssey.entity.Priority;
import com.odyssey.entity.SupportTicket;
import com.odyssey.entity.SupportTicketStatus;
import com.odyssey.entity.User;
import com.odyssey.repository.BookingRepository;
import com.odyssey.repository.SupportTicketRepository;
import com.odyssey.repository.UserRepository;
import com.odyssey.service.SupportTicketService;

@Service
public class SupportTicketServiceImpl implements SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // ===================== RAISE TICKET =====================
    @Override
    public SupportTicketResponseDTO raiseTicket(SupportTicketDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = dto.getBookingId() != null
                ? bookingRepository.findById(dto.getBookingId()).orElse(null)
                : null;

        SupportTicket ticket = new SupportTicket();
        ticket.setUser(user);
        ticket.setBooking(booking);
        ticket.setSubject(dto.getSubject());
        ticket.setDescription(dto.getDescription());
        ticket.setPriority(dto.getPriority());
        ticket.setStatus(SupportTicketStatus.OPEN);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setLastUpdatedAt(LocalDateTime.now());

        SupportTicket saved = supportTicketRepository.save(ticket);
        return mapToDTO(saved);
    }

    // ===================== GET USER TICKETS =====================
    @Override
    public List<SupportTicketResponseDTO> getTicketsByUser(Long userId) {
        return supportTicketRepository.findByUser_Id(userId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ===================== UPDATE STATUS =====================
    @Override
    public SupportTicketResponseDTO updateTicketStatus(
            Long ticketId,
            SupportTicketStatus status
    ) {

        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setStatus(status);
        ticket.setLastUpdatedAt(LocalDateTime.now());

        SupportTicket updated = supportTicketRepository.save(ticket);
        return mapToDTO(updated);
    }

    @Override
    public List<SupportTicketResponseDTO> getAllTickets() {
        return supportTicketRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<SupportTicketResponseDTO> getTicketsByAgent(Long agentId) {
        // Tickets linked to this agent's packages via bookings
        return supportTicketRepository.findByBooking_TravelPackage_Agent_Id(agentId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ===================== ENTITY → DTO =====================
    private SupportTicketResponseDTO mapToDTO(SupportTicket ticket) {
        SupportTicketResponseDTO dto = new SupportTicketResponseDTO();
        dto.setTicketId(ticket.getTicketId());
        dto.setSubject(ticket.getSubject());
        dto.setDescription(ticket.getDescription());
        dto.setStatus(ticket.getStatus());
        dto.setPriority(ticket.getPriority());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setLastUpdatedAt(ticket.getLastUpdatedAt());
        
        dto.setUserId(ticket.getUser().getId());
        if (ticket.getBooking() != null) {
            dto.setBookingId(ticket.getBooking().getBookingId());
            dto.setPackageTitle(ticket.getBooking().getTravelPackage().getTitle());
        }
        
        return dto;
    }
}
