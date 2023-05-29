package com.monocept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.PurchasedInsurance;
import com.monocept.service.IPurchasedInsuranceService;

@RestController
@RequestMapping("/purchasedinsurance")
public class PurchasedInsuanceController {
	
	@Autowired
	private IPurchasedInsuranceService service;
	
	@PostMapping("/buyInsurance/{username}/{schemeid}")
	public PurchasedInsurance save(@PathVariable String username,@PathVariable int schemeid,@RequestBody PurchasedInsurance purchasedInsurance) {
		return service.save(username,schemeid,purchasedInsurance);
	}
	
	@GetMapping("/getall")
	public List<PurchasedInsurance> getAllPurchasedInsurance(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllPurchasedInsurance(page,size);
	}
	
	@GetMapping("/{id}")
	public PurchasedInsurance getById(@PathVariable int id) {
		return service.getPurchasedInsuranceById(id);
	}
	
	@GetMapping("/findbyusername/{username}")
	public List<PurchasedInsurance> getByUsername(@PathVariable String username) {
		return service.getPurchasedInsuranceByUsername(username);
	}
	
	@PutMapping("/update/{username}/{schemeid}")
	public PurchasedInsurance update(@PathVariable String username,@PathVariable int schemeid,@RequestBody PurchasedInsurance purchasedInsurance) {
		return service.save(username,schemeid,purchasedInsurance);
	}
	
	@DeleteMapping("/delete/{accountNumber}")
	public String delete(@PathVariable int accountNumber) {
		return service.delete(accountNumber);
	}
	
//	@PostMapping("/crd/save")
//	public PurchasedInsurance update(@RequestBody PurchasedInsurance purchasedInsurance) {
//		return service.saveInsurance(purchasedInsurance);
//	}
//	

}
