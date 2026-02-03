package com.odyssey.service;

import com.odyssey.dto.PaymentRequestDTO;
import com.odyssey.entity.Payment;

public interface PaymentService {

	Payment savePaymentDetails(PaymentRequestDTO payment);
	PaymentRequestDTO getPaymentDetails(Long PaymentID,Long UserID);
}
