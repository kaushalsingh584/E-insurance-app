package com.monocept.service;

import java.util.List;

import com.monocept.entity.Agent;
import com.monocept.entity.Employee;
import com.monocept.entity.User;


public interface IEmployeeService {

	public Employee save(Employee employee);
	public List<Employee> getAllEmployee(int page,int size);
	public Employee getEmployeeById(int id);
	public Employee getEmployeeByUsername(String username);
	public Employee update(Employee admin);
	public Employee delete(int id);
	public Employee update(User user, int cusid);
	
	
}
