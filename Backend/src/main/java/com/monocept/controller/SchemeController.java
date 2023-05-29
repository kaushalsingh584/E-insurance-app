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

import com.monocept.entity.Scheme;
import com.monocept.entity.SchemeDetail;
import com.monocept.service.ISchemeService;


@RestController
@RequestMapping("/scheme")
public class SchemeController {

	@Autowired
	private ISchemeService service;
	
	@PostMapping("/save/{insuranceplanid}")
	public Scheme save(@PathVariable int insuranceplanid, @RequestBody Scheme policy) {
		return service.save(insuranceplanid,policy);
	}
	
	@GetMapping("/getall")
	public List<Scheme> getAllPolicy(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllPolicy(page,size);
	}
	
	@GetMapping("/getbyid/{id}")
	public Scheme getById(@PathVariable int id) {
		return service.getPolicyById(id);
	}
	
//
//	@GetMapping("/getByInsurancePlan/{id}")
//	public List<Scheme> getByInsurancePlan(@PathVariable int id) {
//		return service.getByInsurancePlan(id);
//	}
	
	
	@PutMapping("/update")
	public Scheme update(@RequestBody Scheme policy) {
		return service.update(policy);
	}
	
	@PutMapping("/update/schemedetails/{id}")
	public Scheme updateDetails(@PathVariable int id,@RequestBody SchemeDetail details) {
		
		return service.updateDetails(id,details);
	}
	
	
	@DeleteMapping("/deletebyid/{id}")
	public void delete(@PathVariable int id) {
		service.deleteById(id);
	}
	
	@GetMapping("/getallschemeName")
	public List<String> getAllSchemeNames() {
		return service.getAllSchemeName();
	}
}
