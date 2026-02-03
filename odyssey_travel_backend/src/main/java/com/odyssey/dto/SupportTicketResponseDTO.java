package com.odyssey.dto;

import java.time.LocalDateTime;

import com.odyssey.entity.Priority;
import com.odyssey.entity.SupportTicketStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicketResponseDTO {

    private Long ticketId;
    private String subject;
    private String description;
    private SupportTicketStatus status;
    private Priority priority;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private Long userId;
    private Long bookingId;
    private String packageTitle;
}
