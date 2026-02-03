package com.odyssey.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "support_tickets")
public class SupportTicket {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long ticketId;
 
 @ManyToOne
 @JoinColumn(name = "user_id" , nullable = false)
 private User user;
 
 @ManyToOne
 @JoinColumn(name = "booking_id")
 private Booking booking;
 
 private String subject;
 
 @Column(length = 500)
 private String description;
 
 @Enumerated(EnumType.STRING)
 private SupportTicketStatus status;
 
 @Enumerated(EnumType.STRING)
 private Priority priority;
 
 private LocalDateTime createdAt;
 
 private LocalDateTime lastUpdatedAt;
}

