package com.odyssey.dto;

import com.odyssey.entity.Status;
import com.odyssey.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {

	 private Double amount;
	 private String paymentMethod;
}
