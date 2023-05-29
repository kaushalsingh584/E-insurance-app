package com.monocept.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchemeDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="detail_id")
	private int detailId;
	
	@Column(name="min_amount")
	private double miniAmount;
	
	@Column(name="max_amount")
	private double maxiAmount;
	
	@Column(name="min_term")
	private int miniInvestmentTime;
	
	@Column(name="max_term")
	private int maxiInvestmentTime;
	
	@Column(name="min_age")
	private int miniAge;
	
	@Column(name="max_age")
	private int maxiAge;
	
	@Column(name = "profit_ratio")
	private double profitRatio;
	

}
