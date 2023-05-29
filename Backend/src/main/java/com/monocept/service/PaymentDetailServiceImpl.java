package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monocept.entity.PaymentDetail;
import com.monocept.entity.PurchasedInsurance;
import com.monocept.exception.EntityNotFoundException;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.PaymentDetailRepository;
import com.monocept.repository.PurchasedInsuranceRepository;

@Service
public class PaymentDetailServiceImpl implements IPaymentService {

	
	@Autowired
	private PaymentDetailRepository paymentDetailRepo;
	
	@Autowired
	private PurchasedInsuranceRepository purchaseInsuranceRepo;
	
	@Override
	public PaymentDetail save(int purchasedInsuranceId, PaymentDetail paymentDetail) {
		// TODO Auto-generated method stub
		Optional<PurchasedInsurance> purchasedInsurance = purchaseInsuranceRepo.findById(purchasedInsuranceId);
		if(!purchasedInsurance.isPresent())
			throw new UserNotFoundException("No insurance is purchased with id: "+ purchasedInsuranceId);
		
		if(purchasedInsurance.get().getTotalPremiumLeft() <= 0 )
			throw new EntityNotFoundException("whole payemnt is already made");
		
		double amount = (purchasedInsurance.get().getTotalPremiumLeft() - paymentDetail.getAmount());
		 purchasedInsurance.get().setTotalPremiumLeft(amount);
		 
		 purchaseInsuranceRepo.save(purchasedInsurance.get());
		paymentDetail.setPurchasedInsurance(purchasedInsurance.get());
		
		 PaymentDetail save = paymentDetailRepo.save(paymentDetail);
		
		 
		 return save;
	}

	@Override
	public List<PaymentDetail> getAllPayment(int page, int size) {
		// TODO Auto-generated method stub
		return paymentDetailRepo.findAll();
	}

	@Override
	public List<PaymentDetail> getPaymentByPurchasedInsuranceId(int id) {
		// TODO Auto-generated method stub
		 Optional<PurchasedInsurance> purchasedInsurance = purchaseInsuranceRepo.findById(id);
		 List<PaymentDetail> payment = purchasedInsurance.get().getPayment();
		 return payment;
	}


}
