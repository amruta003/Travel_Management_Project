package com.odyssey.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.odyssey.dto.SupportTicketDTO;
import com.odyssey.dto.SupportTicketResponseDTO;
import com.odyssey.entity.Priority;
import com.odyssey.entity.SupportTicketStatus;
import com.odyssey.service.SupportTicketService;

@RestController
@RequestMapping("/api/support")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

    // Raise ticket (User / Agent)
    @PostMapping
    public ResponseEntity<SupportTicketResponseDTO> raiseTicket(
            @RequestBody SupportTicketDTO dto) {

        return ResponseEntity.ok(
                supportTicketService.raiseTicket(dto)
        );
    }

    // User / Agent dashboard
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupportTicketResponseDTO>> getUserTickets(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                supportTicketService.getTicketsByUser(userId)
        );
    }

    // Admin : update ticket status
    @PutMapping("/{ticketId}/status/{status}")
    public ResponseEntity<SupportTicketResponseDTO> updateStatus(
            @PathVariable Long ticketId,
            @PathVariable SupportTicketStatus status) {

        return ResponseEntity.ok(
                supportTicketService.updateTicketStatus(ticketId, status)
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<SupportTicketResponseDTO>> getAllTickets() {
        return ResponseEntity.ok(supportTicketService.getAllTickets());
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<List<SupportTicketResponseDTO>> getAgentTickets(
            @PathVariable Long agentId) {
        return ResponseEntity.ok(supportTicketService.getTicketsByAgent(agentId));
    }
}
