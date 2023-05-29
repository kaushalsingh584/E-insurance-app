package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer>{

	@Query("select a from Admin a where a.user.username = :username")
	public Admin findByUsername(String username);
}
