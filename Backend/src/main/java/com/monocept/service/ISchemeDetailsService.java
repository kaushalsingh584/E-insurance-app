package com.monocept.service;

import java.util.List;

import com.monocept.entity.SchemeDetail;

public interface ISchemeDetailsService{

	public SchemeDetail save(int id,SchemeDetail schemedetail);
	public List<SchemeDetail> getAllSchemeDetails(int page,int size);
	public SchemeDetail getSchemeDetailsById(int id);
	public SchemeDetail update(SchemeDetail policyDetails);
	
}
