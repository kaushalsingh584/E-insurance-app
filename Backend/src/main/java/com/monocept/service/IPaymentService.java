package com.monocept.service;

import java.util.List;

import com.monocept.entity.PaymentDetail;

public interface IPaymentService {

	PaymentDetail save(int purchasedInsuranceId, PaymentDetail paymentDetail);

	List<PaymentDetail> getAllPayment(int page, int size);


	List<PaymentDetail> getPaymentByPurchasedInsuranceId(int id);

}
