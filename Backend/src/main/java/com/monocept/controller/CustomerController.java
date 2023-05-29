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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.monocept.entity.Customer;
import com.monocept.entity.User;
import com.monocept.service.ICustomerService;


@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	
	@Autowired
	private ICustomerService service;
	
	@PostMapping("/save/{agentid}")
	public Customer save(@PathVariable int agentid, @RequestBody Customer customer) {
		
		return service.save(agentid,customer);
	}
	
	@GetMapping("/getall")
	public List<Customer> getAllCustomer(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
			){
		return service.getAllCustomer(page,size);
	}
	
	@GetMapping("/getbyid/{id}")
	public Customer getById(@PathVariable int id) {
		return service.getCustomerById(id);
	}
	
	@GetMapping("/{username}")
	public Customer getByUsername(@PathVariable String username) {
		return service.getCustomerByUsername(username);
	}
	
	@PutMapping("/update")
	public Customer update(@RequestBody Customer customer) {
		return service.update(customer);
	}
	
	
	@DeleteMapping("/deletebyid/{id}")
	public Customer deleteById(@PathVariable int id) {
		return service.delete(id);
	}
	
	
	@PutMapping("/assign")
	public Customer updateAccounts(
			@RequestParam Integer customerId,
			@RequestParam Integer agentId)
	{
		return service.updateAccounts(customerId,agentId);
	}
	
	@GetMapping("/findByagentid/{username}")
	public List<Customer> findByagentid(@PathVariable String username)
	{
		return service.findByagentid(username);
	}
	
	@PutMapping("/update/{cusid}")
	  public Customer update(@RequestBody User user,@PathVariable int cusid) {
	    System.out.println(user.toString());
	    return service.update(user,cusid);
	  }
	

}
