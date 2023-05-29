package com.monocept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monocept.entity.Scheme;
import com.monocept.entity.SchemeDetail;

public interface SchemeRepository extends JpaRepository<Scheme, Integer> {

	@Query("select u.name from Scheme u")
	List<String> findAllSchemeName();


}
