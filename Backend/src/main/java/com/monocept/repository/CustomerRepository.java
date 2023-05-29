package com.monocept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	
	@Query("select a from Customer a where a.user.username = :username")
	public Customer findByUsername(String username);

	@Query("select a from Customer a where a.agent.user.username = :username")
	public List<Customer> findByagentid(String username);

}
