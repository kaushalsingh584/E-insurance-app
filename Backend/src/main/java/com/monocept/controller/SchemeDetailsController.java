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

import com.monocept.entity.SchemeDetail;
import com.monocept.service.ISchemeDetailsService;


@RestController
@RequestMapping("/schemedetail")
public class SchemeDetailsController {

	@Autowired
	private ISchemeDetailsService service;
	
	@PostMapping("/save/policyid/{id}")
	public SchemeDetail save(@PathVariable int id,@RequestBody SchemeDetail policyDetails) {
		return service.save(id,policyDetails);
	}
	
	@GetMapping("/getall")
	public List<SchemeDetail> getAllPolicyDetails(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllSchemeDetails(page,size);
	}
	
	@GetMapping("/getbyid/{id}")
	public SchemeDetail getById(@PathVariable int id) {
		return service.getSchemeDetailsById(id);
	}
	
	
	@PutMapping("/update")
	public SchemeDetail update(@RequestBody SchemeDetail policyDetails) {
		return service.update(policyDetails);
	}
}
