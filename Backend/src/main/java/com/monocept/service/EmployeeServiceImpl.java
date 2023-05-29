package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.entity.Agent;
import com.monocept.entity.Employee;
import com.monocept.entity.User;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements IEmployeeService{

	@Autowired
	private EmployeeRepository empRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Employee save(Employee employee) {
		employee.getUser().setPassword(bCryptPasswordEncoder.encode(employee.getUser().getPassword()));
		return empRepo.save(employee);
	}

	@Override
	public List<Employee> getAllEmployee(int page, int size) {
		return empRepo.findAll();
	}

	@Override
	public Employee getEmployeeById(int id) {
		Optional<Employee> employee = empRepo.findById(id);
		if(!employee.isPresent())
		{
			throw new UserNotFoundException("Employee with id"+id+ " not found");
		}
		return employee.get();
	}

	@Override
	public Employee getEmployeeByUsername(String username) {
		Employee employee = empRepo.findByUsername(username);
		return employee;
	}

	@Override
	public Employee update(Employee employee) {
		Optional<Employee> employeeById = empRepo.findById(employee.getEmployeeId());
		if(!employeeById.isPresent())
		{
			throw new UserNotFoundException("Employee with id"+employee.getEmployeeId()+ " not found");
		}
		
		Employee employee2 = employeeById.get();
		employee2.setUser(employee.getUser());
		
		return empRepo.save(employee2);
	}

	@Override
	public Employee delete(int id) {
		Optional<Employee> employee = empRepo.findById(id);
		if (!employee.isPresent())
			throw new UsernameNotFoundException("Employee with id + " + id + " is not found");
		
		User user = employee.get().getUser();
		user.setStatus(!employee.get().getUser().isStatus());
		employee.get().setUser(user);
		return empRepo.save(employee.get());
	}
	
	@Override
	  public Employee update(User user, int cusid) {
		Employee employee = empRepo.findById(cusid).get();
	    System.out.println("_________________============"+user.getAddress());
	    
	    User agent2 = employee.getUser();
//	    user.setEmail(user2.getEmail());
//	    user.setName(user2.getName());
//	    user.setStatus(user2.isStatus());
//	    user.setAddress(user2.getAddress());
	    user.setPassword(agent2.getPassword());
	    user.setRole(agent2.getRole());
	    user.setUserId(agent2.getUserId());
	    user.setUsername(agent2.getUsername());
	    employee.setUser(user);
	    empRepo.save(employee);
	    return employee;
	  }

	
}
