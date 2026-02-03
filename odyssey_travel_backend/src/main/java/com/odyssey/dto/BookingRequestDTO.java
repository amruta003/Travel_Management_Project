package com.odyssey.dto;

import java.time.LocalDate;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

    private Long userId;
    private Long packageId;
    private LocalDate travelDate;
    private int travelers;
    private Double totalAmount;
    private PaymentRequestDTO payment;

    private String contactFullName;
    private String contactEmail;
    private String contactNumber;
    private String specialRequest;
    private List<CompanionDTO> companions;
}
