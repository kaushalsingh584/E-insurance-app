package com.monocept.service;

import java.util.List;

import com.monocept.entity.PurchasedInsurance;

public interface IPurchasedInsuranceService {

	

	List<PurchasedInsurance> getAllPurchasedInsurance(int page, int size);

	PurchasedInsurance getPurchasedInsuranceById(int id);

	PurchasedInsurance update(PurchasedInsurance purchasedInsurance);

	PurchasedInsurance save(String username, int schemeid, PurchasedInsurance purchasedInsurance);

	List<PurchasedInsurance> getPurchasedInsuranceByUsername(String username);

	String delete(int schemeid);


}
