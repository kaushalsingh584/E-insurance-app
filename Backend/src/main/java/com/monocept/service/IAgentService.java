package com.monocept.service;

import java.util.List;

import com.monocept.entity.Agent;
import com.monocept.entity.Customer;
import com.monocept.entity.User;

public interface IAgentService {

	Agent save(Agent agent);

	List<Agent> getAllAgent(int page, int size);

	Agent getAgentById(int id);

	Agent update(Agent agent);

	Agent getAgentByUsername(String username);

	Agent delete(int id);

	Agent update(User user, int cusid);
	
	

}
