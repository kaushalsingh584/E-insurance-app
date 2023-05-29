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

import com.monocept.entity.Agent;
import com.monocept.entity.Customer;
import com.monocept.entity.User;
import com.monocept.service.IAgentService;

@RestController
@RequestMapping("/agent")
public class AgentController {

	@Autowired
	private IAgentService service;

	@PostMapping("/save")
	public Agent save(@RequestBody Agent agent) {
		return service.save(agent);
	}

	@GetMapping("/getall")
	public List<Agent> getAllAgent(@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "10") int size) {
		return service.getAllAgent(page, size);
	}

	@GetMapping("/getbyid/{id}")
	public Agent getById(@PathVariable int id) {
		return service.getAgentById(id);
	}

	@GetMapping("/{username}")
	public Agent getByUsername(@PathVariable String username) {
		return service.getAgentByUsername(username);
	}

	@PutMapping("/update")
	public Agent update(@RequestBody Agent agent) {
		return service.update(agent);
	}
	
	@DeleteMapping("/deletebyid/{id}")
	public Agent deleteById(@PathVariable int id) {
		return service.delete(id);
	}
	
	
	@PutMapping("/update/{cusid}")
	  public Agent update(@RequestBody User user,@PathVariable int cusid) {
	    System.out.println(user.toString());
	    return service.update(user,cusid);
	  }


}
