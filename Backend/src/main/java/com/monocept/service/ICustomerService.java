package com.monocept.service;

import java.util.List;


import com.monocept.entity.Admin;
import com.monocept.entity.Customer;
import com.monocept.entity.User;

public interface ICustomerService {


	Customer update(Customer customer);

	Customer save(int agentid, Customer customer);

	Customer getCustomerByUsername(String username);

	Customer getCustomerById(int id);

	List<Customer> getAllCustomer(int page, int size);

	Customer updateAccounts(Integer customerId, Integer agentId);

	Customer delete(int customerId);

	List<Customer> findByagentid(String id);

	Customer update(User user, int cusid);

}
