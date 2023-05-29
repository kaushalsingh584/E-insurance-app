package com.monocept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.SchemeDetail;

public interface SchemeDetailsRepository extends JpaRepository<SchemeDetail, Integer>{


	
}
