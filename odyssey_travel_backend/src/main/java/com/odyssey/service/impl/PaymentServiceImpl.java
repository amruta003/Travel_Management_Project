package com.odyssey.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.odyssey.dto.PaymentRequestDTO;
import com.odyssey.entity.Payment;
import com.odyssey.service.PaymentService;


@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Override
	public Payment savePaymentDetails(PaymentRequestDTO payment) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PaymentRequestDTO getPaymentDetails(Long PaymentID, Long UserID) {
		// TODO Auto-generated method stub
		return null;
	}

}
