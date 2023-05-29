package com.monocept.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.monocept.entity.PurchasedInsurance;
import com.monocept.service.IPurchasedInsuranceService;

public interface PurchasedInsuranceRepository extends JpaRepository<PurchasedInsurance, Integer>{

	// gives only a single record consider it
	
	@Query("select a from PurchasedInsurance a where a.customer.user.username = :username")
	List<PurchasedInsurance> findAllByCustomerUsername(String username);

	

}
