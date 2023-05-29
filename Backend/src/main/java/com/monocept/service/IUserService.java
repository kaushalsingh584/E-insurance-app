package com.monocept.service;


import java.util.List;

import com.monocept.entity.User;

public interface IUserService{

	public User getUser(String username);
	public User getUser(int id);
	public User saveUser(User user);
	public List<User> findAllUsers();
	public List<String> findAllEmails();
}
