package com.odyssey.service;

import java.util.List;

import com.odyssey.dto.SupportTicketDTO;
import com.odyssey.dto.SupportTicketResponseDTO;
import com.odyssey.entity.SupportTicketStatus;

public interface SupportTicketService {

    SupportTicketResponseDTO raiseTicket(SupportTicketDTO dto);

    List<SupportTicketResponseDTO> getTicketsByUser(Long userId);

    SupportTicketResponseDTO updateTicketStatus(
            Long ticketId,
            SupportTicketStatus status
    );

    List<SupportTicketResponseDTO> getAllTickets();

    List<SupportTicketResponseDTO> getTicketsByAgent(Long agentId);
}
