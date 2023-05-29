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

import com.monocept.entity.CommissionRecord;
import com.monocept.service.ICommissionRecordService;

@RestController
@RequestMapping("/commission")
public class CommionRecordController {
	
	@Autowired
	private ICommissionRecordService service;
	
	@PostMapping("/save")
	public CommissionRecord save(@RequestBody CommissionRecord commissionRecord) {
		return service.save(commissionRecord);
	}
	
	@GetMapping("/getall")
	public List<CommissionRecord> getAllCommissionRecord(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllCommissionRecord(page,size);
	}
	
	@GetMapping("/getbyid/{id}")
	public CommissionRecord getById(@PathVariable int id) {
		return service.getCommissionRecordById(id);
	}
	
	@GetMapping("/{username}")
	public CommissionRecord getByUsername(@PathVariable String username) {
		return service.getCommissionRecordByUsername(username);
	}
	
	@PutMapping("/update")
	public CommissionRecord update(@RequestBody CommissionRecord commissionRecord) {
		return service.update(commissionRecord);
	}
	
	@DeleteMapping("/deletebyid/{id}")
	public String deletebyid(@PathVariable int id) {
		return service.deletebyid(id);
	}

}
