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
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsurancePlan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="insurance_id")
	private int insuranceId;
	
	
	@Column(unique = true, nullable = false,name="insurance_type")
	private String insuranceType;
	
	private boolean status;
	
	@OneToMany(cascade= CascadeType.ALL )
	@JoinColumn(name="fk_insurance_id",referencedColumnName = "insurance_id")
	@JsonIgnoreProperties(value="plan")
	List<Scheme> schemes;

}
