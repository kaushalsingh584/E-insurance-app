package com.monocept.controller;

import java.security.Principal;
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
import com.monocept.entity.User;
import com.monocept.service.IAdminService;
import com.monocept.service.IUserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private IUserService service;
	
	@PostMapping("/save")
	public User save(@RequestBody User user) {
		return service.saveUser(user);
	}
	
//	@GetMapping("/get-all")
//	public List<Admin> getAllAdmin(
//			@RequestParam(name = "page", defaultValue = "0") int page,
//	        @RequestParam(name = "size", defaultValue = "10") int size
//			){
//		return service.getAllAdmin(page,size);
//	}
	
	@GetMapping("/details")
	public User getById(Principal principal) {
		return service.getUser(principal.getName());
	}
	
	@GetMapping
	public List<User> getAllUsers() {
		return service.findAllUsers();
	}
	
	@GetMapping("/getAllemail")
	public List<String> getAllEmails() {
		return service.findAllEmails();
	}
	
	
//	@PutMapping("/update")
//	public Admin update(@RequestBody Admin admin) {
//		return service.update(admin);
//	}
}
