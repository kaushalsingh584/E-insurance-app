package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.Agent;

public interface AgentRepository extends JpaRepository<Agent, Integer>{

	@Query("select u from Agent u where u.user.username = :username")
	public Agent findByUsername(String username);
}
