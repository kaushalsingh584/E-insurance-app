package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monocept.entity.Scheme;
import com.monocept.entity.SchemeDetail;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.SchemeDetailsRepository;
import com.monocept.repository.SchemeRepository;


@Service
public class SchemeDetailsServiceImpl implements ISchemeDetailsService {

	@Autowired
	private SchemeDetailsRepository detailRepo;
	
	@Autowired
	private SchemeRepository schemeRepo;
	
	@Override
	public SchemeDetail save(int id,SchemeDetail schemeDetails) {
		  Scheme scheme = schemeRepo.findById(id).get();
		  scheme.setDetails(schemeDetails);
//		  PolicyDetails.setPolicy(policy);
		  SchemeDetail save = detailRepo.save(schemeDetails);
		  schemeRepo.save(scheme);
		  return save;
	}

	@Override
	public List<SchemeDetail> getAllSchemeDetails(int page, int size) {
		return detailRepo.findAll();
	}

	@Override
	public SchemeDetail getSchemeDetailsById(int id) {
		Optional<SchemeDetail> schemeDetail = detailRepo.findById(id);
		if(!schemeDetail.isPresent()) {
			throw new UserNotFoundException("policyDetail with id "+id+" not found");
		}
		return schemeDetail.get();
	}

	@Override
	public SchemeDetail update(SchemeDetail PolicyDetails) {
		Optional<SchemeDetail> schemeDetail = detailRepo.findById(PolicyDetails.getDetailId());
		if(!schemeDetail.isPresent()) {
			throw new UserNotFoundException("Policy Detail with id "+PolicyDetails.getDetailId()+" not found");
		}
		SchemeDetail policyDetails2 = schemeDetail.get();
		policyDetails2.setMaxiAge(PolicyDetails.getMaxiAge());
		policyDetails2.setMiniAge(PolicyDetails.getMaxiAge());
		policyDetails2.setMaxiInvestmentTime(PolicyDetails.getMaxiInvestmentTime());
		policyDetails2.setMiniInvestmentTime(PolicyDetails.getMiniInvestmentTime());
		policyDetails2.setMiniAmount(PolicyDetails.getMiniAmount());
		policyDetails2.setMaxiAmount(PolicyDetails.getMaxiAmount());
		return detailRepo.save(policyDetails2);
	}
	
	

}
