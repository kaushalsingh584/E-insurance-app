package com.monocept.service;

import java.util.List;

import com.monocept.entity.Admin;

public interface IAdminService {

	public Admin save(Admin admin);
	public List<Admin> getAllAdmin(int page,int size);
	public Admin getAdminById(int id);
	public Admin getAdminByUsername(String username);
	public Admin update(Admin admin);
}
