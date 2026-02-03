package com.odyssey.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;

import com.odyssey.entity.BookingStatus;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto {

    private Long bookingId;
    private String packageTitle;
    private LocalDateTime bookingDate;
    private LocalDate travelDate;
    private int travelers;
    private BookingStatus status;
    private Double totalAmount;
    private String paymentMethod;

    private String contactFullName;
    private String contactEmail;
    private String contactNumber;
    private String specialRequest;
    private List<CompanionDTO> companions;
}
