package com.monocept.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.entity.Admin;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.AdminRepository;

@Service
public class AdminServiceImpl implements IAdminService {

	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Admin save(Admin admin) {

//		User user = new User(admin.getUser().getUserId(),admin.getUser().getName(),admin.getUser().getUsername(),
//				admin.getUser().getPassword(),admin.getUser().getRole(),admin.getUser().getStatus());
//		userRepo.save(user);
		admin.getUser().setPassword(bCryptPasswordEncoder.encode(admin.getUser().getPassword()));
		return adminRepo.save(admin);
	}

	@Override
	public List<Admin> getAllAdmin(int page,int size) {
		return adminRepo.findAll();
	}

	@Override
	public Admin getAdminById(int id) {
		Optional<Admin> admin = adminRepo.findById(id);
		if(!admin.isPresent()) {
			throw new UserNotFoundException("Admin with id"+id+ " not found");
		}
		return admin.get();
	}

	@Override
	public Admin getAdminByUsername(String username) {

		Admin admin = adminRepo.findByUsername(username);
		return admin;
	}

	@Override
	public Admin update(Admin admin) {
		Optional<Admin> adminById = adminRepo.findById(admin.getAdminId());
		if(!adminById.isPresent())
		{
			throw new UserNotFoundException("Admin with id"+admin.getAdminId()+ " not found");
		}
		
		Admin admin2 = adminById.get();
		admin2.setUser(admin.getUser());
		
		return adminRepo.save(admin2);
	}

}
