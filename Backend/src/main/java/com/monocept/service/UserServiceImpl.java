package com.monocept.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.entity.User;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.UserRepository;

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public User getUser(String username) {
		Optional<User> findByUsername = userRepo.findByUsername(username);
		if(!findByUsername.isPresent())
		{
			throw new UserNotFoundException("User with username "+username+" not found");
		}
		
		return findByUsername.get();
	}

	@Override
	public User getUser(int id) {
		Optional<User> findById = userRepo.findById(id);
		if(!findById.isPresent())
		{
			throw new UserNotFoundException("User with id "+id+" not found");
		}
		
		return findById.get();
	}

	@Override
	public User saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}

	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	@Override
	public List<String> findAllEmails() {
		// TODO Auto-generated method stub
		List<String> emails = new ArrayList<>();
		List<User> findAll = userRepo.findAll();
		for(User user: findAll)
		{
			emails.add(user.getEmail());
		}
		return emails;
	}

}
