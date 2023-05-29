package com.monocept.service;

import java.util.List;

import com.monocept.entity.InsurancePlan;


public interface IInsurancePlanService {

	public InsurancePlan save(InsurancePlan insurancePlan);
	public List<InsurancePlan> getAllInsurancePlan(int page,int size);
	public InsurancePlan getInsurancePlanById(int id);
	public InsurancePlan update(InsurancePlan insurancePlan);
	public String deleteInsurancePlan(int id);
}
