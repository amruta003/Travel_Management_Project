package com.odyssey.dto;

import com.odyssey.entity.Priority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupportTicketDTO {
    private Long userId;
    private Long bookingId;
    private String subject;
    private String description;
    private Priority priority;
}
