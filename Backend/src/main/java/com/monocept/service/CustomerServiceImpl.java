package com.monocept.service;

import java.util.List;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.entity.Agent;
import com.monocept.entity.Customer;
import com.monocept.entity.User;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.AgentRepository;
import com.monocept.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements ICustomerService {

	@Autowired
	private CustomerRepository customerRepo;

	@Autowired
	private AgentRepository agentRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public Customer update(Customer customer) {
		// TODO Auto-generated method stub
		Optional<Customer> customerById = customerRepo.findById(customer.getCustomerId());
		if (!customerById.isPresent()) {
			throw new UserNotFoundException("Admin with id" + customer.getCustomerId() + " not found");
		}

		// go through once
		Customer customer2 = customerById.get();
		customer2.setUser(customer.getUser());

		return customerRepo.save(customer2);
	}

	@Override
	public Customer save(int agentId, Customer customer) {
		// TODO Auto-generated method stub
		
		System.out.println("\n\n===========================================addded customer save method called =======================================================");
		Optional<Agent> agent = agentRepo.findById(agentId);
	    if (!agent.isPresent())
	      throw new UsernameNotFoundException("Agent with id + " + agentId + " is not found");
	    
	    Set<Customer> initialCustomers = agent.get().getCustomers();
	    initialCustomers.add(customer);    
	    
	    System.out.println("Initial costumers " + initialCustomers);
	    agent.get().setCustomers(initialCustomers);
	    
	    
	    customer.getUser().setPassword(bCryptPasswordEncoder.encode(customer.getUser().getPassword()));
	  
	     Customer save = customerRepo.save(customer);
	     agentRepo.save(agent.get());
	     
	     System.out.println("Initial costumers " + agent.get().getCustomers());
	     
	     System.out.println("\n\n===========================================endd customer save method called =======================================================");
	     
	     return save;
	     }

	@Override
	public Customer getCustomerByUsername(String username) {
		// TODO Auto-generated method stub
		return customerRepo.findByUsername(username);
	}

	@Override
	public Customer getCustomerById(int id) {
		// TODO Auto-generated method stub
		Optional<Customer> customer = customerRepo.findById(id);
		if (!customer.isPresent())
			throw new UsernameNotFoundException("Customer with id + " + id + " is not found");
		return customer.get();
	}

	@Override
	public List<Customer> getAllCustomer(int page, int size) {
		// TODO Auto-generated method stub
		return customerRepo.findAll();
	}

	@Override
	public Customer updateAccounts(Integer customerId, Integer agentId) {
		// TODO Auto-generated method stub

		Optional<Customer> customer = customerRepo.findById(customerId);
		if (!customer.isPresent())
			throw new UsernameNotFoundException("Customer with id + " + customerId + " is not found");
		
		Optional<Agent> agent = agentRepo.findById(agentId);
		if (!agent.isPresent())
			throw new UsernameNotFoundException("Agent with id + " + agentId + " is not found");
		
		Set<Customer> initialCustomers = agent.get().getCustomers();
		initialCustomers.add(customer.get());		
		agent.get().setCustomers(initialCustomers);
		agentRepo.save(agent.get());

		return customerRepo.save(customer.get());
	}

	@Override
	public Customer delete(int customerid) {
		// TODO Auto-generated method stub
		Optional<Customer> customer = customerRepo.findById(customerid);
		if (!customer.isPresent())
			throw new UsernameNotFoundException("Customer with id + " + customerid + " is not found");
		
		User user = customer.get().getUser();
		user.setStatus(!customer.get().getUser().isStatus());
		customer.get().setUser(user);
//		customerRepo.deleteById(customerid);
		return customerRepo.save(customer.get());
		
	}

	@Override
	public List<Customer> findByagentid(String id) {
		
		return customerRepo.findByagentid(id);
	}


@Override
  public Customer update(User user, int cusid) {
    Customer customer = customerRepo.findById(cusid).get();
    System.out.println("_________________============"+user.getAddress());
    
    User user2 = customer.getUser();
//    user.setEmail(user2.getEmail());
//    user.setName(user2.getName());
//    user.setStatus(user2.isStatus());
//    user.setAddress(user2.getAddress());
    user.setPassword(user2.getPassword());
    user.setRole(user2.getRole());
    user.setUserId(user2.getUserId());
    user.setUsername(user2.getUsername());
    customer.setUser(user);
    customerRepo.save(customer);
    return customer;
  }

}
