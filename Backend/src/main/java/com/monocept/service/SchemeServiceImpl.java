package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monocept.entity.InsurancePlan;
import com.monocept.entity.Scheme;
import com.monocept.entity.SchemeDetail;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.InsurancePlanRepository;
import com.monocept.repository.SchemeRepository;

@Service
public class SchemeServiceImpl implements ISchemeService {

	@Autowired
	private SchemeRepository schemeRepo;
	
	
	@Autowired
	private InsurancePlanRepository insurancePlanRepo;

	@Override
	public Scheme save(int insurancePlanId,Scheme scheme) {
		
		Optional<InsurancePlan> insurance = insurancePlanRepo.findById(insurancePlanId);
		if(!insurance.isPresent())
			throw new UserNotFoundException("insurance with id : "+insurancePlanId+" is not present");
		
		scheme.setPlan(insurance.get());
		return schemeRepo.save(scheme);
	}

	@Override
	public List<Scheme> getAllPolicy(int page, int size) {
		return schemeRepo.findAll();
	}

	@Override
	public Scheme getPolicyById(int id) {
		Optional<Scheme> policy = schemeRepo.findById(id);
		if (!policy.isPresent()) {
			throw new UserNotFoundException("Policy with id " + id + " not found");
		}
		return policy.get();
	}

	@Override
	public Scheme update(Scheme scheme) {
		Optional<Scheme> policy = schemeRepo.findById(scheme.getSchemeId());
		if (!policy.isPresent()) {
			throw new UserNotFoundException("Policy with id " + scheme.getSchemeId() + " not found");
		}
		Scheme policy2 = policy.get();
		policy2.setDescription(scheme.getDescription());
		policy2.setDetails(scheme.getDetails());
		policy2.setImageData(scheme.getImageData());
		policy2.setInstallmentCommission(scheme.getInstallmentCommission());
		policy2.setNewRegisterCommission(scheme.getNewRegisterCommission());
		policy2.setPlan(scheme.getPlan());
		policy2.setName(scheme.getName());
		policy2.setStatus(scheme.isStatus());
		return schemeRepo.save(policy2);
	}
	
	@Override
	public List<String> getAllSchemeName() {
		return schemeRepo.findAllSchemeName();
	}



	@Override
	public Scheme updateDetails(int id, SchemeDetail details) {
		Optional<Scheme> policyById = schemeRepo.findById(id);
		if(!policyById.isPresent()) {
			throw new UserNotFoundException("Policy with id "+id+" not found");
		}
		Scheme policy = policyById.get();
		policy.setDetails(details);
		return schemeRepo.save(policy);
	}
//
//	@Override
//	public List<Scheme> getByInsurancePlan(int id) {
//		// TODO Auto-generated method stub
//		return schemeRepo.findByInsurancePlan;
//	}

	@Override
	public void deleteById(int id) {
		// TODO Auto-generated method stub
		Optional<Scheme> scheme = schemeRepo.findById(id);
		if (!scheme.isPresent()) {
			throw new UserNotFoundException("Policy with id " + id + " not found");
		}
		boolean prevStatus = scheme.get().isStatus();
		if( prevStatus == true)
			scheme.get().setStatus(false);
		else
			scheme.get().setStatus(true);
		schemeRepo.save(scheme.get());
		
	}
}
