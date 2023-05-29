package com.monocept.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
public class Scheme {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="scheme_id")
	private int schemeId;
	
	@Column(unique = true, nullable = false,name="scheme_type")
	private String name;
	
	@Lob
	private byte[] imageData;
	
	@Column(name="register_comm")
	private double  newRegisterCommission;
	
	@Column(name="installment_comm")
	private double installmentCommission;
	
	private String description;
	
	private boolean status;
	
	@ManyToOne
	@JoinColumn(name ="fk_insurance_id")
	@JsonIgnoreProperties(value= "schemes")
	private InsurancePlan plan;
	
	@OneToOne(cascade = CascadeType.ALL)
    private SchemeDetail details;

	@OneToMany
	@JoinColumn(name="fk_scheme_id",referencedColumnName = "scheme_id")
	private List<PurchasedInsurance> accounts;


	

}
