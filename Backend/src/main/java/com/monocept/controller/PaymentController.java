package com.monocept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.PaymentDetail;
import com.monocept.service.IPaymentService;


@RestController
@RequestMapping("payment")
public class PaymentController {
	
	@Autowired
	private IPaymentService service;
	
	@PostMapping("/save/{purchasedInsuranceId}")
	public PaymentDetail save(@PathVariable int purchasedInsuranceId,@RequestBody PaymentDetail paymentDetail) {
		return service.save(purchasedInsuranceId,paymentDetail);
	}
	
	@GetMapping("/getall")
	public List<PaymentDetail> getAllPayment(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllPayment(page,size);
	}
	
	@GetMapping("/getbypurinsuranceid/{id}")
	public List<PaymentDetail> getById(@PathVariable int id) {
		return service.getPaymentByPurchasedInsuranceId(id);
	}
	
	
	
//	@PutMapping("/update")
//	public Payment update(@RequestBody Payment payment) {
//		return service.update(payment);
//	}

}
