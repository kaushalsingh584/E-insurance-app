package com.monocept.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monocept.entity.CommissionRecord;
import com.monocept.entity.Customer;
import com.monocept.entity.PurchasedInsurance;
import com.monocept.entity.Scheme;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.CommissionRecordRepo;
import com.monocept.repository.CustomerRepository;
import com.monocept.repository.PurchasedInsuranceRepository;
import com.monocept.repository.SchemeRepository;

@Service
public class PurchasedInsuranceImpl implements IPurchasedInsuranceService {

	@Autowired
	private PurchasedInsuranceRepository purchasedInsuranceRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private SchemeRepository schemeRepo;
	
	@Autowired
	private CommissionRecordRepo commissionRepo;

	@Override
	public PurchasedInsurance save(String customerid,int schemeid, PurchasedInsurance purchasedInsurance) {
		// TODO Auto-generated method stub	
		
		Customer customer = customerRepo.findByUsername(customerid);
		if(customer == null)
			throw new UserNotFoundException("Customer with id "+customerid+" not found");
		
		Optional<Scheme> scheme = schemeRepo.findById(schemeid);
		if(!scheme.isPresent())
			throw new UserNotFoundException("Scheme with id "+schemeid+" not found");
		
		Integer duration = purchasedInsurance.getDuration();
		double profitRatio = purchasedInsurance.getProfitRatio();
		double totalPremiumAmount = purchasedInsurance.getTotalPremiumAmount();
		purchasedInsurance.setSumAssured(totalPremiumAmount+((profitRatio/100)*totalPremiumAmount));
		

		purchasedInsurance.setInstallmentAmount(totalPremiumAmount/duration);
		purchasedInsurance.setInsuranceType(scheme.get().getPlan().getInsuranceType());
		purchasedInsurance.setInsuranceScheme(scheme.get().getName());
		
		LocalDate datecreated = purchasedInsurance.getDatecreated();
		LocalDate maturitydate = datecreated.plusYears(duration);
		
//        // Get the new date with added years
        
		purchasedInsurance.setMaturityDate(maturitydate);
		purchasedInsurance.setCustomer(customer);
		purchasedInsurance.setScheme(scheme.get());
		
		
//		commissionRepo.
		
		 PurchasedInsurance save = purchasedInsuranceRepo.save(purchasedInsurance);
		 
		 double commAmount  = ((save.getTotalPremiumAmount() * scheme.get().getNewRegisterCommission())/100);
		 System.out.println("--------------date is -------------------"+LocalDate.now());
		 
		 CommissionRecord commissionRecordObj = new CommissionRecord( save.getAccountNumber(),LocalDate.now(),customerid,
				 scheme.get().getPlan().getInsuranceType(),scheme.get().getName(),
				 scheme.get().getNewRegisterCommission(),commAmount,"New Registration",customer.getAgent());
		 
		 commissionRepo.save(commissionRecordObj);
		 
		 return save;
	}

	@Override
	public List<PurchasedInsurance> getAllPurchasedInsurance(int customerid, int size) {
		// TODO Auto-generated method stub
		return purchasedInsuranceRepo.findAll();
	}

	@Override
	public PurchasedInsurance getPurchasedInsuranceById(int id) {
		// TODO Auto-generated method stub
		 Optional<PurchasedInsurance> purchasesInsurance = purchasedInsuranceRepo.findById(id);
		 if(!purchasesInsurance.isPresent())
				throw new UserNotFoundException("PurachasedInsurance with id "+id+" not found");
	
	return purchasesInsurance.get();
	}



	@Override
	public PurchasedInsurance update(PurchasedInsurance purchasedInsurance) {
		// TODO Auto-generated method stub
		return purchasedInsuranceRepo.save(purchasedInsurance);
	}

	@Override
	public List<PurchasedInsurance> getPurchasedInsuranceByUsername(String username) {
		// TODO Auto-generated method stub
		Customer customer = customerRepo.findByUsername(username);
		int customerId = customer.getCustomerId();
		
		return purchasedInsuranceRepo.findAllByCustomerUsername(username);
		
	}

	@Override
	public String delete(int accountNumber) {
		// TODO Auto-generated method stub
		 Optional<PurchasedInsurance> purchasesInsurance = purchasedInsuranceRepo.findById(accountNumber);
		 if(!purchasesInsurance.isPresent())
				throw new UserNotFoundException("PurachasedInsurance with id "+accountNumber+" not found");
		 purchasedInsuranceRepo.deleteById(accountNumber);
		 return "PurchasedInsurace with "+accountNumber+" is deleted";
	}

	

}
