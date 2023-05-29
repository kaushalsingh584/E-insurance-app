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

import com.monocept.entity.Admin;
import com.monocept.service.IAdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private IAdminService service;
	
	@PostMapping("/save")
	public Admin save(@RequestBody Admin admin) {
		return service.save(admin);
	}
	
	@GetMapping("/getall")
	public List<Admin> getAllAdmin(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllAdmin(page,size);
	}
	
	@GetMapping("/getbyid/{id}")
	public Admin getById(@PathVariable int id) {
		return service.getAdminById(id);
	}
	
	@GetMapping("/{username}")
	public Admin getByUsername(@PathVariable String username) {
		return service.getAdminByUsername(username);
	}
	
	@PutMapping("/update")
	public Admin update(@RequestBody Admin admin) {
		return service.update(admin);
	}
}
