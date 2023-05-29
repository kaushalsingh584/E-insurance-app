package com.monocept.entity;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "agent_id")
	private int agentId;

	@Column(name = "agent_code",nullable = false, unique = true)
	private String agentCode;

	private String qualification;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	User user;

//	 @ManyToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH },fetch = FetchType.LAZY)
//	    @JoinTable(name = "agent_customer",
//	           joinColumns = { @JoinColumn(name = "fk_agent_id") },
//	           inverseJoinColumns = { @JoinColumn(name = "fk_customer_id") })
//	    private Set<Customer> customers = new HashSet<Customer>();

	//one agent has many customers
	@JsonIgnoreProperties(value = "agent")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_agent_id", referencedColumnName = "agent_id")
	private Set<Customer> customers ;
	
	@OneToMany
	@JsonIgnoreProperties(value = "agent")
	@JoinColumn(name="fk_agent_id",referencedColumnName = "agent_id")
	private List<CommissionRecord> records;

	
}
