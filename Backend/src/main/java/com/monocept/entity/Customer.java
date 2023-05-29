package com.monocept.entity;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_id")
	private int customerId;

	@Column(name = "date_of_birth")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate DOB;

	private String phone;
	private String state;
	private String city;
	private int pincode;
	private int age;
	private String nominee;
	private String nomineeRelation;

	// one user is associated to each customer
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	User user;

//	@ManyToMany(mappedBy = "customers")
//	private Set<Agent> agents = new HashSet<Agent>();

	// customer has only one agent
	@ManyToOne
	@JoinColumn(name = "fk_agent_id")
	private Agent agent;

	// one customer has many insurance accounts
	@JsonIgnoreProperties(value = "customer")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_customer_id", referencedColumnName = "customer_id")
	private Set<PurchasedInsurance> purchasedInsurance = new HashSet<PurchasedInsurance>();

	//one customer has many documents
	@JsonIgnoreProperties(value = "customer")
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="fk_customer_id", referencedColumnName = "customer_id")
	private Set<Document> documents = new HashSet<Document>();
	
	
}
