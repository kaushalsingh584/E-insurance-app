package com.monocept.entity;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchasedInsurance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_number")
	private int accountNumber;

	@Column(name = "insurance_type")
	private String insuranceType;

	@Column(name = "insurance_scheme")
	private String insuranceScheme;

	@Column(name = "date_created")
	private LocalDate datecreated = LocalDate.now();

	@Column(name = "maturity_date")
	private LocalDate maturityDate;

	@Column(name = "premium_type")
	private String premiumType;

	@Column(name = "total_premium_amount")
	private double totalPremiumAmount;

	@Column(name = "profit_ratio")
	private double profitRatio;

	@Column(name = "sum_assured")
	private double sumAssured;
	
	@Column(name = "total_premium_left",nullable = true)
	private double totalPremiumLeft;
	
	@Column(name = "status")
	private String status = "active";
	
	@Column(name = "duration")
	private Integer duration;
	
	@Column(name = "installment_amount")
	private Double installmentAmount;
	
	

	// insurance account has only one customer
	// ks - one to one hona chahiye
	
	
	@ManyToOne
	@JoinColumn(name = "fk_customer_id")
	@JsonIgnoreProperties(value= "purchasedInsurance")
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name = "fk_scheme_id")
	@JsonIgnoreProperties(value= "accounts")
	private Scheme scheme;
	
	
	@OneToMany
	@JoinColumn(name="fk_insurancePurchase_id",referencedColumnName = "account_number")
	@JsonIgnoreProperties(value="purchasedInsurance")
	List<PaymentDetail> payment;


	
}
