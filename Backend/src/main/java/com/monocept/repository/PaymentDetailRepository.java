package com.monocept.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.Agent;
import com.monocept.entity.PaymentDetail;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail,Integer>{

//	@Query("select u from PaymentDetail u where u.purchasedInsurance = :id")
//	public List<PaymentDetail> findByPurchasedInsurance(int id);

}
