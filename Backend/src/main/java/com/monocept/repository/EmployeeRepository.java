package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

	@Query("select e from Employee e where e.user.username = :username")
	public Employee findByUsername(String username);
}
