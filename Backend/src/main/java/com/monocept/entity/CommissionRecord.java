package com.monocept.entity;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommissionRecord {



	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commissionId;
	
	private int insuranceAcc;
	
	private LocalDate created_at = LocalDate.now();
	
	private String customer;
	
	@Column(name = "insurance_type")
	private String insuranceType;
	
	@Column(name = "scheme_name")
	private String schemeName;
	
	@Column(name = "commission_percent")
	private double commPercent;
	
	@Column(name = "commission_amount")
	private double commAmount;
	
	@Column(name = "comm_type")
	private String commType;
	
	@ManyToOne
	@JsonIgnoreProperties(value = "records")
	@JoinColumn(name="fk_agent_id")
	private Agent agent;

	public CommissionRecord( int insuranceAcc, LocalDate created_at, String customer,
			String insuranceType, String schemeName, double commPercent, double commAmount, String commType,
			Agent agent) {
		super();
		
		this.insuranceAcc = insuranceAcc;
		this.created_at = created_at;
		this.customer = customer;
		this.insuranceType = insuranceType;
		this.schemeName = schemeName;
		this.commPercent = commPercent;
		this.commAmount = commAmount;
		this.commType = commType;
		this.agent = agent;
	}

	
	


	
//	233
}
