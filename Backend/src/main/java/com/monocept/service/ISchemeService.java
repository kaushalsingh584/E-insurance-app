package com.monocept.service;

import java.util.List;

import com.monocept.entity.Scheme;
import com.monocept.entity.SchemeDetail;

public interface ISchemeService {

	public Scheme save(int insuranceplanid, Scheme policy);
	public List<Scheme> getAllPolicy(int page,int size);
	public Scheme getPolicyById(int id);
	public Scheme update(Scheme policy);
	public void deleteById(int id);
	public Scheme updateDetails(int id, SchemeDetail details);
//	public List<Scheme> getByInsurancePlan(int id);
	List<String> getAllSchemeName();
}
