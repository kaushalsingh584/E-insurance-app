package com.monocept.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Importing required classes


//Class
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDetails {

	
	// Class data members
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "emailDetail_id")
	private int emailDetailsid;
	private String recipient;
	private String msgBody;
	private String subject;
	private String attachment;
	

	
}
