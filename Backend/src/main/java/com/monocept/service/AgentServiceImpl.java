//package com.monocept.service;
//
//import java.util.List;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import com.monocept.entity.Agent;
//import com.monocept.exception.UserNotFoundException;
//import com.monocept.repository.AgentRepository;
//
//@Service
//public class AgentServiceImpl implements IAgentService{
//
//	@Autowired
//	private AgentRepository agentRepo;
//	
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
//	
//	
//	@Override
//	public Agent save(Agent agent) {
//		// TODO Auto-generated method stub
//		agent.getUser().setPassword(bCryptPasswordEncoder.encode(agent.getUser().getPassword()));
//		return agentRepo.save(agent);
//	}
//
//	@Override
//	public List<Agent> getAllAgent(int page, int size) {
//		// TODO Auto-generated method stub
//		return agentRepo.findAll();
//	}
//
//	@Override
//	public Agent getAgentById(int id) {
//		// TODO Auto-generated method stub
//		Optional<Agent> agent = agentRepo.findById(id);
//		if(!agent.isPresent()) {
//			throw new UserNotFoundException("Agent with id"+id+ " not found");
//		}
//		return agent.get();
//	}
//
//	@Override
//	public Agent update(Agent agent) {
//		return agentRepo.save(agent);
//	}
//
//	@Override
//	public Agent getAgentByUsername(String username) {
//		// TODO Auto-generated method stub
//		return agentRepo.findByUsername(username);
//	}
//
//}

package com.monocept.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.monocept.entity.Agent;
import com.monocept.entity.Customer;
import com.monocept.entity.User;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.AgentRepository;

@Service
public class AgentServiceImpl implements IAgentService{

	@Autowired
	private AgentRepository agentRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@Override
	public Agent save(Agent agent) {
		// TODO Auto-generated method stub
		agent.getUser().setPassword(bCryptPasswordEncoder.encode(agent.getUser().getPassword()));
		return agentRepo.save(agent);
	}

	@Override
	public List<Agent> getAllAgent(int page, int size) {
		// TODO Auto-generated method stub
		return agentRepo.findAll();
	}

	@Override
	public Agent getAgentById(int id) {
		// TODO Auto-generated method stub
		Optional<Agent> agent = agentRepo.findById(id);
		if(!agent.isPresent()) {
			throw new UserNotFoundException("Agent with id"+id+ " not found");
		}
		return agent.get();
	}

	@Override
	public Agent update(Agent agent) {
		return agentRepo.save(agent);
	}

	@Override
	public Agent getAgentByUsername(String username) {
		// TODO Auto-generated method stub
		return agentRepo.findByUsername(username);
	}

	@Override
	public Agent delete(int id) {
		Optional<Agent> agent = agentRepo.findById(id);
		if (!agent.isPresent())
			throw new UsernameNotFoundException("Customer with id + " + id + " is not found");
		
		User user = agent.get().getUser();
		user.setStatus(!agent.get().getUser().isStatus());
		agent.get().setUser(user);
		return agentRepo.save(agent.get());
		
	}
	
	@Override
	  public Agent update(User user, int cusid) {
	    Agent agent = agentRepo.findById(cusid).get();
	    System.out.println("_________________============"+user.getAddress());
	    
	    User agent2 = agent.getUser();
//	    user.setEmail(user2.getEmail());
//	    user.setName(user2.getName());
//	    user.setStatus(user2.isStatus());
//	    user.setAddress(user2.getAddress());
	    user.setPassword(agent2.getPassword());
	    user.setRole(agent2.getRole());
	    user.setUserId(agent2.getUserId());
	    user.setUsername(agent2.getUsername());
	    agent.setUser(user);
	    agentRepo.save(agent);
	    return agent;
	  }

}

